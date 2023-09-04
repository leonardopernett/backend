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
exports.SearchsIndex = void 0;
const esindex_1 = require("./esindex");
const common_1 = require("@nestjs/common");
const elasticsearch_1 = require("@elastic/elasticsearch");
const common_2 = require("@nestjs/common");
const R = require("remeda");
let SearchsIndex = class SearchsIndex extends esindex_1.Esindex {
    constructor() {
        super('searchs', process.env.ES_PUNTO_ENLACE);
        this.create = async (doc, id) => {
            let result;
            doc.query = {
                input: doc.query
            };
            try {
                if (typeof id == 'undefined') {
                    result = await this.esClient.index({
                        index: this.index,
                        refresh: 'true',
                        body: doc
                    });
                }
                else {
                    result = await this.esClient.index({
                        id: id,
                        index: this.index,
                        refresh: 'true',
                        body: doc
                    });
                }
                return R.addProp(doc, 'id', result.body._id);
            }
            catch (error) {
                console.log(error);
                let errorCode = '14';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else {
                        errorCode += '04';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.query = async (query) => {
            try {
                let queryObj = this.createRequest(query);
                let result = await this.esClient.search(queryObj);
                return result;
            }
            catch (error) {
                console.log(error.meta.body.error);
                let errorCode = '15';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_2.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_2.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
    }
};
SearchsIndex = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], SearchsIndex);
exports.SearchsIndex = SearchsIndex;
//# sourceMappingURL=searchIndex.js.map