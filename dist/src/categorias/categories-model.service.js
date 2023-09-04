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
exports.CategoriesModelService = exports.udpateCategoryDTO = exports.newCategoryDTO = exports.getCategoryParams = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const db_service_1 = require("../databases/db.service");
class getCategoryParams {
}
__decorate([
    class_validator_1.Length(20, 20, { message: "debes proporcionar un id valido" }),
    __metadata("design:type", String)
], getCategoryParams.prototype, "idCategory", void 0);
exports.getCategoryParams = getCategoryParams;
class newCategoryDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "Debes proporcionar un nombre para la categoria" }),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], newCategoryDTO.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], newCategoryDTO.prototype, "position", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], newCategoryDTO.prototype, "icon", void 0);
__decorate([
    class_validator_1.ValidateIf(o => !!!o.group),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], newCategoryDTO.prototype, "pcrc", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], newCategoryDTO.prototype, "group", void 0);
exports.newCategoryDTO = newCategoryDTO;
class udpateCategoryDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: "Debes proporcionar un nombre para la categoria" }),
    __metadata("design:type", String)
], udpateCategoryDTO.prototype, "name", void 0);
__decorate([
    class_validator_1.IsPositive({ message: "Debes proporcionar un numero positivo" }),
    class_validator_1.IsInt({ message: "Debes proporcionar un numero entero" }),
    __metadata("design:type", Number)
], udpateCategoryDTO.prototype, "position", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString({ message: "Debes proporcionar un nombre valido para el icono" }),
    class_validator_1.Length(3, 150, { message: "debes proporcionar un icono valido" }),
    __metadata("design:type", String)
], udpateCategoryDTO.prototype, "icon", void 0);
exports.udpateCategoryDTO = udpateCategoryDTO;
let CategoriesModelService = class CategoriesModelService {
    constructor(db) {
        this.db = db;
        this.deleteCategory = async (categoryId, cedula) => {
            let tiempoTranscurrido = Date.now();
            let hoy = new Date(tiempoTranscurrido);
            let [[data]] = await this.db.nikcleanPoolConection.query('SELECT * FROM categoria WHERE id=?', [categoryId]);
            await this.db.nikcleanPoolConection.query('INSERT INTO borrar_categoria_log (id_categoria,nombre_categoria,base_id,fecha_eliminado,documento) VALUES (?,?,?,?,?)', [categoryId, data.name, data.base_id, hoy.toISOString(), cedula]);
            return await this.db.NIK(`CALL borrar_categoria(?)`, [categoryId]);
        };
        this.updateCategory = async (id, newCategory) => {
            return await this.db.NIK(`CALL actualizar_categoria(?, ?, ?, ?)`, [newCategory.icon, newCategory.name, newCategory.position, id]);
        };
    }
    async createCategory(newCategory) {
        let result = await this.db.NIK(`CALL crear_categoria(?,?,?,?,?)`, [newCategory.name, newCategory.position, newCategory.icon, newCategory.pcrc, newCategory.group]);
        return result[0];
    }
    async breadcrumbcategoria(idarticle) {
        let result = await this.db.NIK(`
        WITH RECURSIVE CTE AS (
            SELECT c.id, c.name, c.parent_id 
            FROM categoria c
            JOIN articulo a ON c.id = a.categoria_id
            WHERE a.id = ?
            UNION ALL
            SELECT c.id, c.name, c.parent_id 
            FROM categoria c
            INNER JOIN CTE ON c.id = CTE.parent_id
          )
          SELECT id, name FROM CTE;
        `, idarticle);
        return result;
    }
    async getCategories(baseId) {
        return await this.db.NIK(`CALL get_base_categorias(?)`, [baseId]);
    }
    async getSingleCategory(categoryId) {
        let result = await this.db.NIK(`CALL get_category_by_id(?)`, [categoryId]);
        return result[0];
    }
};
CategoriesModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], CategoriesModelService);
exports.CategoriesModelService = CategoriesModelService;
//# sourceMappingURL=categories-model.service.js.map