import { Injectable } from '@nestjs/common';
import { SearchsIndex, search } from "./searchIndex";
import { IsNotEmpty, Length } from 'class-validator';
import { ArticuloIndex } from "../articulos/articuloIndex";
import { DbService } from "../databases/db.service";
import {client} from "../elastic-search/conexion";


export class newSearchDTO {
    @IsNotEmpty({ message: 'debes proporcionar una query' })
    query

    @IsNotEmpty({ message: 'debes proporcionar una sublinea' })
    subline
}




@Injectable()
export class SearchModelService {

    constructor(
        private searchsIndex: SearchsIndex,
        private articleIndex: ArticuloIndex,
        private db: DbService,
    ) { }

    public async newSearch(query: string, subline: string, userId: string): Promise<any> {
       
       if(query == undefined) return 

       const es=await client()
      
        await Promise.all([
            es.index({
                index:'searchs',
                    body:{
                            publicationDate: (new Date()).getTime(),
                            query: query,
                            didyoumean: query,
                            subline: subline,
                            user: userId
                        }
            }), 
            this.db.NIK('CALL nueva_busqueda(?, ?, ?)', [query, subline, userId])
        ])

    }

    public async getSuggestions(input: string, subline: string): Promise<string[]> {
        return
        //let fraseCorregida = await this.getDidYouMean(input)
        //arreglar autocompletado
        /* const es=await client()
 
        let query= await es.search({
            index: 'searchs',
            body: {
                suggest: {
                sugerencias: {
                    prefix: input,
                    completion: {
                        field: "query",
                        skip_duplicates: true,
                        contexts: {
                            subline: [subline]
                        }
                    }
                }
            }
            }
            })

        return query.suggest.sugerencias[0].options.map(op => op.text) */

    }

    public async getDidYouMean(input: string): Promise<string> {

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
            }
            
            let result = await this.articleIndex.didYouMean(query)
            
            let replaceMents = result.body.suggest.sugerencias.map(suj => {
                if (suj.options.length) {
                    return { offset: suj.offset, length: suj.length, value: suj.options[0].text }
                }

                return null
            }).filter(data => data)

            for (var i = replaceMents.length - 1; i >= 0; i--) {
                input = input.slice(0, replaceMents[i].offset) + replaceMents[i].value + input.slice(replaceMents[i].offset + replaceMents[i].length)
            }

            return input

        } catch (error) {
            console.log(error)
        }
    }

    public async getAll(): Promise<(search & { id: string; })[]> {
        return await this.searchsIndex.all()
    }

    public async getBySubline(subline: string): Promise<(search & { id: string; })[]> {
        return await this.searchsIndex.where({ subline: subline })
    }

}