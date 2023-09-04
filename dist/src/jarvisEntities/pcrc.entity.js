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
exports.Pcrc = void 0;
const typeorm_1 = require("typeorm");
const clientes_entity_1 = require("./clientes.entity");
const centrosCostos_entity_1 = require("./centrosCostos.entity");
let Pcrc = class Pcrc {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Pcrc.prototype, "id_dp_pcrc", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Pcrc.prototype, "pcrc", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Pcrc.prototype, "ciudad", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Pcrc.prototype, "estado", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Pcrc.prototype, "cod_pcrc", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Pcrc.prototype, "id_pcrc", void 0);
__decorate([
    typeorm_1.ManyToOne(type => centrosCostos_entity_1.CentrosCostos, centro => centro.pcrcs),
    typeorm_1.JoinColumn({ name: 'id_dp_centros_costos' }),
    __metadata("design:type", Number)
], Pcrc.prototype, "id_dp_centros_costos", void 0);
__decorate([
    typeorm_1.ManyToOne(type => clientes_entity_1.Clientes, cliente => cliente.pcrcs),
    typeorm_1.JoinColumn({ name: 'id_dp_clientes' }),
    __metadata("design:type", Number)
], Pcrc.prototype, "id_dp_clientes", void 0);
Pcrc = __decorate([
    typeorm_1.Entity('dp_pcrc')
], Pcrc);
exports.Pcrc = Pcrc;
//# sourceMappingURL=pcrc.entity.js.map