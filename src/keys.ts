
import {DbService} from './databases/db.service'
var CryptoJS = require("crypto-js");

export class Keys {

    

    constructor(private DB:DbService){

    }

    async elastic(){
     
      let [elastic]:any = await this.DB.nikcleanPoolConection.query("SELECT valor FROM llaves WHERE nombre='ES_PUNTO_ENLACE'")
      var bytes  = CryptoJS.AES.decrypt(elastic[0].valor, 'abc');
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
        
      return originalText
      
    }

}