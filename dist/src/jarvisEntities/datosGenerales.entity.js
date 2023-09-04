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
exports.datosPersonales = void 0;
const typeorm_1 = require("typeorm");
let datosPersonales = class datosPersonales {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_datos_generales", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_solicitudes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], datosPersonales.prototype, "documento", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], datosPersonales.prototype, "nombre_completo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], datosPersonales.prototype, "primer_nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], datosPersonales.prototype, "segundo_nombre", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], datosPersonales.prototype, "primer_apellido", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], datosPersonales.prototype, "segundo_apellido", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_departamento_origen", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_ciudad_origen", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_nacionalidad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_pais", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_idioma_nativo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_genero", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_gh_eps", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_arl", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_fondo_pensiones", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_fondo_cesantias", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_caja_compensacion", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", String)
], datosPersonales.prototype, "fecha_nacimiento", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_sede", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_disponibilidad_lv", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_disponibilidad_s", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_disponibilidad_df", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_sub_personal", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_ceco_nomina", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_ceco_nomina2", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_tipo_vinculacion", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", String)
], datosPersonales.prototype, "fecha_alta_distribucion", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", String)
], datosPersonales.prototype, "fecha_alta", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", String)
], datosPersonales.prototype, "fecha_ingreso", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], datosPersonales.prototype, "id_dp_tipo_documento", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum' }),
    __metadata("design:type", Number)
], datosPersonales.prototype, "aplica_teletrabajo", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum' }),
    __metadata("design:type", Number)
], datosPersonales.prototype, "estado_condicion_medica", void 0);
__decorate([
    typeorm_1.Column({ type: 'tinyint' }),
    __metadata("design:type", Number)
], datosPersonales.prototype, "contratacion", void 0);
__decorate([
    typeorm_1.Column({ type: 'tinyint' }),
    __metadata("design:type", Number)
], datosPersonales.prototype, "compensacion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], datosPersonales.prototype, "documento_profesional", void 0);
datosPersonales = __decorate([
    typeorm_1.Entity('dp_datos_generales')
], datosPersonales);
exports.datosPersonales = datosPersonales;
//# sourceMappingURL=datosGenerales.entity.js.map