import { Module } from '@nestjs/common';
import { EsClientController } from "./es-client.controller";
import { searchController } from "./search.controller";
import { EsClientService } from "./es-client.service";
import { SearchModelService } from "./search-model.service";
import { SearchsIndex } from "./searchIndex";
import { ArticulosModule } from "../articulos/articulos.module";
import { UserIndex } from "./indices/user-index";
import { CategoriesIndex } from "./indices/categoria-index";
import { ArticleIndex } from "./indices/article-index";
import { ArticlesEventsIndex } from "./indices/articlesEvents-index";
import { ArticlesViewsIndex } from "./indices/articleViews-index";
import { CommentsIndex } from "./indices/comments-index";
import { FavoriteUserIndex } from "./indices/userFavorites-index";
import { LikeUserIndex } from "./indices/likesUser-index";
@Module({
    controllers: [
        EsClientController,
        searchController
    ],
    providers: [
        SearchsIndex,
        EsClientService,
        SearchModelService,
        UserIndex,
        CategoriesIndex,
        ArticleIndex,
        ArticlesEventsIndex,
        ArticlesViewsIndex,
        CommentsIndex,
        FavoriteUserIndex,
        LikeUserIndex
    ],
    exports: [
        EsClientService,
        SearchModelService,
        CategoriesIndex,
        UserIndex,
        ArticleIndex,
        ArticlesEventsIndex,
        ArticlesViewsIndex,
        CommentsIndex,
        FavoriteUserIndex,
        LikeUserIndex
    ],
    imports: [
        ArticulosModule
    ]
})
export class ElasticSearchModule {

}
