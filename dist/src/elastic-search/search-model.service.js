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
exports.SearchModelService = exports.newSearchDTO = void 0;
const common_1 = require("@nestjs/common");
const searchIndex_1 = require("./searchIndex");
const class_validator_1 = require("class-validator");
const articuloIndex_1 = require("../articulos/articuloIndex");
const db_service_1 = require("../databases/db.service");
const conexion_1 = require("../elastic-search/conexion");
class newSearchDTO {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'debes proporcionar una query' }),
    __metadata("design:type", Object)
], newSearchDTO.prototype, "query", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'debes proporcionar una sublinea' }),
    __metadata("design:type", Object)
], newSearchDTO.prototype, "subline", void 0);
exports.newSearchDTO = newSearchDTO;
let SearchModelService = class SearchModelService {
    constructor(searchsIndex, articleIndex, db) {
        this.searchsIndex = searchsIndex;
        this.articleIndex = articleIndex;
        this.db = db;
    }
    async newSearch(query, subline, userId) {
        if (query == undefined)
            return;
        const es = await conexion_1.client();
        await Promise.all([
            es.index({
                index: 'searchs',
                body: {
                    publicationDate: (new Date()).getTime(),
                    query: query,
                    didyoumean: query,
                    subline: subline,
                    user: userId
                }
            }),
            this.db.NIK('CALL nueva_busqueda(?, ?, ?)', [query, subline, userId])
        ]);
    }
    async getSuggestions(input, subline) {
        return;
    }
    async getDidYouMean(input) {
        try {
            let query = {
                suggest: {
                    sugerencias: {
                        text: input,
                        term: {
                            analyzer: "spanish",
                            field: "content",
                            sort: 'score',
                            suggest_mode: 'missing',
                            max_edits: 2,
                            prefix_length: 3
                        }
                    }
                }
            };
            let result = await this.articleIndex.didYouMean(query);
            let replaceMents = result.body.suggest.sugerencias.map(suj => {
                if (suj.options.length) {
                    return { offset: suj.offset, length: suj.length, value: suj.options[0].text };
                }
                return null;
            }).filter(data => data);
            for (var i = replaceMents.length - 1; i >= 0; i--) {
                input = input.slice(0, replaceMents[i].offset) + replaceMents[i].value + input.slice(replaceMents[i].offset + replaceMents[i].length);
            }
            return input;
        }
        catch (error) {
            console.log(error);
        }
    }
    async getAll() {
        return await this.searchsIndex.all();
    }
    async getBySubline(subline) {
        return await this.searchsIndex.where({ subline: subline });
    }
};
SearchModelService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [searchIndex_1.SearchsIndex,
        articuloIndex_1.ArticuloIndex,
        db_service_1.DbService])
], SearchModelService);
exports.SearchModelService = SearchModelService;
//# sourceMappingURL=search-model.service.js.map