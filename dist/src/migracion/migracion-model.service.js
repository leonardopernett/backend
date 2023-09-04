"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigracionModelService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
const user_index_1 = require("../elastic-search/indices/user-index");
const categoria_index_1 = require("../elastic-search/indices/categoria-index");
const article_index_1 = require("../elastic-search/indices/article-index");
const articuloIndex_1 = require("../articulos/articuloIndex");
const articleViews_index_1 = require("../elastic-search/indices/articleViews-index");
const comments_index_1 = require("../elastic-search/indices/comments-index");
const userFavorites_index_1 = require("../elastic-search/indices/userFavorites-index");
const likesUser_index_1 = require("../elastic-search/indices/likesUser-index");
const async_1 = require("async");
let MigracionModelService = class MigracionModelService {
    constructor(db, userIndex, CategoriesIndex, ArticleIndex, articuloIndex, ArticlesViewsIndex, CommentsIndex, FavoriteUserIndex, LikeUserIndex) {
        this.db = db;
        this.userIndex = userIndex;
        this.CategoriesIndex = CategoriesIndex;
        this.ArticleIndex = ArticleIndex;
        this.articuloIndex = articuloIndex;
        this.ArticlesViewsIndex = ArticlesViewsIndex;
        this.CommentsIndex = CommentsIndex;
        this.FavoriteUserIndex = FavoriteUserIndex;
        this.LikeUserIndex = LikeUserIndex;
        this.migrateUsers = async (from, size) => {
            let es_usuarios = await this.userIndex.query({
                from: from,
                size: size,
                query: {
                    "match_all": {}
                }
            });
            let nik_usuarios = await async_1.map(es_usuarios, async (es_usuario) => {
                try {
                    return await this.db.NIK(`
                    INSERT INTO usuario
                    (
                        user_name,
                        documento
                    )
                    VALUES
                    ('${es_usuario.nombre}', '${es_usuario.cedula}');
                `);
                }
                catch (err) {
                    console.log(err);
                }
            });
            return nik_usuarios;
        };
        this.migrateUserBases = async (from, size) => {
            let es_usuarios = await this.userIndex.query({
                from: from,
                size: size,
                query: {
                    "match_all": {}
                }
            });
            await async_1.map(es_usuarios, async (es_usuario) => {
                await async_1.map(es_usuario.pcrc, async (pcrc) => {
                    try {
                        return await this.db.NIK(`
                    insert into usuario_base (documento, base_id)
                    values ('${es_usuario.cedula}', '${pcrc}');
                    `);
                    }
                    catch (error) {
                        console.log(error);
                        return null;
                    }
                });
            });
        };
        this.migrarCategorias = async (from, size) => {
            let es_categorias = await this.CategoriesIndex.query({
                from: from,
                size: size,
                query: {
                    "match_all": {}
                }
            });
            let nikCategorias = await async_1.map(es_categorias, async (categoria) => {
                try {
                    let nikCategoria = await this.db.NIK(`
                insert into categoria (name, position, icon, base_id, parent_id, es_id)
                values ('${categoria.name}', '${categoria.position}', '${categoria.icon}', '${categoria.pcrc}', null,'${categoria.id}');
                `);
                    return nikCategoria;
                }
                catch (error) {
                    console.log(error);
                    return null;
                }
            });
            return nikCategorias;
        };
        this.migrarArticulos = async (from, size) => {
            let es_articulos = await this.ArticleIndex.where({ role: 'articulo' }, from.toString(), size.toString());
            let result = await async_1.map(es_articulos, async (es_articulo) => {
                var _a;
                let state = es_articulo.state == 'published' ? '1' : '2';
                try {
                    let nikCategoria = await this.db.NIK(`
                select
                a.id as id_categoria,
                a.base_id
                from categoria a
                where a.es_id = '${es_articulo.category}'
            `);
                    if (nikCategoria && state == '1') {
                        let [nikArticulo] = await this.db.NIK(`
                    CALL crear_articulo(?,?,?,?,?,?)
                `, [es_articulo.title, es_articulo.content, es_articulo.obj, state, nikCategoria[0].id_categoria, es_articulo.id]);
                        if (es_articulo.tags.length) {
                            await async_1.map(es_articulo.tags, async (tag) => {
                                await this.db.NIK(`call crear_tag(?,?)`, [nikArticulo.id.toString(), tag]);
                            });
                        }
                        if ((_a = es_articulo.attached) === null || _a === void 0 ? void 0 : _a.length) {
                            await async_1.map(es_articulo.attached, async (archivo) => {
                                await this.db.NIK(`call agregar_adjunto(?,?)`, [archivo, nikArticulo.id.toString()]);
                            });
                        }
                    }
                }
                catch (err) {
                    console.log(err);
                    return null;
                }
            });
            return result;
        };
        this.migrarVistasArticulo = async (from, size) => {
            let nik_articulos = await this.db.NIK(`
            select
            *
            from
            articulo
            limit ${from} ,${size} 
        `);
            return await async_1.map(nik_articulos, async (articulo) => {
                let vistas = await this.ArticlesViewsIndex.where({
                    articulo: articulo.es_id
                });
                await async_1.map(vistas, async (vista) => {
                    try {
                        await this.db.NIK(`call agregar_vista_articulo(?,?,?,?)`, [articulo.id.toString(), vista.user, (new Date(vista.initialDate)).toJSON().slice(0, 19).replace('T', ' '), (new Date(vista.finalDate)).toJSON().slice(0, 19).replace('T', ' ')]);
                    }
                    catch (error) {
                        console.log(error);
                        return null;
                    }
                });
                return vistas;
            });
        };
        this.migrarComentario = async (from, size) => {
            let nik_articulos = await this.db.NIK(`
            select
            *
            from
            articulo
            limit ${from} ,${size}
        `);
            await async_1.map(nik_articulos, async (nik_articulo) => {
                let es_comentarios = await this.CommentsIndex.where({ articulo: nik_articulo.es_id });
                let ids_comentarios = await async_1.map(es_comentarios, async (es_comentario) => {
                    try {
                        let [nuevoComentario] = await this.db.NIK(`call agregar_comentario(?,?,?,?)`, [nik_articulo.id.toString(), es_comentario.user, es_comentario.replyTo, es_comentario.text]);
                        return { nuevo_id: nuevoComentario.id, viejo_id: es_comentario.id };
                    }
                    catch (error) {
                        console.log(error);
                        return null;
                    }
                });
                await async_1.map(ids_comentarios.filter(id => id), async (ids) => {
                    try {
                        await this.db.NIK(`
                    update comentario set reply_to='${ids.nuevo_id}'
                    where reply_to='${ids.viejo_id}'
                    `);
                    }
                    catch (error) {
                        console.log(error);
                        return null;
                    }
                });
            });
        };
        this.migrarFavoritos = async (from, size) => {
            let nik_usuarios = await this.db.NIK(`
            select
            *
            from usuario
            limit ${from},${size}
        `);
            await async_1.map(nik_usuarios, async (nik_usuario) => {
                let favoritos = await this.FavoriteUserIndex.where({ user: nik_usuario.documento });
                await async_1.map(favoritos, async (favorito) => {
                    let [articulo_nik] = await this.db.NIK(`
                    select 
                    * 
                    from articulo where articulo.es_id = '${favorito.article}'
                `);
                    try {
                        await this.db.NIK(`call agregar_favorito(?,?)`, [articulo_nik.id.toString(), favorito.user]);
                    }
                    catch (error) {
                        console.log(error);
                        return null;
                    }
                });
            });
        };
        this.migrarMeGusta = async (from, size) => {
            let nik_articulos = await this.db.NIK(`
            select
            *
            from
            articulo
            limit ${from} ,${size}
        `);
            await async_1.map(nik_articulos, async (articulo) => {
                let valoraciones = await this.LikeUserIndex.where({ article: articulo.es_id });
                await async_1.map(valoraciones, async (valoracion) => {
                    try {
                        await this.db.NIK(`call agregar_valoracion(?,?,?)`, [articulo.id.toString(), valoracion.type, valoracion.user]);
                    }
                    catch (err) {
                        console.log(err);
                        return null;
                    }
                });
            });
        };
        this.agregarArticulosEs = async (from, size) => {
            let nik_articulos = await this.db.NIK(`
            select
            *
            from
            articulo
            limit ${from} ,${size}
        `);
            return await async_1.map(nik_articulos, async (articulo) => {
                let [likes, dislikes, favoritos, vistas] = await Promise.all([
                    this.db.NIK(`
                    select 
                    count(1) as likes
                    from valoraciones 
                    where valoraciones.articulo_id = '${articulo.id}' 
                    and valoraciones.tipo_valoracion = 'like'
                    and ISNULL(valoraciones.final_date)
                `),
                    this.db.NIK(`
                    select 
                    count(1) as dislikes
                    from valoraciones 
                    where valoraciones.articulo_id = '${articulo.id}' 
                    and valoraciones.tipo_valoracion = 'dislike'
                    and ISNULL(valoraciones.final_date)
                `),
                    this.db.NIK(`
                    select 
                    count(1) as favoritos
                    from favorito 
                    where favorito.articulo_id = '${articulo.id}' 
                    and ISNULL(favorito.final_date)
                `),
                    this.db.NIK(`
                    select 
                    count(1) as vistas
                    from vista
                    where vista.articulo_id = '${articulo.id}'
                `)
                ]);
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
                }, articulo.id.toString());
                return result.title;
            });
        };
        this.arreglarCategorias = async (from, size) => {
            let es_categorias = (await this.CategoriesIndex.query({
                from: from,
                size: size,
                query: {
                    "match_all": {}
                }
            })).filter(categoria => !!categoria.group);
            return await async_1.map(es_categorias, async (categoria) => {
                let nik_parent = await this.db.NIK(`
                select 
                * from 
                categoria 
                where categoria.es_id = '${categoria.group}'
            `);
                if (nik_parent[0]) {
                    await this.db.NIK(`
                update
                categoria
                set parent_id = '${nik_parent[0].id}'
                where categoria.es_id = '${categoria.id}'
                `);
                    return nik_parent[0].name;
                }
            });
        };
        this.arreglarUsuarios = async (from, size) => {
            let es_usuarios = await this.userIndex.query({
                from: from,
                size: size,
                query: {
                    "match_all": {}
                }
            });
            let result = await async_1.map(es_usuarios, async (es_usuario) => {
                await this.db.NIK(`
                update
                usuario
                set
                rol = '${es_usuario.rol}'
                where usuario.documento = '${es_usuario.cedula}';
            `);
                return es_usuario.cedula;
            });
            return result;
        };
        this.buscararticulos = async (from, size) => {
            let es_articulos = await this.ArticleIndex.where({ role: 'articulo' }, from.toString(), size.toString());
            let result = await async_1.map(es_articulos, async (es_articulo) => {
                var _a;
                let state = es_articulo.state == 'published' ? '1' : '2';
                try {
                    let nikCategoria = await this.db.NIK(`
                select
                a.id as id_categoria,
                a.base_id
                from categoria a
                where a.es_id = '${es_articulo.category}'
            `);
                    if (nikCategoria && state == '1') {
                        let [nik_articulo] = await this.db.NIK(`
                    select 
                    * 
                    from 
                    articulo 
                    where articulo.es_id = '${es_articulo.id}'
                `);
                        if (!nik_articulo) {
                            let [nikArticulo] = await this.db.NIK(`
                            CALL crear_articulo(?,?,?,?,?,?)
                        `, [es_articulo.title, es_articulo.content, es_articulo.obj, state, nikCategoria[0].id_categoria, es_articulo.id]);
                            if (es_articulo.tags.length) {
                                await async_1.map(es_articulo.tags, async (tag) => {
                                    await this.db.NIK(`call crear_tag(?,?)`, [nikArticulo.id.toString(), tag]);
                                });
                            }
                            if ((_a = es_articulo.attached) === null || _a === void 0 ? void 0 : _a.length) {
                                await async_1.map(es_articulo.attached, async (archivo) => {
                                    await this.db.NIK(`call agregar_adjunto(?,?)`, [archivo, nikArticulo.id.toString()]);
                                });
                            }
                            return es_articulo.id;
                        }
                        else {
                            return null;
                        }
                    }
                }
                catch (err) {
                    console.log(err);
                    return null;
                }
            });
            return result;
        };
    }
};
MigracionModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService,
        user_index_1.UserIndex,
        categoria_index_1.CategoriesIndex,
        article_index_1.ArticleIndex,
        articuloIndex_1.ArticuloIndex,
        articleViews_index_1.ArticlesViewsIndex,
        comments_index_1.CommentsIndex,
        userFavorites_index_1.FavoriteUserIndex,
        likesUser_index_1.LikeUserIndex])
], MigracionModelService);
exports.MigracionModelService = MigracionModelService;
//# sourceMappingURL=migracion-model.service.js.map