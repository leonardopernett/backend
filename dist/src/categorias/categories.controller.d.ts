import { ArticlesModelService } from '../articulos/articles-model.service';
import { CategoriesModelService, newCategoryDTO, udpateCategoryDTO } from './categories-model.service';
export declare class CategoriesController {
    private categoriesModel;
    private articlesModel;
    constructor(categoriesModel: CategoriesModelService, articlesModel: ArticlesModelService);
    getArticles(idCategory: string, query: string, from: string, size: string, state: string): Promise<any>;
    createCategory(Body: newCategoryDTO): Promise<any>;
    deleteCategory(body: any): Promise<any>;
    updateCategory(id: string, Body: udpateCategoryDTO): Promise<any>;
    getArticlesByQuery(idCategory: string, query: string, from: string, size: string, state: string): Promise<any>;
    getArticlesByQuery2(idCategory: string, query: string, from: string, size: string, state: string): Promise<any>;
    breadcrumbCategory(body: any): Promise<unknown[]>;
}
