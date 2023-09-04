import { Injectable } from '@nestjs/common';
import { ApiResponse } from "@elastic/elasticsearch";

import { Esindex } from "./esindex";

@Injectable()
export class EsClientService {

    constructor() {
    }

    public async createIndex(index: string): Promise<ApiResponse> {

        try {
            switch (index) {
                case 'articulo':
                    return await new Esindex('articulo', process.env.ES_PUNTO_ENLACE_ENCRIPTADO).createIndex({
                        "mappings": {
                            "properties": {
                                "title": { "type": "text" },
                                "content": { "type": "text", "analyzer": "spanish" },
                                "tags": { "type": "keyword" },
                                "likes": { "type": "keyword" },
                                "disLikes": { "type": "keyword" },
                                "favorites": { "type": "keyword" },
                                "state": { "type": "keyword" },
                                "publicationDate": { "type": "date", "format": 'epoch_millis' },
                                "base": { "type": "keyword" },
                                "category": { "type": "keyword" },
                                "views": { "type": "integer" },
                                "type": { "type": "keyword" }
                            }
                        }
                    })
                               
                case 'searchs':
                    return await new Esindex('searchs', process.env.ES_PUNTO_ENLACE_ENCRIPTADO).createIndex({
                        mappings: {
                            properties: {
                                query: {
                                    type: "completion",
                                    contexts: [
                                        {
                                            name: "subline",
                                            type: "category",
                                            path: "subline"
                                        }
                                    ]
                                },
                                didyoumean: { type: "text" },
                                subline: { type: "keyword" },
                                user: { type: "keyword" },
                                publicationDate: { "type": "date", "format": 'epoch_millis' },
                            }
                        }
                    })
             
            }
        } catch (err) {
            console.log(err)
        }
    }


    public async deleteIndex(index: string): Promise<any> {
        try {
            switch (index) {
                case 'articulo':
                    return await new Esindex('articulo', process.env.ES_PUNTO_ENLACE_ENCRIPTADO).deleteIndex()
                  
            }
        } catch (err) {
            console.log(err)
        }
    }

    // public DDBB_status = () => {
    //     return this.esClient.ping()
    // }
}