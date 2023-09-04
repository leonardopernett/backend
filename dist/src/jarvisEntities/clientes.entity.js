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
exports.Clientes = void 0;
const typeorm_1 = require("typeorm");
const pcrc_entity_1 = require("./pcrc.entity");
const centrosCostos_entity_1 = require("./centrosCostos.entity");
let Clientes = class Clientes {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Clientes.prototype, "id_dp_clientes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Clientes.prototype, "cliente", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Clientes.prototype, "tipo_industria", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Clientes.prototype, "estado", void 0);
__decorate([
    typeorm_1.OneToMany(type => pcrc_entity_1.Pcrc, pcrc => pcrc.id_dp_clientes),
    typeorm_1.JoinColumn({ referencedColumnName: 'id_dp_clientes' }),
    __metadata("design:type", Array)
], Clientes.prototype, "pcrcs", void 0);
__decorate([
    typeorm_1.OneToMany(type => centrosCostos_entity_1.CentrosCostos, centro => centro.id_dp_clientes),
    typeorm_1.JoinColumn({ referencedColumnName: 'id_dp_clientes' }),
    __metadata("design:type", Array)
], Clientes.prototype, "centros", void 0);
Clientes = __decorate([
    typeorm_1.Entity('dp_clientes')
], Clientes);
exports.Clientes = Clientes;
//# sourceMappingURL=clientes.entity.js.map