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
exports.CommentsModelService = exports.commentDTO = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const db_service_1 = require("../databases/db.service");
const async_1 = require("async");
class commentDTO {
}
__decorate([
    class_validator_1.Length(2, 2000),
    __metadata("design:type", String)
], commentDTO.prototype, "text", void 0);
exports.commentDTO = commentDTO;
let CommentsModelService = class CommentsModelService {
    constructor(db) {
        this.db = db;
        this.getComments = async (articleId) => {
            let comentarios = await this.db.NIK('CALL get_comment_replie(?)', [articleId]);
            return comentarios;
        };
        this.postComment = async (replyTo, text, articleId, userId) => {
            let [nuevo_comentario] = await this.db.NIK('CALL agregar_comentario(?, ?, ?, ?)', [articleId, userId, replyTo, text]);
            let [{ nombre_completo }] = await this.db.NIK(`
        select user_name as nombre_completo
        from usuario a
        where a.documento = ?;
            `, [nuevo_comentario.user_id]);
            return {
                ...nuevo_comentario,
                username: nombre_completo,
            };
        };
        this.getRepliesTo = async (replyTo, from = '0', size = '10') => {
            let respuestas = await this.db.NIK('CALL get_comment_replies(?,?,?)', [replyTo, from, size]);
            let respuestasCompletas = await async_1.map(respuestas, async (respuesta) => {
                let [{ nombre_completo }] = await this.db.NIK(`
            select user_name as nombre_completo
            from usuario a
            where a.documento = ?;
            `, [respuesta.user_id]);
                return {
                    ...respuesta,
                    username: nombre_completo,
                    replies: []
                };
            });
            return respuestasCompletas;
        };
    }
    async deleteReplies(id) {
        let result = await this.db.NIK(`call borrar_replaycomentario(?)`, [id]);
        return result;
    }
    async deleteComment(id, cedula) {
        let tiempoTranscurrido = Date.now();
        let hoy = new Date(tiempoTranscurrido);
        let [[data]] = await this.db.nikcleanPoolConection.query('SELECT * FROM comentario WHERE id=?', [id]);
        await this.db.nikcleanPoolConection.query('INSERT INTO borrar_comentario_log (id_comentario,comentario,documento,articulo_id,fecha_eliminacion) VALUES (?,?,?,?,?)', [id, data.text, cedula, data.articulo_id, hoy.toISOString()]);
        let result = await this.db.NIK(`call borrar_comentario(?)`, [id]);
        return result;
    }
    async deleteComments(id) {
        let result = await this.db.NIK(`call borrar_comentarios(?)`, [id]);
        return result;
    }
};
CommentsModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], CommentsModelService);
exports.CommentsModelService = CommentsModelService;
//# sourceMappingURL=comments-model.service.js.map