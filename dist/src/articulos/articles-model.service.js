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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesModelService = exports.articleViewsDTO = exports.updateArticleDTO = exports.articleDTO = void 0;
const common_1 = require("@nestjs/common");
const async_1 = require("async");
const axios_1 = require("axios");
const articuloIndex_1 = require("./articuloIndex");
const categories_model_service_1 = require("../categorias/categories-model.service");
const s3_bucket_service_1 = require("../s3/s3-bucket.service");
const db_service_1 = require("../databases/db.service");
const https = require("https");
const conexion_1 = require("../elastic-search/conexion");
class articleDTO {
}
exports.articleDTO = articleDTO;
class updateArticleDTO {
}
exports.updateArticleDTO = updateArticleDTO;
class articleViewsDTO {
}
exports.articleViewsDTO = articleViewsDTO;
let ArticlesModelService = class ArticlesModelService {
    constructor(db, articuloIndex, categoriesModel, S3BucketService) {
        this.db = db;
        this.articuloIndex = articuloIndex;
        this.categoriesModel = categoriesModel;
        this.S3BucketService = S3BucketService;
        this.createArticuloIndex = async () => {
            return await this.articuloIndex.createIndex({
                "mappings": {
                    "properties": {
                        "title": { "type": "text" },
                        "content": { "type": "text", "analyzer": "spanish" },
                        "tags": { "type": "keyword" },
                        "likes": { "type": "keyword" },
                        "disLikes": { "type": "keyword" },
                        "favorites": { "type": "keyword" },
                        "state": { "type": "keyword" },
                        "publicationDate": { "type": "date", "format": 'epoch_millis' },
                        "base": { "type": "keyword" },
                        "category": { "type": "keyword" },
                        "views": { "type": "integer" },
                        "type": { "type": "keyword" }
                    }
                }
            });
        };
        this.deleteArticuloIndex = async () => {
            return await this.articuloIndex.deleteIndex();
        };
        this.getArticlesByView = async (pcrcId, from = '0', size = '10') => {
            return await this.db.NIK('CALL get_articulos_by_views(?,?,?)', [pcrcId, from, size]);
        };
        this.getArticlesByUpdate = async (pcrcId, from = '0', size = '10') => {
            return await this.db.NIK('CALL get_articulos_by_update(?,?,?)', [pcrcId, from, size]);
        };
        this.getArticlesByRequired = async (pcrcId, documento, from, size) => {
            let data, data2F;
            let retornar = [];
            let [[usuario]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [documento]);
            data = await this.db.NIK('CALL get_articulos_by_required(?,?,?,?)', [pcrcId, documento, from, size]);
            let [data2] = await this.db.nikcleanPoolConection.query(`SELECT h.id_articulo from articulos_obligatorios h
        JOIN articulos_obligatorio_usuario f ON f.id_periodo=h.id
        WHERE id_articulo IN (SELECT k.id_articulo FROM articulos_obligatorios k) AND  f.id_usuario=? AND h.validacion_obligatoria=0`, usuario.id);
            data2F = data2.map(data => { return data.id_articulo; });
            data.forEach(element => {
                if (data2F.indexOf(element.id) == -1) {
                    retornar.push(element);
                }
            });
            return retornar;
        };
        this.totalarticlerequired = async (pcrcId, documento) => {
            return await this.db.NIK('CALL get_articulos_by_required_total(?,?)', [pcrcId, documento]);
        };
        this.deleteArticle = async (id, userId, username) => {
            let tiempoTranscurrido = Date.now();
            let hoy = new Date(tiempoTranscurrido);
            let [[article]] = await Promise.all([
                this.db.NIK('select * from articulo where id = ?', [id])
            ]);
            await this.db.NIK(`
               insert into papeleria_reciclajes 
               (title, content, obj, state,  categoria_id, base_id, es_id, cliente_id, user_name  ) 
               values (?,?,?,?,?,?,?,?,?) `, [
                article.title,
                article.content,
                article.obj,
                article.state,
                article.categoria_id,
                article.base_id,
                article.es_id,
                article.cliente_id,
                username
            ]);
            let [[articulo], archivos] = await Promise.all([
                this.db.NIK('call get_articulo(?)', [id]),
                this.db.NIK('call get_articulo_archivos(?)', [id])
            ]);
            try {
                const es = await conexion_1.client();
                await es.delete({
                    index: "articulo",
                    id: articulo.id.toString()
                });
            }
            catch (error) {
            }
            let borrarArchivosPromises = archivos.map(archivo => this.S3BucketService.deleteFile(id, archivo.file_name));
            var borrarImagenesPromises = JSON.parse(articulo.obj).ops.filter((action) => {
                var _a;
                if ((_a = action === null || action === void 0 ? void 0 : action.insert) === null || _a === void 0 ? void 0 : _a.image) {
                    if (action.insert.image.startsWith(`/files/${id}/${id}`, 0)) {
                        return true;
                    }
                }
                return false;
            }).map(action => this.S3BucketService.deleteImage(action.insert.image));
            Promise.all([
                this.db.NIK('CALL borrar_articulo(?,?)', [id, userId]),
                this.db.nikcleanPoolConection.query('INSERT INTO borrar_articulo_log (id_articulo,titulo,id_base,id_categoria,documento,fecha_eliminado) VALUES (?,?,?,?,?,?)', [id, article.title, article.base_id, article.categoria_id, userId, hoy.toISOString()]),
                this.articuloIndex.delete(articulo.id.toString()),
                ...borrarArchivosPromises,
                ...borrarImagenesPromises
            ]);
        };
        this.updateArticle = async (id, article, modificationUser_id) => {
            let [prevArticle, objWithoutImages] = await Promise.all([
                this.db.NIK('call get_articulo(?)', [id]),
                this.updateArticleImages(id, JSON.parse(article.obj)),
                this.db.NIK('call borrar_tags_articulo(?)', [id])
            ]);
            let promiseActualizarEstado = null;
            let promiseCambioContenido = null;
            let promiseTags = null;
            if (article.state.toString() != prevArticle[0].state) {
                promiseActualizarEstado = this.db.NIK('CALL crear_estado_articulo(?,?,?)', [id, article.state.toString(), modificationUser_id]);
            }
            if (objWithoutImages != prevArticle[0].obj) {
                promiseCambioContenido = this.db.NIK('CALL crear_cambio_articulo(?,?,?,?)', [id, modificationUser_id, objWithoutImages, article.title]);
            }
            if (article.title) {
                promiseCambioContenido = this.db.NIK('CALL crear_cambio_articulo(?,?,?,?)', [id, modificationUser_id, objWithoutImages, article.title]);
            }
            if (article.tags) {
                promiseTags = Promise.all(article.tags.map(tag => this.db.NIK('call crear_tag(?,?)', [id, tag])));
            }
            try {
                const es = await conexion_1.client();
                const res = await es.update({
                    index: "articulo",
                    id: id,
                    body: {
                        doc: {
                            content: article.content,
                            title: article.title,
                            tags: article.tags,
                            state: article.state
                        }
                    }
                });
            }
            catch (error) {
                console.log(error);
            }
            await this.db.NIK('CALL actualizar_articulo(?,?,?,?,?,?)', [id, article.title, article.content, objWithoutImages, article.state.toString(), modificationUser_id]),
                await this.compareDeletedImages(id, objWithoutImages, prevArticle[0].obj),
                promiseActualizarEstado,
                promiseCambioContenido,
                promiseTags,
                await this.articuloIndex.updatePartialDocument(id, { tags: article.tags });
        };
        this.addArticleView = async (articleId, initialDate, finalDate, userId) => {
            let [{ vistas }] = await this.db.NIK('call agregar_vista_articulo(?, ?, ?, ?)', [articleId, userId, (new Date(initialDate)).toJSON().slice(0, 19).replace('T', ' '), (new Date(finalDate)).toJSON().slice(0, 19).replace('T', ' ')]);
            return { vistas: vistas };
        };
        this.uploadFile = async (idArticle, file) => {
            await Promise.all([
                this.S3BucketService.uploadFile(idArticle, file),
                this.db.NIK('call agregar_adjunto(?,?)', [file.originalname, idArticle])
            ]);
            return { file: file.originalname };
        };
        this.getArticuloFiles = async (idArticulo) => {
            return await this.db.NIK('call get_articulo_archivos(?)', [idArticulo]);
        };
    }
    async getArticlesByCategory(category, state = '1', from = '0', size = '10') {
        return await this.db.NIK('call get_articulos_categoria(?, ?, ?, ?)', [category, state, from, size]);
    }
    async getArticlePopular(vectorids) {
        const newStr = vectorids.replace(/[[\]]/g, '');
        const newStr2 = newStr.split(',');
        let newStr3 = newStr2.map(data => {
            return '"' + data + '"';
        });
        let vectoridsfinal = newStr3.join();
        let data = await this.db.nikcleanPoolConection.query(`SELECT * FROM (SELECT articulo.id,count(articulo.id) AS total FROM articulo 
       JOIN vista ON vista.articulo_id=articulo.id
       WHERE articulo.id IN(` + vectoridsfinal + `) 
       GROUP BY articulo.id) AS temp ORDER BY total DESC`);
        return data;
    }
    async getArticlesByQuery(query, group, state = 'published', from = '0', size = '10') {
        let estado = await this.db.NIK(`SELECT estado FROM buscador_estado`);
        if (estado[0].estado == 1) {
            let search = await this.db.NIK(`
        SELECT
            a.id,
            a.title,
            a.content,
            a.obj,
            a.id_otros,
            a.state,
            a.categoria_id,
            a.base_id,
            a.type,
            (SELECT COUNT(*) FROM valoraciones b WHERE b.articulo_id=a.id AND b.tipo_valoracion='like') AS likes,
            (SELECT COUNT(*) FROM valoraciones b WHERE b.articulo_id=a.id AND b.tipo_valoracion='disLike') AS dislikes,
            (SELECT COUNT(*) FROM favorito c WHERE c.articulo_id=a.id) AS favoritos,
            (SELECT COUNT(*) FROM vista d WHERE d.articulo_id=a.id) AS vistas,
            a.creation_date AS fecha_evento
            FROM articulo a
            WHERE
            a.base_id=? 
            AND MATCH(a.title) AGAINST(? IN BOOLEAN MODE)
                AND MATCH(a.content) AGAINST(? IN BOOLEAN MODE)
            LIMIT ?,?
        `, [group.base, query, query, parseInt(from), parseInt(size)]);
            return await async_1.map(search, async (articulo) => {
                return {
                    ...articulo,
                    "requerido": null,
                    "tags": [],
                    "attached": [],
                    "highlight": [articulo.content]
                };
            });
        }
        else {
            let datos = [];
            const es = await conexion_1.client();
            const resultado = await es.search({
                index: 'articulo',
                body: {
                    query: {
                        bool: {
                            must: [
                                {
                                    multi_match: {
                                        'query': query,
                                        'fields': ['title', 'content', 'tags'],
                                        tie_breaker: 0.7,
                                        fuzziness: 2,
                                        prefix_length: 3
                                    }
                                }
                            ],
                            filter: [
                                { 'term': { 'type': 'articulo' } },
                                { 'term': group },
                                { 'term': { 'state': 1 } }
                            ],
                            should: [
                                {
                                    match_phrase: {
                                        'content': query
                                    }
                                }
                            ]
                        }
                    },
                    from: parseInt(from),
                    size: parseInt(size),
                    highlight: {
                        fields: {
                            "content": { "type": "plain" }
                        }
                    }
                }
            });
            resultado.body.hits.hits.forEach(async (data) => {
                let dato = await this.getArticle(data._id);
                if (dato.id == undefined) {
                    const es = await conexion_1.client();
                    await es.delete({
                        index: "articulo",
                        id: data._id.toString()
                    });
                }
            });
            resultado.body.hits.hits.forEach((data) => {
                datos.push({ ...data._source, id: data._id, ...data.highlight });
            });
            return await async_1.map(datos, async (articulo) => {
                let data = await this.getArticle(articulo.id);
                return { ...data, highlight: articulo.content };
            });
        }
    }
    async getArticlesByTag(options) {
        return await this.db.NIK('CALL get_articulos_by_tag(?,?,?,?)', [options.tag, options.subline, options.from, options.size]);
    }
    async getArticle(articleId) {
        if (isNaN(parseInt(articleId))) {
            let [articulo] = await this.db.NIK(`call get_article_by_esid(?)`, [articleId]);
            let [tags, files] = await Promise.all([
                await this.db.NIK('call get_articulo_tags(?)', [articulo.id.toString()]),
                await this.getArticuloFiles(articulo.id.toString())
            ]);
            return { ...articulo, tags: tags.map(tag => tag.tag), attached: files.map(file => file.file_name) };
        }
        else {
            let [[articulo], tags, files] = await Promise.all([
                await this.db.NIK('call get_articulo(?)', [articleId]),
                await this.db.NIK('call get_articulo_tags(?)', [articleId]),
                await this.getArticuloFiles(articleId)
            ]);
            if (articulo == undefined) {
                let [[articulo]] = await Promise.all([
                    await this.db.NIK('call get_articulo_otros(?)', [articleId])
                ]);
                return { ...articulo };
            }
            else {
                return { ...articulo, tags: tags.map(tag => tag.tag), attached: files.map(file => file.file_name) };
            }
        }
    }
    async createArticle(article, creator_id) {
        let [articuloCreado, categoria] = await Promise.all([
            this.db.NIK('CALL crear_articulo(?,?,?,?,?,?,?)', [article.title, article.content, article.obj, article.state.toString(), article.category, null, creator_id]),
            this.categoriesModel.getSingleCategory(article.category)
        ]);
        let newQuillJsObj = await this.updateArticleImages(articuloCreado[0].id.toString(), JSON.parse(articuloCreado[0].obj));
        if (article.done) {
            article.tags.map(tag => this.db.NIK('call crear_tag(?,?)', [articuloCreado[0].id.toString(), tag]));
        }
        const es = await conexion_1.client();
        await Promise.all([
            es.index({
                index: 'articulo',
                id: articuloCreado[0].id.toString(),
                body: {
                    base: categoria.base_id.toString(),
                    likes: 0,
                    disLikes: 0,
                    favorites: 0,
                    views: 0,
                    publicationDate: (new Date()).getTime(),
                    type: 'articulo',
                    ...article,
                }
            }),
            this.db.NIK('CALL actualizar_articulo(?,?,?,?,?,?)', [articuloCreado[0].id.toString(), article.title, article.content, newQuillJsObj, article.state.toString(), creator_id]),
            this.db.NIK('CALL crear_estado_articulo(?,?,?)', [articuloCreado[0].id.toString(), article.state.toString(), creator_id]),
            this.db.NIK('CALL crear_cambio_articulo(?,?,?,?)', [articuloCreado[0].id.toString(), creator_id, newQuillJsObj, article.title]),
        ]);
        return articuloCreado[0];
    }
    async creararticlerequired(idarticulo, idpcrc, fechainicial, fechafinal, title, active) {
        let data = await this.db.nikcleanPoolConection.query('INSERT INTO articulos_obligatorios (id_articulo,fecha_inicial,fecha_final,titulo,validacion_obligatoria) VALUES (?,?,?,?,?)', [idarticulo, fechainicial, fechafinal, title, active]);
        let pcrcList = idpcrc.map(item => [item, data[0].insertId]);
        await this.db.nikcleanPoolConection.query('INSERT INTO articulo_obligatorio_pcrcs (id_pcrc, id_periodo ) VALUES ?', [pcrcList]);
        return data[0].insertId;
    }
    async viewarticlerequired(id_articulo, cedula) {
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM articulos_obligatorios WHERE articulos_obligatorios.id_articulo=?', [id_articulo]);
        await this.db.nikcleanPoolConection.query('INSERT INTO articulos_obligatorio_usuario (id_periodo,id_usuario) VALUES (?,?)', [dato.id, data.id]);
    }
    async validarCuestionario(id_articulo, cedula) {
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        return await this.db.nikcleanPoolConection.query('SELECT COUNT(*) as validar FROM cuestionario_valido a WHERE a.id_usuario=? AND a.id_articulo=?', [data.id, id_articulo]);
    }
    async guardarCuestionario(id_articulo, cedula) {
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        await this.db.nikcleanPoolConection.query('INSERT INTO cuestionario_valido (id_usuario,id_articulo) VALUES (?,?)', [data.id, id_articulo]);
    }
    async verifyrequired(articleId, cedula) {
        let [[datos]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let data = await this.db.nikcleanPoolConection.query(`SELECT h.id FROM articulos_obligatorios h
        JOIN articulos_obligatorio_usuario f ON f.id_periodo=h.id
        WHERE h.id_articulo=? AND  f.id_usuario=?`, [articleId, datos.id]);
        if (data[0].length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async verifyrequiredfecha(articleId) {
        let data = await this.db.nikcleanPoolConection.query(`SELECT h.id FROM articulos_obligatorios h
        WHERE h.id_articulo=? AND h.fecha_inicial<NOW() AND h.fecha_final>NOW()`, [articleId]);
        if (data[0].length === 0) {
            return true;
        }
        else {
            return false;
        }
    }
    async active(articleId, cedula) {
        let [[datos]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT h.validacion_obligatoria FROM articulos_obligatorios h
        JOIN articulos_obligatorio_usuario f ON f.id_periodo=h.id
        WHERE h.id_articulo=? AND  f.id_usuario=?`, [articleId, datos.id]);
        return data;
    }
    async verifyrequiredjarvis(cedula) {
        let [data] = await this.db.JARVIS(`SELECT b.id_dp_pcrc AS pcrc,MAX(a.fecha_actual) AS ultimafecha FROM dp_distribucion_personal a
        JOIN dp_pcrc b ON b.cod_pcrc=a.cod_pcrc
        WHERE a.documento=?`, [cedula]);
        return data.pcrc;
    }
    async verifyarticlejarvis(idarticulo) {
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT b.id_pcrc FROM articulos_obligatorios a 
        JOIN articulo_obligatorio_pcrcs b ON b.id_periodo=a.id
        WHERE a.id_articulo=?`, [idarticulo]);
        let datos = data.map(item => item.id_pcrc);
        if (datos.length === 0) {
            return null;
        }
        else {
            return datos;
        }
    }
    async tablaobligatorios() {
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT a.id,b.id AS id_articulo,b.title,a.fecha_inicial,a.fecha_final,a.estado,a.fecha_creacion,a.titulo 
        FROM articulos_obligatorios a
        JOIN articulo b ON b.id=a.id_articulo`);
        return data;
    }
    async editarperiodo(inicial, final, titulo, id) {
        let [data] = await this.db.nikcleanPoolConection.query('UPDATE articulos_obligatorios SET fecha_inicial=?,fecha_final=?,titulo=? WHERE id=?', [inicial, final, titulo, id]);
        return data;
    }
    async buscararticulo(buscar) {
        const regex = /^[0-9]*$/;
        const esnumero = regex.test(buscar);
        if (esnumero === true) {
            let [data] = await this.db.nikcleanPoolConection.query(`SELECT a.id,b.id AS id_articulo,b.title,a.fecha_inicial,a.fecha_final,a.estado,a.fecha_creacion,a.titulo 
        FROM articulos_obligatorios a
        JOIN articulo b ON b.id=a.id_articulo
        WHERE b.id=?`, [buscar]);
            return data;
        }
        else {
            let [data] = await this.db.nikcleanPoolConection.query(`SELECT a.id,b.id AS id_articulo,b.title,a.fecha_inicial,a.fecha_final,a.estado,a.fecha_creacion,a.titulo 
        FROM articulos_obligatorios a
        JOIN articulo b ON b.id=a.id_articulo
        WHERE b.title LIKE ?`, [buscar]);
            return data;
        }
    }
    async actualizarValoraciones(articleId, id_usuario, tipoValoracion) {
        let [{ likes, dislikes }] = await this.db.NIK(`CALL agregar_valoracion(?, ?, ?)`, [articleId, tipoValoracion, id_usuario]);
        return { likes: likes, dislikes: dislikes };
    }
    async addFavorite(articleId, id_usuario) {
        let [{ favoritos }] = await this.db.NIK('call agregar_favorito(?,?)', [articleId, id_usuario]);
        return { favoritos: favoritos };
    }
    async prueba() {
        return await this.articuloIndex.all();
    }
    async updateArticleImages(articleId, quillJsObj) {
        let base64Strings = await async_1.map(quillJsObj.ops, async (action) => {
            var _a;
            let actionAux = action;
            if ((_a = action === null || action === void 0 ? void 0 : action.insert) === null || _a === void 0 ? void 0 : _a.image) {
                if (action.insert.image.startsWith('data:image/', 0)) {
                    let uploadResult = await this.S3BucketService.uploadImage(action.insert.image, articleId);
                    actionAux.insert.image = `/files/` + uploadResult.Key;
                }
                if (action.insert.image.startsWith('http://multiconsulta', 0)) {
                    let result = await axios_1.default.get(action.insert.image, {
                        responseType: 'arraybuffer',
                        httpsAgent: new https.Agent({ keepAlive: true, rejectUnauthorized: true })
                    });
                    let base64 = new Buffer(result.data, 'binary').toString('base64');
                    let uploadResult = await this.S3BucketService.uploadImage("data:image/jpeg;base64," + base64, articleId);
                    actionAux.insert.image = `/files/` + uploadResult.Key;
                }
            }
            return actionAux;
        });
        return JSON.stringify({ ops: base64Strings });
    }
    async compareDeletedImages(articleId, newQuillsObj, oldQuillObj) {
        let oldQuillObjImages = JSON.parse(oldQuillObj).ops.map((action) => {
            var _a;
            if ((_a = action === null || action === void 0 ? void 0 : action.insert) === null || _a === void 0 ? void 0 : _a.image) {
                if (action.insert.image.startsWith(`/files/${articleId}/${articleId}`, 0)) {
                    return action.insert.image.replace(`/files/`, '');
                }
            }
            return null;
        }).filter(data => data);
        let newQuillsObjImages = JSON.parse(newQuillsObj).ops.map((action) => {
            var _a;
            if ((_a = action === null || action === void 0 ? void 0 : action.insert) === null || _a === void 0 ? void 0 : _a.image) {
                if (action.insert.image.startsWith(`/files/${articleId}/${articleId}`, 0)) {
                    return action.insert.image.replace(`/files/`, '');
                }
            }
            return null;
        }).filter(data => data);
        var imagesTodelete = oldQuillObjImages.filter(key => {
            return !newQuillsObjImages.includes(key);
        });
    }
    async deleteArticleImagenes(quillJsObj) {
    }
    async getCliente() {
        return await this.db.NIK(`SELECT a.id_dp_clientes,a.cliente FROM dp_clientes a
        UNION
        SELECT b.id_clientes AS id_dp_clientes,b.nombre AS cliente FROM dp_clientes_nik b`);
    }
    async getMultipleUser(pcrc) {
        return await this.db.NIK(`SELECT a.id,  b.pcrc, a.pcrc_destino FROM permisos_multiples a INNER JOIN dp_pcrc b ON a.pcrc_destino = b.cod_pcrc WHERE pcrc_origen = ?`, [pcrc]);
    }
    async getPcrc(pcrc) {
        if (pcrc === undefined) {
            return [];
        }
        if (pcrc.length === 0) {
            return [];
        }
        let data = pcrc.join();
        return await this.db.NIK(`SELECT a.id_dp_pcrc,a.pcrc,a.cod_pcrc FROM dp_pcrc a WHERE a.id_dp_clientes IN (` + data + `)
      UNION
      SELECT b.id_dp_pcrc,b.pcrc,b.id_dp_pcrc AS cod_pcrc FROM dp_pcrc_nik b WHERE b.base_id IN (` + data + `)`);
    }
    async getObligatorioEdit(id) {
        let data = await this.db.NIK('SELECT * FROM articulos_obligatorios a WHERE a.id_articulo=?', [id]);
        return data;
    }
    async getObligatorioPreguntas(id) {
        let data = await this.db.NIK(`SELECT * FROM pregunta a
        JOIN respuestas b ON a.id_pregunta=b.id_pregunta
        WHERE a.id_obligatorio=?`, [id]);
        return data;
    }
    async guardarResultado(id_articulo, cedula, respuestas) {
        let [[dato]] = await this.db.nikcleanPoolConection.query('SELECT id FROM usuario WHERE documento=?', [cedula]);
        let [[idobligatorio]] = await this.db.nikcleanPoolConection.query('SELECT id FROM articulos_obligatorios WHERE id_articulo=?', [id_articulo]);
        let [[resultado]] = await this.db.nikcleanPoolConection.query(`SELECT a.intentos FROM respuesta_resultados a
        WHERE a.id_usuario=? AND a.id_articulo=? AND a.id_periodo=?
        ORDER BY a.id_respuesta_resultado DESC LIMIT 1`, [dato.id, id_articulo, idobligatorio.id]);
        let data;
        if (resultado == undefined) {
            data = respuestas.map(item => [dato.id, item, id_articulo, 1, idobligatorio.id]);
        }
        else {
            data = respuestas.map(item => [dato.id, item, id_articulo, resultado.intentos + 1, idobligatorio.id]);
        }
        this.db.nikcleanPoolConection.query('INSERT INTO respuesta_resultados (id_usuario,id_respuesta,id_articulo,intentos,id_periodo) VALUES ?', [data]);
    }
    async validarRespuestas(respuestas) {
        let totalrespuestas = respuestas.length;
        let data = await this.db.NIK('SELECT COUNT(*) as validar FROM respuestas a WHERE a.id_respuestas IN (' + respuestas.join() + ') AND a.valida=1 ');
        if (data[0].validar == totalrespuestas) {
            return 0;
        }
        else {
            return 1;
        }
    }
    async guardarPreguntas(idobligatorio, preguntas, respuestas) {
        let preguntasFinal = preguntas.filter(Boolean);
        for (let index = 0; index < preguntasFinal.length; index++) {
            let RespuestasFinal = respuestas[index].filter(Boolean);
            let data = await this.db.nikcleanPoolConection.query('INSERT INTO pregunta (pregunta,id_obligatorio) VALUES (?,?)', [preguntasFinal[index], idobligatorio]);
            for (let i = 0; i < RespuestasFinal.length; i++) {
                if (i == 0) {
                    await this.db.nikcleanPoolConection.query('INSERT INTO respuestas (respuestas,valida,id_pregunta) VALUES (?,?,?)', [RespuestasFinal[i], 1, data[0].insertId]);
                }
                if (i != 0) {
                    await this.db.nikcleanPoolConection.query('INSERT INTO respuestas (respuestas,valida,id_pregunta) VALUES (?,?,?)', [RespuestasFinal[i], 0, data[0].insertId]);
                }
            }
        }
    }
    async resultadosCuestionario(fechaini, fechafin, idpcrc, limite, page) {
        let data = await this.db.NIKSLAVE(`
        SELECT
        s.id AS ido,
        s.titulo,
        s.fecha_inicial,
        s.fecha_final,
        l.id,
        h.user_name,
        j.fecha_respuesta,
        (
        SELECT 
        (
        SELECT COUNT(*) AS correcta FROM respuesta_resultados a
        JOIN respuestas b ON b.id_respuestas=a.id_respuesta
        WHERE a.id_articulo=j.id_articulo AND a.id_usuario=h.id
        AND a.intentos=j.intentos
        AND b.valida=1
        )
        /
        (
        SELECT COUNT(*) AS correcta FROM respuesta_resultados a
        JOIN respuestas b ON b.id_respuestas=a.id_respuesta
        WHERE a.id_articulo=j.id_articulo AND a.id_usuario=h.id
        AND a.intentos=j.intentos
        ) * 100  
        ) AS porcentaje,
        j.intentos
        FROM respuesta_resultados j
        JOIN usuario h ON h.id=j.id_usuario 
        JOIN articulos_obligatorios s ON s.id=j.id_periodo
        JOIN articulo k ON k.id=s.id_articulo
        LEFT JOIN articulos_obligatorio_usuario l ON l.id_usuario=j.id_usuario
        WHERE j.id_usuario IN (SELECT DISTINCT(g.id_usuario) FROM respuesta_resultados g)
        AND ((DATE_FORMAT(j.fecha_respuesta,'%Y/%m/%d') BETWEEN ? AND ?) OR l.fecha_vista IS NULL)
        AND k.base_id=?
        GROUP BY j.id_articulo,j.intentos,h.user_name
        LIMIT ? OFFSET ?
        `, [fechaini, fechafin, idpcrc, limite, page]);
        return data;
    }
    async resultadoscategoriaCuestionario(fechaini, fechafin, idcategoria, limite, page) {
        let data = await this.db.NIKSLAVE(`
        SELECT
        s.id AS ido,
        s.titulo,
        s.fecha_inicial,
        s.fecha_final,
        l.id,
        h.user_name,
        j.fecha_respuesta,
        (
        SELECT 
        (
        SELECT COUNT(*) AS correcta FROM respuesta_resultados a
        JOIN respuestas b ON b.id_respuestas=a.id_respuesta
        WHERE a.id_articulo=j.id_articulo AND a.id_usuario=h.id
        AND a.intentos=j.intentos
        AND b.valida=1
        )
        /
        (
        SELECT COUNT(*) AS correcta FROM respuesta_resultados a
        JOIN respuestas b ON b.id_respuestas=a.id_respuesta
        WHERE a.id_articulo=j.id_articulo AND a.id_usuario=h.id
        AND a.intentos=j.intentos
        ) * 100  
        ) AS porcentaje,
        j.intentos
        FROM respuesta_resultados j
        JOIN usuario h ON h.id=j.id_usuario 
        JOIN articulos_obligatorios s ON s.id=j.id_periodo
        JOIN articulo k ON k.id=s.id_articulo
        LEFT JOIN articulos_obligatorio_usuario l ON l.id_usuario=j.id_usuario
        WHERE j.id_usuario IN (SELECT DISTINCT(g.id_usuario) FROM respuesta_resultados g)
        AND ((DATE_FORMAT(j.fecha_respuesta,'%Y/%m/%d') BETWEEN ? AND ?) OR l.fecha_vista IS NULL)
        AND k.categoria_id=?
        GROUP BY j.id_articulo,j.intentos,h.user_name
        LIMIT ? OFFSET ?
        `, [fechaini, fechafin, idcategoria, limite, page]);
        return data;
    }
    async CuestionarioTotal(idpcrc, fechaini, fechafin) {
        const limite = 5;
        const limite2 = 100000;
        let data = await this.db.NIKSLAVE(`
        SELECT
SUM(total_cuestionario) as total_cuestionarios
FROM
(SELECT
1 AS total_cuestionario,
j.id_articulo,
j.intentos,
h.user_name
FROM
respuesta_resultados j
JOIN usuario h ON h.id = j.id_usuario
JOIN articulos_obligatorios s ON s.id = j.id_periodo
JOIN articulo k ON k.id = s.id_articulo
LEFT JOIN articulos_obligatorio_usuario l ON l.id_usuario = j.id_usuario
WHERE
j.id_usuario IN (
SELECT DISTINCT(g.id_usuario)
FROM respuesta_resultados g
)
AND (
(DATE_FORMAT(j.fecha_respuesta,'%Y/%m/%d') BETWEEN ? AND ?)
OR l.fecha_vista IS NULL
)
AND k.base_id = ?
GROUP BY
j.id_articulo,
j.intentos,
h.user_name
) AS subquery
`, [fechaini, fechafin, idpcrc]);
        let data1 = await this.Paginatotal(data[0].total_cuestionarios, limite);
        let data2 = await this.Paginatotalexcel(data[0].total_cuestionarios, limite2);
        return { "total_cuestionarios": data1, "total_exportar": data2 };
    }
    async CuestionariocategoriaTotal(idcategoria, fechaini, fechafin) {
        const limite = 5;
        const limite2 = 100000;
        let data = await this.db.NIKSLAVE(`
        SELECT
SUM(total_cuestionario) as total_cuestionarios
FROM
(SELECT
1 AS total_cuestionario,
j.id_articulo,
j.intentos,
h.user_name
FROM
respuesta_resultados j
JOIN usuario h ON h.id = j.id_usuario
JOIN articulos_obligatorios s ON s.id = j.id_periodo
JOIN articulo k ON k.id = s.id_articulo
LEFT JOIN articulos_obligatorio_usuario l ON l.id_usuario = j.id_usuario
WHERE
j.id_usuario IN (
SELECT DISTINCT(g.id_usuario)
FROM respuesta_resultados g
)
AND (
(DATE_FORMAT(j.fecha_respuesta,'%Y/%m/%d') BETWEEN ? AND ?)
OR l.fecha_vista IS NULL
)
AND k.categoria_id = ?
GROUP BY
j.id_articulo,
j.intentos,
h.user_name
) AS subquery
`, [fechaini, fechafin, idcategoria]);
        let data1 = await this.Paginatotal(data[0].total_cuestionarios, limite);
        let data2 = await this.Paginatotalexcel(data[0].total_cuestionarios, limite2);
        return { "total_cuestionarios": data1, "total_exportar": data2 };
    }
    async Paginatotalexcel(total_exportar, limite) {
        let numeroexportar = [];
        if (Number.isInteger(total_exportar / limite)) {
            for (var i = 1; i <= total_exportar / limite; i++) {
                numeroexportar.push(i);
            }
            return numeroexportar;
        }
        else {
            let num;
            num = parseFloat(total_exportar) / limite + 0.5;
            num = Math.round(num);
            num = Number(num.toFixed(0));
            for (var i = 1; i <= num; i++) {
                numeroexportar.push(i);
            }
            return numeroexportar;
        }
    }
    async Paginatotal(total_lecturas, limite) {
        if (Number.isInteger(total_lecturas / limite)) {
            return total_lecturas / limite;
        }
        else {
            let num;
            num = parseFloat(total_lecturas) / limite + 0.5;
            num = Math.round(num);
            num = Number(num.toFixed(0));
            return num;
        }
    }
    async getReportCuestionarioLimit(ini, fin, idpcrc, limite, pag) {
        let result = await this.db.NIKSLAVE(`
        SELECT
        s.id AS ido,
        s.titulo,
        s.fecha_inicial,
        s.fecha_final,
        l.id,
        h.user_name,
        j.fecha_respuesta,
        (
        SELECT 
        (
        SELECT COUNT(*) AS correcta FROM respuesta_resultados a
        JOIN respuestas b ON b.id_respuestas=a.id_respuesta
        WHERE a.id_articulo=j.id_articulo AND a.id_usuario=h.id
        AND a.intentos=j.intentos
        AND b.valida=1
        )
        /
        (
        SELECT COUNT(*) AS correcta FROM respuesta_resultados a
        JOIN respuestas b ON b.id_respuestas=a.id_respuesta
        WHERE a.id_articulo=j.id_articulo AND a.id_usuario=h.id
        AND a.intentos=j.intentos
        ) * 100  
        ) AS porcentaje,
        j.intentos
        FROM respuesta_resultados j
        JOIN usuario h ON h.id=j.id_usuario 
        JOIN articulos_obligatorios s ON s.id=j.id_periodo
        JOIN articulo k ON k.id=s.id_articulo
        LEFT JOIN articulos_obligatorio_usuario l ON l.id_usuario=j.id_usuario
        WHERE j.id_usuario IN (SELECT DISTINCT(g.id_usuario) FROM respuesta_resultados g)
        AND ((DATE_FORMAT(j.fecha_respuesta,'%Y/%m/%d') BETWEEN ? AND ?) OR l.fecha_vista IS NULL)
        AND k.base_id=?
        GROUP BY j.id_articulo,j.intentos,h.user_name
        LIMIT ? OFFSET ?`, [ini, fin, idpcrc, limite, pag]);
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
        worksheet.columns = [
            { header: 'ID', key: 'ido' },
            { header: 'Título', key: 'titulo' },
            { header: 'Fecha Inicial', key: 'fecha_inicial' },
            { header: 'Fecha Final', key: 'fecha_final' },
            { header: 'Validado', key: 'id' },
            { header: 'Usuario', key: 'user_name' },
            { header: 'Fecha Respuesta', key: 'fecha_respuesta' },
            { header: 'Porcentaje', key: 'porcentaje' },
            { header: 'Intentos', key: 'intentos' }
        ];
        worksheet.addRows(result);
        return await workbook.xlsx.writeBuffer();
    }
    async getReportCuestionariocategoriaLimit(ini, fin, idcategoria, limite, pag) {
        let result = await this.db.NIKSLAVE(`
        SELECT
        s.id AS ido,
        s.titulo,
        s.fecha_inicial,
        s.fecha_final,
        l.id,
        h.user_name,
        j.fecha_respuesta,
        (
        SELECT 
        (
        SELECT COUNT(*) AS correcta FROM respuesta_resultados a
        JOIN respuestas b ON b.id_respuestas=a.id_respuesta
        WHERE a.id_articulo=j.id_articulo AND a.id_usuario=h.id
        AND a.intentos=j.intentos
        AND b.valida=1
        )
        /
        (
        SELECT COUNT(*) AS correcta FROM respuesta_resultados a
        JOIN respuestas b ON b.id_respuestas=a.id_respuesta
        WHERE a.id_articulo=j.id_articulo AND a.id_usuario=h.id
        AND a.intentos=j.intentos
        ) * 100  
        ) AS porcentaje,
        j.intentos
        FROM respuesta_resultados j
        JOIN usuario h ON h.id=j.id_usuario 
        JOIN articulos_obligatorios s ON s.id=j.id_periodo
        JOIN articulo k ON k.id=s.id_articulo
        LEFT JOIN articulos_obligatorio_usuario l ON l.id_usuario=j.id_usuario
        WHERE j.id_usuario IN (SELECT DISTINCT(g.id_usuario) FROM respuesta_resultados g)
        AND ((DATE_FORMAT(j.fecha_respuesta,'%Y/%m/%d') BETWEEN ? AND ?) OR l.fecha_vista IS NULL)
        AND k.categoria_id=?
        GROUP BY j.id_articulo,j.intentos,h.user_name
        LIMIT ? OFFSET ?`, [ini, fin, idcategoria, limite, pag]);
        const Excel = require('exceljs');
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('My Sheet');
        worksheet.columns = [
            { header: 'ID', key: 'ido' },
            { header: 'Título', key: 'titulo' },
            { header: 'Fecha Inicial', key: 'fecha_inicial' },
            { header: 'Fecha Final', key: 'fecha_final' },
            { header: 'Validado', key: 'id' },
            { header: 'Usuario', key: 'user_name' },
            { header: 'Fecha Respuesta', key: 'fecha_respuesta' },
            { header: 'Porcentaje', key: 'porcentaje' },
            { header: 'Intentos', key: 'intentos' }
        ];
        worksheet.addRows(result);
        return await workbook.xlsx.writeBuffer();
    }
    async habilitarobligatorio(idarticulo) {
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT * FROM articulos_obligatorios WHERE id_articulo=?', [idarticulo]);
        if (data == undefined) {
            return;
        }
        await this.db.nikcleanPoolConection.query(`insert into articulos_obligatorios_backup 
        (id, id_articulo, fecha_inicial, fecha_final, estado, fecha_creacion, titulo, validacion_obligatoria  ) 
        values (?,?,?,?,?,?,?,?)`, [data.id, data.id_articulo, data.fecha_inicial, data.fecha_final, data.estado, data.fecha_creacion, data.titulo, data.validacion_obligatoria]);
        await this.db.nikcleanPoolConection.query('DELETE FROM articulos_obligatorios WHERE id_articulo=?', [idarticulo]);
        await this.db.nikcleanPoolConection.query('DELETE FROM cuestionario_valido WHERE id_articulo=?', [idarticulo]);
    }
    async cambiararticulo(articulo_id, base, categoria) {
        const es = await conexion_1.client();
        this.db.nikcleanPoolConection.query(`
        UPDATE articulo SET categoria_id = ?, base_id = ?  WHERE id=?
        `, [categoria, base, articulo_id]).then((data) => {
            if (data[0].affectedRows == 1) {
                es.update({
                    index: 'articulo',
                    id: articulo_id,
                    body: {
                        doc: {
                            base: base,
                            category: categoria
                        }
                    }
                });
            }
        });
    }
    async validarcaptcha() {
        let validarCaptcha = await this.db.NIK("SELECT estado FROM captcha_estado");
        return validarCaptcha;
    }
    async validarbusqueda() {
        let validarbusqueda = await this.db.NIK("SELECT estado FROM buscador_estado");
        return validarbusqueda;
    }
    async accioncaptcha(captcha) {
        if (captcha == 0) {
            await this.db.nikcleanPoolConection.query('UPDATE captcha_estado SET estado=1 WHERE id=1');
        }
        if (captcha == 1) {
            await this.db.nikcleanPoolConection.query('UPDATE captcha_estado SET estado=0 WHERE id=1');
        }
    }
    async accionbusqueda(busqueda) {
        if (busqueda == 0) {
            await this.db.nikcleanPoolConection.query('UPDATE buscador_estado SET estado=1 WHERE id=1');
        }
        if (busqueda == 1) {
            await this.db.nikcleanPoolConection.query('UPDATE buscador_estado SET estado=0 WHERE id=1');
        }
    }
    guardarpcrcautomatizado(origen, destino) {
        this.db.nikcleanPoolConection.query(`INSERT INTO permisos_multiples (pcrc_origen,pcrc_destino) VALUES (?,?)`, [origen, destino]);
    }
    eliminarpcrcautomatizado(id) {
        this.db.nikcleanPoolConection.query(`DELETE FROM permisos_multiples WHERE id=?`, [id]);
    }
};
ArticlesModelService = __decorate([
    common_1.Injectable(),
    __param(3, common_1.Inject(common_1.forwardRef(() => s3_bucket_service_1.S3BucketService))),
    __metadata("design:paramtypes", [db_service_1.DbService,
        articuloIndex_1.ArticuloIndex,
        categories_model_service_1.CategoriesModelService,
        s3_bucket_service_1.S3BucketService])
], ArticlesModelService);
exports.ArticlesModelService = ArticlesModelService;
//# sourceMappingURL=articles-model.service.js.map