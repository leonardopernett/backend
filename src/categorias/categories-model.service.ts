import { Injectable } from '@nestjs/common';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Length, ValidateIf } from 'class-validator';
import { DbService } from "../databases/db.service"
import { categoryRaw } from "./entities";

export class getCategoryParams {
    @Length(20, 20, { message: "debes proporcionar un id valido" })
    idCategory: string;
}

export class newCategoryDTO {

    @IsNotEmpty({ message: "Debes proporcionar un nombre para la categoria" })
    @IsString()
    public name: string;

    @IsNotEmpty()
    public position: string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    public icon: string;

    @ValidateIf(o => !!!o.group)
    @IsNotEmpty()
    @IsString()
    public pcrc: string
    
    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    public group: string;
}

export class udpateCategoryDTO {
    @IsNotEmpty({ message: "Debes proporcionar un nombre para la categoria" })
    public name: string;

    @IsPositive({ message: "Debes proporcionar un numero positivo" })
    @IsInt({ message: "Debes proporcionar un numero entero" })
    public position: number;

    @IsOptional()
    @IsString({ message: "Debes proporcionar un nombre valido para el icono" })
    @Length(3, 150, { message: "debes proporcionar un icono valido" })
    public icon: string;
}

@Injectable()
export class CategoriesModelService {
    constructor(
        private db:DbService
        // private categoriesIndex: CategoriesIndex,
        // private articleIndex: ArticleIndex,
        // @Inject(forwardRef(() => ArticlesModelService))
        // private articlesModel: ArticlesModelService
    ) { }

    // private sortBy = (obj, key) => {
    //     return obj.sort(function(a, b) {
    //         var textA = a[key];
    //         var textB = b[key];
    //         return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    //     })
    // }

    // public async isLeaftCategory(categoryId: string): Promise<boolean> {
    //     try {
    //         let result = await this.categoriesIndex.where({ group: categoryId })

    //         if (result.length) {
    //             return false
    //         } else {
    //             return true
    //         }

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // public async getCategory(categoryId: string): Promise<category & { id: string; }> {
    //     return await this.categoriesIndex.getById(categoryId)
    // }

    public async createCategory(newCategory: newCategoryDTO) {
        let result = await this.db.NIK<categoryRaw>(`CALL crear_categoria(?,?,?,?,?)`,[newCategory.name, newCategory.position, newCategory.icon, newCategory.pcrc, newCategory.group])
        return result[0]
    }

    async breadcrumbcategoria(idarticle){

        let result= await this.db.NIK(`
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
        `,idarticle)

        return result

    }

    public async getCategories(baseId: string) {
        return await this.db.NIK<categoryRaw>(`CALL get_base_categorias(?)`,[baseId])
    }

    public async getSingleCategory(categoryId: string) {
        let result = await this.db.NIK<categoryRaw>(`CALL get_category_by_id(?)`,[categoryId])
        return result[0]
    }

    // private async getCategoriesByGroup(categoryId): Promise<(category & { id: string; })[]> {
    //     return await this.categoriesIndex.where({ group: categoryId })
    // }

    // private async getTree(groupId): Promise<string[]> {

    //     let isLeaftCategory = await this.isLeaftCategory(groupId)

    //     if (isLeaftCategory) {
    //         return [groupId]
    //     } else {
    //         let nodes = await this.getCategoriesByGroup(groupId)
    //         let result = [groupId]
    //         for (var i = 0; i < nodes.length; i++) {
    //             let newNodes = await this.getTree(nodes[i].id)
    //             result = result.concat(newNodes)
    //         }
    //         return result
    //     }
    // }

    public deleteCategory = async (categoryId,cedula): Promise<any> => {

        let tiempoTranscurrido = Date.now();
        let hoy = new Date(tiempoTranscurrido);

        let [[data]]:any=await this.db.nikcleanPoolConection.query('SELECT * FROM categoria WHERE id=?',[categoryId])
                         await this.db.nikcleanPoolConection.query('INSERT INTO borrar_categoria_log (id_categoria,nombre_categoria,base_id,fecha_eliminado,documento) VALUES (?,?,?,?,?)',[categoryId,data.name,data.base_id,hoy.toISOString(),cedula])
                         return await this.db.NIK(`CALL borrar_categoria(?)`,[categoryId])
    }

    public updateCategory = async (id, newCategory: udpateCategoryDTO): Promise<any> => {
        return await this.db.NIK(`CALL actualizar_categoria(?, ?, ?, ?)`,[newCategory.icon, newCategory.name, newCategory.position, id])
    }

    // public getAllCategories = async () => {
    //     return await this.categoriesIndex.all()
    // }
}