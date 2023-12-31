import { DbService } from "../databases/db.service";
import { UserIndex } from "../elastic-search/indices/user-index";
import { CategoriesIndex } from "../elastic-search/indices/categoria-index";
import { ArticleIndex } from "../elastic-search/indices/article-index";
import { ArticuloIndex } from "../articulos/articuloIndex";
import { ArticlesViewsIndex } from "../elastic-search/indices/articleViews-index";
import { CommentsIndex } from "../elastic-search/indices/comments-index";
import { FavoriteUserIndex } from "../elastic-search/indices/userFavorites-index";
import { LikeUserIndex } from "../elastic-search/indices/likesUser-index";
export declare class MigracionModelService {
    private db;
    private userIndex;
    private CategoriesIndex;
    private ArticleIndex;
    private articuloIndex;
    private ArticlesViewsIndex;
    private CommentsIndex;
    private FavoriteUserIndex;
    private LikeUserIndex;
    constructor(db: DbService, userIndex: UserIndex, CategoriesIndex: CategoriesIndex, ArticleIndex: ArticleIndex, articuloIndex: ArticuloIndex, ArticlesViewsIndex: ArticlesViewsIndex, CommentsIndex: CommentsIndex, FavoriteUserIndex: FavoriteUserIndex, LikeUserIndex: LikeUserIndex);
    migrateUsers: (from: number, size: number) => Promise<unknown[]>;
    migrateUserBases: (from: number, size: number) => Promise<void>;
    migrarCategorias: (from: number, size: number) => Promise<unknown[]>;
    migrarArticulos: (from: number, size: number) => Promise<unknown[]>;
    migrarVistasArticulo: (from: number, size: number) => Promise<unknown[]>;
    migrarComentario: (from: number, size: number) => Promise<void>;
    migrarFavoritos: (from: number, size: number) => Promise<void>;
    migrarMeGusta: (from: number, size: number) => Promise<void>;
    agregarArticulosEs: (from: number, size: number) => Promise<unknown[]>;
    arreglarCategorias: (from: number, size: number) => Promise<unknown[]>;
    arreglarUsuarios: (from: number, size: number) => Promise<unknown[]>;
    buscararticulos: (from: number, size: number) => Promise<unknown[]>;
}
