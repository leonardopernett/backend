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
exports.CentrosCostos = void 0;
const typeorm_1 = require("typeorm");
const clientes_entity_1 = require("./clientes.entity");
const pcrc_entity_1 = require("./pcrc.entity");
let CentrosCostos = class CentrosCostos {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CentrosCostos.prototype, "id_dp_centros_costos", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "centros_costos", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "nomina", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "director_programa", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "documento_director", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "gerente_cuenta", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "documento_gerente", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "tipo_cliente", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "ciudad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "codigo_contrato", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CentrosCostos.prototype, "afecta_mc", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], CentrosCostos.prototype, "estado", void 0);
__decorate([
    typeorm_1.ManyToOne(type => clientes_entity_1.Clientes, cliente => cliente.centros),
    typeorm_1.JoinColumn({ name: 'id_dp_clientes' }),
    __metadata("design:type", String)
], CentrosCostos.prototype, "id_dp_clientes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "id_dp_servicio", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CentrosCostos.prototype, "id_dp_programa", void 0);
__decorate([
    typeorm_1.OneToMany(type => pcrc_entity_1.Pcrc, pcrc => pcrc.id_dp_centros_costos),
    typeorm_1.JoinColumn({ referencedColumnName: 'id_dp_centros_costos' }),
    __metadata("design:type", Array)
], CentrosCostos.prototype, "pcrcs", void 0);
CentrosCostos = __decorate([
    typeorm_1.Entity('dp_centros_costos')
], CentrosCostos);
exports.CentrosCostos = CentrosCostos;
//# sourceMappingURL=centrosCostos.entity.js.map