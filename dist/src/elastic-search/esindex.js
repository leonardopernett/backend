"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Esindex = void 0;
const elasticsearch_1 = require("@elastic/elasticsearch");
const common_1 = require("@nestjs/common");
const R = require("remeda");
class Esindex {
    constructor(index, enlace, accesKey_id, accesKey) {
        this.index = index;
        this.createBody = R.objOf('body');
        this.createRequest = x => R.addProp(R.objOf('body')(x), 'index', this.index);
        this.create = async (doc, id) => {
            let result;
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
                let errorCode = '01';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.getById = async (id) => {
            try {
                let result = await this.esClient.get({
                    id: id,
                    index: this.index,
                    type: '_doc'
                });
                return R.addProp(result.body._source, 'id', result.body._id);
            }
            catch (error) {
                console.log(error);
                let errorCode = '02';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
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
                return R.map((x) => R.addProp(x._source, 'id', x._id))(result.body.hits.hits);
            }
            catch (error) {
                console.log(error.body.error);
                let errorCode = '03';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.where = async (ops, from, size, order) => {
            try {
                if (!!!ops) {
                    return null;
                }
                let result;
                if (!!from && !!size && !!order) {
                    result = await this.esClient.search({
                        index: this.index,
                        body: {
                            query: {
                                bool: {
                                    filter: R.pipe(R.toPairs(ops), R.map(pair => R.objOf(pair[1], pair[0])), R.map(obj => R.objOf(obj, 'term')))
                                }
                            },
                            from: parseInt(from),
                            size: parseInt(size),
                            sort: [
                                R.objOf(order.orderby.toString())({ order: order.order })
                            ]
                        }
                    });
                }
                else if (!!from && !!size && !!!order) {
                    result = await this.esClient.search({
                        index: this.index,
                        body: {
                            query: {
                                bool: {
                                    filter: R.pipe(R.toPairs(ops), R.map(pair => R.objOf(pair[1], pair[0])), R.map(obj => R.objOf(obj, 'term')))
                                }
                            },
                            from: parseInt(from),
                            size: parseInt(size)
                        }
                    });
                }
                else {
                    result = await this.esClient.search({
                        index: this.index,
                        body: {
                            query: {
                                bool: {
                                    filter: R.pipe(R.toPairs(ops), R.map(pair => R.objOf(pair[1], pair[0])), R.map(obj => R.objOf(obj, 'term')))
                                }
                            },
                            from: 0,
                            size: 10000
                        }
                    });
                }
                return R.map(result.body.hits.hits, (x) => R.addProp(x._source, 'id', x._id));
            }
            catch (error) {
                console.log(error);
                console.log(error.meta.body.error);
                let errorCode = '04';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.deleteWhere = async (ops) => {
            try {
                if (!!!ops) {
                    return null;
                }
                let queryObj = this.createRequest({
                    query: {
                        bool: {
                            filter: R.pipe(R.toPairs(ops), R.map(pair => R.objOf(pair[1], pair[0])), R.map(obj => R.objOf(obj, 'term')))
                        }
                    }
                });
                let result = await this.esClient.deleteByQuery(queryObj);
                return { deleted: result.body.deleted };
            }
            catch (error) {
                let errorCode = '05';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.deleteByQuery = async (query) => {
            try {
                let queryObj = this.createRequest(query);
                let result = await this.esClient.deleteByQuery(queryObj);
                return { deleted: result.body.deleted };
            }
            catch (error) {
                let errorCode = '06';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.delete = async (id) => {
            try {
                await this.esClient.delete({
                    id: id,
                    index: this.index
                });
                return { status: "deleted" };
            }
            catch (error) {
                let errorCode = '07';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.all = async () => {
            try {
                return this.query({
                    query: {
                        "match_all": {}
                    },
                    from: 0,
                    size: 10000
                });
            }
            catch (error) {
                let errorCode = '08';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.updateScript = async (id, script) => {
            try {
                let queryObj = R.addProp(this.createRequest({ script: script }), 'id', id);
                return await this.esClient.update(queryObj);
            }
            catch (error) {
                console.log(error);
                console.log(error.meta.body.error);
                let errorCode = '09';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.updatePartialDocument = async (id, partial) => {
            try {
                let result = await this.esClient.update({
                    id: id,
                    index: this.index,
                    refresh: 'true',
                    body: { doc: partial }
                });
                return { status: result.body.result };
            }
            catch (error) {
                console.log(error.meta.body.error);
                let errorCode = '10';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.aggsWhere = async (ops, aggs) => {
            try {
                if (!!!ops) {
                    return null;
                }
                let result;
                result = await this.esClient.search({
                    index: this.index,
                    body: {
                        query: {
                            bool: {
                                filter: R.pipe(R.toPairs(ops), R.map(pair => R.objOf(pair[1], pair[0])), R.map(obj => R.objOf(obj, 'term')))
                            }
                        },
                        aggs: { "operation": R.objOf(R.objOf(aggs.field, 'field'), aggs.op) }
                    }
                });
                return result.body.aggregations.operation.value;
            }
            catch (error) {
                let errorCode = '11';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.count = async (query) => {
            try {
                let queryObj = this.createRequest(query);
                let result = await this.esClient.count(queryObj);
                return result.body.count;
            }
            catch (error) {
                let errorCode = '13';
                if (error instanceof elasticsearch_1.errors.ResponseError) {
                    errorCode += '01';
                    if (error.stack.includes('index_not_found_exception')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "index_not_found_exception"
                        }, 500);
                    }
                    else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                        return null;
                    }
                    else if (error.meta.statusCode == 405) {
                        errorCode += '03';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "bad_request_exception"
                        }, 400);
                    }
                    else if (error.stack.includes('parsing_exception')) {
                        errorCode += '04';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "parsing_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '05';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "response_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.ConfigurationError) {
                    errorCode += '02';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "configuration_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ConnectionError) {
                    errorCode += '03';
                    if (error.stack.includes('ENOTFOUND')) {
                        errorCode += '01';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "esClient_node_not_found_exception"
                        }, 500);
                    }
                    else {
                        errorCode += '02';
                        throw new common_1.HttpException({
                            "error": `error code: ${errorCode}`,
                            "message": "connection_error"
                        }, 500);
                    }
                }
                else if (error instanceof elasticsearch_1.errors.DeserializationError) {
                    errorCode += '04';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "deserialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.ElasticsearchClientError) {
                    errorCode += '05';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "elasticsearch_client_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.NoLivingConnectionsError) {
                    errorCode += '06';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "no_living_connections_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.SerializationError) {
                    errorCode += '07';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "serialization_error"
                    }, 500);
                }
                else if (error instanceof elasticsearch_1.errors.TimeoutError) {
                    errorCode += '08';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "request_timeout"
                    }, 500);
                }
                else {
                    errorCode += '09';
                    throw new common_1.HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "internal_server_error"
                    }, 500);
                }
            }
        };
        this.createIndex = async (body) => {
            return await this.esClient.indices.create({
                index: this.index,
                include_type_name: false,
                body: body
            });
        };
        this.deleteIndex = async () => {
            return await this.esClient.indices.delete({ index: this.index });
        };
        if (typeof accesKey == 'undefined' && typeof accesKey_id == 'undefined') {
            this.esClient = new elasticsearch_1.Client({
                node: enlace,
                requestTimeout: 10000,
                ssl: {
                    rejectUnauthorized: false
                }
            });
        }
        else {
            this.esClient = new elasticsearch_1.Client({
                node: enlace,
                requestTimeout: 10000,
                ssl: {
                    rejectUnauthorized: false
                },
                auth: {
                    apiKey: {
                        id: accesKey_id,
                        api_key: accesKey
                    }
                }
            });
        }
    }
}
exports.Esindex = Esindex;
//# sourceMappingURL=esindex.js.map