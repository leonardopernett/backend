import {Keys} from '../keys'
import {DbService} from '../databases/db.service'
import {getKey} from '../constant'
import { Res } from '@nestjs/common'


const db   = new DbService()
const keys = new Keys(db) 

export const client=async ()=>{

    const { Client } = require('@elastic/elasticsearch')
    const client = new Client({ node: process.env.ES_PUNTO_ENLACE })
    
    return client

}

  

