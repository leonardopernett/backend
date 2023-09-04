import { Esindex } from "./esindex";
import { Injectable } from "@nestjs/common";
import { ApiResponse, Client, errors, RequestParams } from "@elastic/elasticsearch";
import { HttpException } from "@nestjs/common";
import * as R from 'remeda';

export interface search {
    query:any,
    subline:string,
    user:string,
    publicationDate:number,
    didyoumean:string
}

@Injectable()
export class SearchsIndex extends Esindex<search> {
    constructor(){
        super('searchs', process.env.ES_PUNTO_ENLACE)
    }

    //14 
    public create = async (doc: search, id?: string): Promise<search & { id: string; }> => {

        let result: ApiResponse

        doc.query = {
            input: doc.query
        }

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

            let errorCode = '14';

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

    //15
    public query = async (query: object): Promise<any> => {

        try {

            let queryObj: RequestParams.Search = this.createRequest(query)

            let result = await this.esClient.search(queryObj)

            return result

        } catch (error) {

            console.log(error.meta.body.error)

            let errorCode = '15';

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

}