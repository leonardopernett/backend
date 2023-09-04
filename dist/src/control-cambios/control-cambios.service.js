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
exports.ControlCambiosModelService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../databases/db.service");
const { convertDeltaToHtml } = require('node-quill-converter');
const quill_delta_to_html_1 = require("quill-delta-to-html");
let ControlCambiosModelService = class ControlCambiosModelService {
    constructor(db) {
        this.db = db;
    }
    async mostrarcontroldecambio(idarticulo) {
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT a.id,a.date ,a.title,b.user_name FROM cambio_articulo a 
          JOIN usuario b ON a.usuario_id=b.documento
          WHERE a.articulo_id=?
          GROUP BY a.date `, [idarticulo]);
        return data;
    }
    async cambioselect(idarticulo) {
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT a.id,a.date as date_old,a.title AS title_old,b.user_name AS username FROM cambio_articulo a 
          JOIN usuario b ON a.usuario_id=b.documento
          JOIN articulo c ON c.id=a.articulo_id
          WHERE a.articulo_id=?
          GROUP BY a.date`, [idarticulo]);
        return data;
    }
    async mostrarcambio(idcambio) {
        let [data] = await this.db.nikcleanPoolConection.query(`SELECT a.date as date_old,a.title AS title_old,a.contenido AS content_old,b.user_name,c.title AS title_new,c.obj as content_new,c.modification_date AS date_new FROM cambio_articulo a 
JOIN usuario b ON a.usuario_id=b.documento
JOIN articulo c ON c.id=a.articulo_id
WHERE a.id=?`, [idcambio]);
        let datos = data.map(item => {
            return {
                date_old: item.date_old,
                title_old: item.title_old,
                content_old: this.convertirDelta(data[0].content_old),
                user_name: item.user_name,
                title_new: item.title_new,
                content_new: this.convertirDelta(data[0].content_new),
                date_new: item.date_new
            };
        });
        return datos;
    }
    convertirDelta(delta) {
        let json = JSON.parse(delta);
        let array = json.ops;
        var cfg = {};
        var converter = new quill_delta_to_html_1.QuillDeltaToHtmlConverter(array, cfg);
        var html = converter.convert();
        return html;
    }
};
ControlCambiosModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], ControlCambiosModelService);
exports.ControlCambiosModelService = ControlCambiosModelService;
//# sourceMappingURL=control-cambios.service.js.map