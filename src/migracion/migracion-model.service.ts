import { Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service"
import { UserIndex } from "../elastic-search/indices/user-index";
import { CategoriesIndex } from "../elastic-search/indices/categoria-index";
import { ArticleIndex } from "../elastic-search/indices/article-index";
import { ArticuloIndex } from "../articulos/articuloIndex";
import { ArticlesViewsIndex } from "../elastic-search/indices/articleViews-index";
import { CommentsIndex } from "../elastic-search/indices/comments-index";
import { FavoriteUserIndex } from "../elastic-search/indices/userFavorites-index";
import { LikeUserIndex } from "../elastic-search/indices/likesUser-index";
import { articuloRaw } from "../articulos/entities";
import { commentRaw } from "../comentarios/entities";
import { userRaw } from "../usuarios/entities";
import { categoryRaw } from "../categorias/entities";

import { map } from 'async';
import async = require('async');
import { ImportExport } from 'aws-sdk/clients/all';

@Injectable()
export class MigracionModelService {
    constructor(
        private db: DbService,
        private userIndex: UserIndex,
        private CategoriesIndex: CategoriesIndex,
        private ArticleIndex: ArticleIndex,
        private articuloIndex: ArticuloIndex,
        private ArticlesViewsIndex: ArticlesViewsIndex,
        private CommentsIndex: CommentsIndex,
        private FavoriteUserIndex: FavoriteUserIndex,
        private LikeUserIndex: LikeUserIndex,
    ) { }

    migrateUsers = async (from: number, size: number) => {
        let es_usuarios = await this.userIndex.query({
            from: from,
            size: size,
            query: {
                "match_all": {}
            }
        })

        let nik_usuarios = await map(es_usuarios, async es_usuario => {
            try {

                return await this.db.NIK(`
                    INSERT INTO usuario
                    (
                        user_name,
                        documento
                    )
                    VALUES
                    ('${es_usuario.nombre}', '${es_usuario.cedula}');
                `)

            } catch (err) {
                console.log(err)
            }
        })

        return nik_usuarios

    }

    migrateUserBases = async (from: number, size: number) => {
        let es_usuarios = await this.userIndex.query({
            from: from,
            size: size,
            query: {
                "match_all": {}
            }
        })

        await map(es_usuarios, async es_usuario => {
            await map(es_usuario.pcrc, async pcrc => {
                try {

                    return await this.db.NIK(`
                    insert into usuario_base (documento, base_id)
                    values ('${ es_usuario.cedula}', '${pcrc}');
                    `)
                } catch (error) {
                    console.log(error)
                    return null
                }
            })
        })
    }

    migrarCategorias = async (from: number, size: number) => {
        let es_categorias = await this.CategoriesIndex.query({
            from: from,
            size: size,
            query: {
                "match_all": {}
            }
        })

        let nikCategorias = await map(es_categorias, async categoria => {

            try {


                let nikCategoria = await this.db.NIK(`
                insert into categoria (name, position, icon, base_id, parent_id, es_id)
                values ('${categoria.name}', '${categoria.position}', '${categoria.icon}', '${categoria.pcrc}', null,'${categoria.id}');
                `)

                return nikCategoria

            } catch (error) {
                console.log(error)
                return null
            }
        })


        return nikCategorias

    }

    migrarArticulos = async (from: number, size: number) => {
        let es_articulos = await this.ArticleIndex.where({ role: 'articulo' }, from.toString(), size.toString())

        let result = await map(es_articulos, async es_articulo => {

            let state = es_articulo.state == 'published' ? '1' : '2';
            try {


                let nikCategoria = await this.db.NIK<{ id_categoria: string, base_id: string }>(`
                select
                a.id as id_categoria,
                a.base_id
                from categoria a
                where a.es_id = '${es_articulo.category}'
            `)

                if (nikCategoria && state == '1') {
                    let [nikArticulo] = await this.db.NIK<articuloRaw>(`
                    CALL crear_articulo(?,?,?,?,?,?)
                `, [es_articulo.title, es_articulo.content, es_articulo.obj, state, nikCategoria[0].id_categoria, es_articulo.id])


                    if (es_articulo.tags.length) {
                        await map(es_articulo.tags, async tag => {
                            await this.db.NIK(`call crear_tag(?,?)`, [nikArticulo.id.toString(), tag])
                        })
                    }

                    if (es_articulo.attached?.length) {
                        await map(es_articulo.attached, async archivo => {
                            await this.db.NIK(`call agregar_adjunto(?,?)`, [archivo, nikArticulo.id.toString()])
                        })
                    }
                }
            } catch (err) {
                console.log(err)
                return null
            }
        })

        return result

    }

    migrarVistasArticulo = async (from: number, size: number) => {

        let nik_articulos = await this.db.NIK<articuloRaw>(`
            select
            *
            from
            articulo
            limit ${from} ,${size} 
        `)

        return await map(nik_articulos, async articulo => {
            let vistas = await this.ArticlesViewsIndex.where({
                articulo: articulo.es_id
            })



            await map(vistas, async vista => {
                try {
                    await this.db.NIK(`call agregar_vista_articulo(?,?,?,?)`, [articulo.id.toString(), vista.user, (new Date(vista.initialDate)).toJSON().slice(0, 19).replace('T', ' '), (new Date(vista.finalDate)).toJSON().slice(0, 19).replace('T', ' ')])
                } catch (error) {
                    console.log(error)
                    return null
                }
            })

            return vistas


        })

    }

    migrarComentario = async (from: number, size: number) => {

        let nik_articulos = await this.db.NIK<articuloRaw>(`
            select
            *
            from
            articulo
            limit ${ from} ,${size}
        `)

        await map(nik_articulos, async nik_articulo => {
            let es_comentarios = await this.CommentsIndex.where({ articulo: nik_articulo.es_id })

            let ids_comentarios: { nuevo_id: string, viejo_id: string }[] = await map(es_comentarios, async es_comentario => {
                try {

                    let [nuevoComentario] = await this.db.NIK<commentRaw>(`call agregar_comentario(?,?,?,?)`, [nik_articulo.id.toString(), es_comentario.user, es_comentario.replyTo, es_comentario.text])
                    return { nuevo_id: nuevoComentario.id, viejo_id: es_comentario.id }
                } catch (error) {
                    console.log(error)
                    return null
                }
            })

            await map(ids_comentarios.filter(id => id), async ids => {
                try {

                    await this.db.NIK(`
                    update comentario set reply_to='${ ids.nuevo_id}'
                    where reply_to='${ids.viejo_id}'
                    `)
                } catch (error) {
                    console.log(error)
                    return null
                }
            })
        })
    }

    migrarFavoritos = async (from: number, size: number) => {

        let nik_usuarios = await this.db.NIK<userRaw>(`
            select
            *
            from usuario
            limit ${from},${size}
        `)

        await map(nik_usuarios, async nik_usuario => {

            let favoritos = await this.FavoriteUserIndex.where({ user: nik_usuario.documento })

            await map(favoritos, async favorito => {
                let [articulo_nik] = await this.db.NIK<articuloRaw>(`
                    select 
                    * 
                    from articulo where articulo.es_id = '${favorito.article}'
                `)

                try {


                    await this.db.NIK(`call agregar_favorito(?,?)`, [articulo_nik.id.toString(), favorito.user])
                } catch (error) {
                    console.log(error)
                    return null
                }

            })
        })
    }

    migrarMeGusta = async (from: number, size: number) => {
        let nik_articulos = await this.db.NIK<articuloRaw>(`
            select
            *
            from
            articulo
            limit ${ from} ,${size}
        `)

        await map(nik_articulos, async articulo => {
            let valoraciones = await this.LikeUserIndex.where({ article: articulo.es_id })

            await map(valoraciones, async valoracion => {
                try {
                    await this.db.NIK(`call agregar_valoracion(?,?,?)`, [articulo.id.toString(), valoracion.type, valoracion.user])
                } catch (err) {
                    console.log(err)
                    return null
                }
            })
        })
    }

    agregarArticulosEs = async (from: number, size: number) => {

        let nik_articulos = await this.db.NIK<articuloRaw>(`
            select
            *
            from
            articulo
            limit ${ from} ,${size}
        `)

        return await map(nik_articulos, async articulo => {

            let [likes, dislikes, favoritos, vistas] = await Promise.all([
                this.db.NIK<{ likes: number }>(`
                    select 
                    count(1) as likes
                    from valoraciones 
                    where valoraciones.articulo_id = '${articulo.id}' 
                    and valoraciones.tipo_valoracion = 'like'
                    and ISNULL(valoraciones.final_date)
                `),
                this.db.NIK<{ dislikes: number }>(`
                    select 
                    count(1) as dislikes
                    from valoraciones 
                    where valoraciones.articulo_id = '${articulo.id}' 
                    and valoraciones.tipo_valoracion = 'dislike'
                    and ISNULL(valoraciones.final_date)
                `),
                this.db.NIK<{ favoritos: number }>(`
                    select 
                    count(1) as favoritos
                    from favorito 
                    where favorito.articulo_id = '${articulo.id}' 
                    and ISNULL(favorito.final_date)
                `),
                this.db.NIK<{ vistas: number }>(`
                    select 
                    count(1) as vistas
                    from vista
                    where vista.articulo_id = '${articulo.id}'
                `)
            ])

            let result = await this.articuloIndex.create({
                base: articulo.base_id,
                likes: likes[0].likes,
                disLikes: dislikes[0].dislikes,
                favorites: favoritos[0].favoritos,
                views: vistas[0].vistas,
                publicationDate: (new Date()).getTime(),
                type: 'articulo',
                category: articulo.categoria_id.toString(),
                content: articulo.content,
                state: articulo.state,
                tags: [],
                title: articulo.title
            }, articulo.id.toString())

            return result.title
        })

    }

    arreglarCategorias = async (from: number, size: number) => {

        let es_categorias = (await this.CategoriesIndex.query({
            from: from,
            size: size,
            query: {
                "match_all": {}
            }
        })).filter(categoria => !!categoria.group)

        return await map(es_categorias, async categoria => {

            let nik_parent = await this.db.NIK<categoryRaw>(`
                select 
                * from 
                categoria 
                where categoria.es_id = '${ categoria.group}'
            `)

            if (nik_parent[0]) {
                await this.db.NIK(`
                update
                categoria
                set parent_id = '${ nik_parent[0].id}'
                where categoria.es_id = '${ categoria.id}'
                `)

                return nik_parent[0].name
            }
        })

        // let nik_categorias = await this.db.NIK<categoryRaw>(`
        //     select 
        //     * 
        //     from
        //     categoria
        //     limit ${from}, ${size}
        // `)


    }

    arreglarUsuarios = async (from: number, size: number) => {
        let es_usuarios = await this.userIndex.query({
            from: from,
            size: size,
            query: {
                "match_all": {}
            }
        })

        let result = await map(es_usuarios, async es_usuario => {
            await this.db.NIK(`
                update
                usuario
                set
                rol = '${ es_usuario.rol}'
                where usuario.documento = '${ es_usuario.cedula}';
            `)
            return es_usuario.cedula
        })

        return result
    }

    buscararticulos = async (from: number, size: number) => {
        let es_articulos = await this.ArticleIndex.where({ role: 'articulo' }, from.toString(), size.toString())

        let result = await map(es_articulos, async es_articulo => {

            let state = es_articulo.state == 'published' ? '1' : '2';
            try {


                let nikCategoria = await this.db.NIK<{ id_categoria: string, base_id: string }>(`
                select
                a.id as id_categoria,
                a.base_id
                from categoria a
                where a.es_id = '${es_articulo.category}'
            `)

                if (nikCategoria && state == '1') {

                    let [nik_articulo] = await this.db.NIK<articuloRaw>(`
                    select 
                    * 
                    from 
                    articulo 
                    where articulo.es_id = '${ es_articulo.id}'
                `)

                    if (!nik_articulo) {
                        let [nikArticulo] = await this.db.NIK<articuloRaw>(`
                            CALL crear_articulo(?,?,?,?,?,?)
                        `, [es_articulo.title, es_articulo.content, es_articulo.obj, state, nikCategoria[0].id_categoria, es_articulo.id])


                        if (es_articulo.tags.length) {
                            await map(es_articulo.tags, async tag => {
                                await this.db.NIK(`call crear_tag(?,?)`, [nikArticulo.id.toString(), tag])
                            })
                        }

                        if (es_articulo.attached?.length) {
                            await map(es_articulo.attached, async archivo => {
                                await this.db.NIK(`call agregar_adjunto(?,?)`, [archivo, nikArticulo.id.toString()])
                            })
                        }
                        return es_articulo.id
                    } else {
                        return null
                    }

                }
            } catch (err) {
                console.log(err)
                return null
            }
        })

        return result

    }

}