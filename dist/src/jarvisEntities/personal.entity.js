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
exports.Personal = void 0;
const typeorm_1 = require("typeorm");
const datosGenerales_entity_1 = require("./datosGenerales.entity");
let Personal = class Personal {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Personal.prototype, "id_dp_distribucion_personal", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Personal.prototype, "documento", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Personal.prototype, "codigo_sap", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", String)
], Personal.prototype, "fecha_actual", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Personal.prototype, "cod_pcrc", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Personal.prototype, "id_dp_centros_costos", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Personal.prototype, "id_dp_centros_costos_adm", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Personal.prototype, "documento_jefe", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Personal.prototype, "documento_responsable", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Personal.prototype, "tipo_distribucion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Personal.prototype, "unidad_organizativa", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime" }),
    __metadata("design:type", String)
], Personal.prototype, "fecha_conex_ultimo_pcrc", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Personal.prototype, "id_dp_cargos", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Personal.prototype, "id_dp_estados", void 0);
__decorate([
    typeorm_1.OneToOne(type => datosGenerales_entity_1.datosPersonales),
    typeorm_1.JoinColumn({ referencedColumnName: 'id_dp_datos_generales', name: 'id_dp_datos_generales' }),
    __metadata("design:type", Number)
], Personal.prototype, "id_dp_datos_generales", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Personal.prototype, "documento_modificacion", void 0);
__decorate([
    typeorm_1.Column({ type: "datetime" }),
    __metadata("design:type", String)
], Personal.prototype, "fecha_modificacion", void 0);
Personal = __decorate([
    typeorm_1.Entity('dp_distribucion_personal')
], Personal);
exports.Personal = Personal;
//# sourceMappingURL=personal.entity.js.map