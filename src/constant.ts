import {DbService} from './databases/db.service'
var CryptoJS = require("crypto-js");

const db = new DbService()

export const getKey =  async () => {
    
    let data = []

     const result:any = await db.NIK('select * from llaves')
     result.forEach(item => {
          data.push(item)
     });

     return data

}

  export default  {
    getKey
}