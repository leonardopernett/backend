import { ApiResponse, Client, errors, RequestParams } from "@elastic/elasticsearch";
import { HttpException } from "@nestjs/common";
import * as R from 'remeda';

type aggsType = 'sum' | 'avg';

export class Esindex<T> {

    constructor(protected index: string, enlace:string, accesKey_id?:string,accesKey?:string) {

        if(typeof accesKey == 'undefined' && typeof accesKey_id == 'undefined'){
            this.esClient = new Client({
                node: enlace,
                requestTimeout: 10000,
                ssl: {
                    rejectUnauthorized: false
                }
            })
        } else {
            this.esClient = new Client({
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
            })
        }

    }

    protected readonly esClient: Client;

    private createBody = R.objOf('body')

    protected createRequest = x => R.addProp(R.objOf('body')(x), 'index', this.index)
    //01
    public create = async (doc: T, id?: string): Promise<T & { id: string; }> => {

        let result: ApiResponse
 
        try {

            if (typeof id == 'undefined') {
                result = await this.esClient.index({
                    index: this.index,
                    refresh: 'true',
                    body: doc
                })

            } else { 
                result = await this.esClient.index({
                    id: id,
                    index: this.index,
                    refresh: 'true',
                    body: doc
                })

            }

            return R.addProp(doc, 'id', result.body._id)

        } catch (error) {

            console.log(error)

            let errorCode = '01';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else {
                    errorCode += '04'

                   

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }
    }
    //02
    public getById = async (id: string): Promise<T & { id: string; }> => {

        try {

            let result = await this.esClient.get({
                id: id,
                index: this.index,
                type: '_doc'
            })

            return R.addProp(result.body._source, 'id', result.body._id);

        } catch (error) {

            console.log(error)

            let errorCode = '02';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else {
                    
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }
    }
    //03
    public query = async (query: object): Promise<(T & { id: string; })[]> => {

        try {
            let queryObj: RequestParams.Search = this.createRequest(query)

            let result = await this.esClient.search(queryObj)

            return R.map((x: any) => R.addProp(x._source, 'id', x._id))(result.body.hits.hits)

        } catch (error) {           

            console.log(error.body.error)

            let errorCode = '03';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {
                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }


    }
    //04
    public where = async (ops: { [P in keyof T]?: any; }, from?: string, size?: string, order?: { orderby: keyof T, order: 'asc' | 'desc' }): Promise<(T & { id: string; })[]> => {
        try {

            if (!!!ops) {
                return null
            }

            let result: ApiResponse<any, any>;

            if (!!from && !!size && !!order) {

                result = await this.esClient.search({
                    index: this.index,
                    body: {
                        query: {
                            bool: {
                                filter: R.pipe(
                                    R.toPairs(ops),
                                    R.map(pair => R.objOf(pair[1], pair[0])),
                                    R.map(obj => R.objOf(obj, 'term'))
                                )
                            }
                        },
                        from: parseInt(from),
                        size: parseInt(size),
                        sort: [
                            R.objOf(order.orderby.toString())({ order: order.order }) // R.objOf(key)(value) = {key : value}
                        ]
                    }
                })

            } else if (!!from && !!size && !!!order) {

                result = await this.esClient.search({
                    index: this.index,
                    body: {
                        query: {
                            bool: {
                                filter: R.pipe(
                                    R.toPairs(ops),
                                    R.map(pair => R.objOf(pair[1], pair[0])),
                                    R.map(obj => R.objOf(obj, 'term'))
                                )
                            }
                        },
                        from: parseInt(from),
                        size: parseInt(size)
                    }
                })

            } else {
                result = await this.esClient.search({
                    index: this.index,
                    body: {
                        query: {
                            bool: {
                                filter: R.pipe(
                                    R.toPairs(ops),
                                    R.map(pair => R.objOf(pair[1], pair[0])),
                                    R.map(obj => R.objOf(obj, 'term'))
                                )
                            }
                        },
                        from: 0,
                        size: 10000
                    }
                })
            }

            return R.map(result.body.hits.hits, (x: any) => R.addProp(x._source, 'id', x._id))

        } catch (error) {

            console.log(error)

            console.log(error.meta.body.error)

            let errorCode = '04';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {
                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }


    }
    //05
    public deleteWhere = async (ops: Partial<T>): Promise<{ deleted: number }> => {

        try {

            if (!!!ops) {
                return null
            }

            let queryObj: RequestParams.DeleteByQuery = this.createRequest({
                query: {
                    bool: {
                        filter: R.pipe(
                            R.toPairs(ops),
                            R.map(pair => R.objOf(pair[1], pair[0])),
                            R.map(obj => R.objOf(obj, 'term'))
                        )
                    }
                }
            })

            let result = await this.esClient.deleteByQuery(queryObj)

            return { deleted: result.body.deleted }

        } catch (error) {

            let errorCode = '05';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {
                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }


    }
    //06
    public deleteByQuery = async (query: object): Promise<{ deleted: number }> => {

        try {

            let queryObj: RequestParams.DeleteByQuery = this.createRequest(query)

            let result = await this.esClient.deleteByQuery(queryObj)

            return { deleted: result.body.deleted }

        } catch (error) {

            let errorCode = '06';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {
                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }
    }
    //07
    public delete = async (id: string): Promise<any> => {
        try {
            await this.esClient.delete({
                id: id,
                index: this.index
            })

            return { status: "deleted" }

        } catch (error) {



            let errorCode = '07';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {
                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }




    }
    //08
    public all = async (): Promise<(T & { id: string; })[]> => {
        try {
            return this.query({
                query: {
                    "match_all": {}
                },
                from: 0,
                size: 10000
            })

        } catch (error) {            

            let errorCode = '08';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {
                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }
    }
    //09
    public updateScript = async (id: string, script: object): Promise<any> => {

        try {
            let queryObj: RequestParams.Update = R.addProp(this.createRequest({ script: script }), 'id', id)
            return await this.esClient.update(queryObj)

        } catch (error) {

            console.log(error)

            console.log(error.meta.body.error)

            let errorCode = '09';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {
                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }
    }
    //10
    public updatePartialDocument = async (id: string, partial: Partial<T>): Promise<any> => {

        try {

            let result = await this.esClient.update({
                id: id,
                index: this.index,
                refresh: 'true',
                body: { doc: partial }
            })

            return { status: result.body.result }

        } catch (error) {

            console.log(error.meta.body.error)

            let errorCode = '10';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {


                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }

    }
    //11
    public aggsWhere = async (ops: { [P in keyof T]?: any; }, aggs: { op: aggsType, field: keyof T }): Promise<number> => {
        try {

            if (!!!ops) {
                return null
            }

            let result: ApiResponse<any, any>;

            result = await this.esClient.search({
                index: this.index,
                body: {
                    query: {
                        bool: {
                            filter: R.pipe(
                                R.toPairs(ops),
                                R.map(pair => R.objOf(pair[1], pair[0])),
                                R.map(obj => R.objOf(obj, 'term'))
                            )
                        }
                    },
                    aggs: { "operation": R.objOf(R.objOf(aggs.field, 'field'), aggs.op) }
                }
            })

            return result.body.aggregations.operation.value

        } catch (error) {
            let errorCode = '11';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {


                    errorCode += '05'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {

                   

                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }


    }    
    //13
    public count = async (query: object): Promise<number> => {

        try {

            let queryObj: RequestParams.Count = this.createRequest(query)

            let result = await this.esClient.count(queryObj)

            return result.body.count

        } catch (error) {

            let errorCode = '13';

            if (error instanceof errors.ResponseError) {/* 01 */

                errorCode += '01'

                if (error.stack.includes('index_not_found_exception')) {
                    errorCode += '01'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "index_not_found_exception"
                    }, 500)

                } else if (error.stack.includes('Response Error') && error.meta.statusCode == 404) {
                    return null

                } else if (error.meta.statusCode == 405) {
                    errorCode += '03'

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "bad_request_exception"
                    }, 400)

                } else if (error.stack.includes('parsing_exception')) {
                    errorCode += '04'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "parsing_exception"
                    }, 500)

                } else {
                    errorCode += '05'                    

                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "response_error"
                    }, 500)

                }

            } else if (error instanceof errors.ConfigurationError) {/* 02 */
                errorCode += '02'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "configuration_error"
                }, 500)

            } else if (error instanceof errors.ConnectionError) {/* 03 */

                errorCode += '03'

                if (error.stack.includes('ENOTFOUND')) {
                    errorCode += '01'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "esClient_node_not_found_exception"
                    }, 500)

                } else {
                    errorCode += '02'
                    throw new HttpException({
                        "error": `error code: ${errorCode}`,
                        "message": "connection_error"
                    }, 500)
                }

            } else if (error instanceof errors.DeserializationError) {/* 04 */
                errorCode += '04'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "deserialization_error"
                }, 500)

            } else if (error instanceof errors.ElasticsearchClientError) {/* 05 */
                errorCode += '05'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "elasticsearch_client_error"
                }, 500)

            } else if (error instanceof errors.NoLivingConnectionsError) {/* 06 */
                errorCode += '06'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "no_living_connections_error"
                }, 500)

            } else if (error instanceof errors.SerializationError) {/* 07 */
                errorCode += '07'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "serialization_error"
                }, 500)

            } else if (error instanceof errors.TimeoutError) {/* 08 */
                errorCode += '08'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "request_timeout"
                }, 500)

            } else {
                errorCode += '09'
                throw new HttpException({
                    "error": `error code: ${errorCode}`,
                    "message": "internal_server_error"
                }, 500)
            }
        }


    }   

    public createIndex = async (body:any) => {
        return await this.esClient.indices.create({
            index: this.index,
            include_type_name: false,
            body: body
        })
    }

    public deleteIndex = async () => {
        return await this.esClient.indices.delete({ index: this.index })

    }


}