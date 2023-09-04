import { DbService } from "../databases/db.service";
import { categoryRaw } from "./entities";
export declare class getCategoryParams {
    idCategory: string;
}
export declare class newCategoryDTO {
    name: string;
    position: string;
    icon: string;
    pcrc: string;
    group: string;
}
export declare class udpateCategoryDTO {
    name: string;
    position: number;
    icon: string;
}
export declare class CategoriesModelService {
    private db;
    constructor(db: DbService);
    createCategory(newCategory: newCategoryDTO): Promise<categoryRaw>;
    breadcrumbcategoria(idarticle: any): Promise<unknown[]>;
    getCategories(baseId: string): Promise<categoryRaw[]>;
    getSingleCategory(categoryId: string): Promise<categoryRaw>;
    deleteCategory: (categoryId: any, cedula: any) => Promise<any>;
    updateCategory: (id: any, newCategory: udpateCategoryDTO) => Promise<any>;
}
