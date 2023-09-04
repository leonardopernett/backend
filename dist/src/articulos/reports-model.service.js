"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsModelService = void 0;
const common_1 = require("@nestjs/common");
var FiltersToFieldEnum;
(function (FiltersToFieldEnum) {
    FiltersToFieldEnum["categoria"] = "category";
    FiltersToFieldEnum["pcrc"] = "pcrc";
    FiltersToFieldEnum["cliente"] = "cliente";
    FiltersToFieldEnum["articulo"] = "articleId";
    FiltersToFieldEnum["director"] = "director";
    FiltersToFieldEnum["coordinador"] = "coordinador";
    FiltersToFieldEnum["gerente"] = "gerente";
    FiltersToFieldEnum["lider"] = "lider";
})(FiltersToFieldEnum || (FiltersToFieldEnum = {}));
;
let ReportsModelService = class ReportsModelService {
};
ReportsModelService = __decorate([
    common_1.Injectable()
], ReportsModelService);
exports.ReportsModelService = ReportsModelService;
//# sourceMappingURL=reports-model.service.js.map