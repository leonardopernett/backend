import {  Injectable } from '@nestjs/common';
import { DbService } from "../databases/db.service"
import axios from 'axios';
const { convertHtmlToDelta } = require('node-quill-converter');
const { htmlToText } = require('html-to-text');
import {client} from '../elastic-search/conexion'

@Injectable()
export class ZendeskModelService {

    constructor(
        private db:DbService,

    ) { }

    
    public reemplazarTodos(texto, reemplazarQue, reemplazarCon, ignorarMayMin){
    
        var reemplazarQue = reemplazarQue.replace(/[\\^$.|?*+()[{]/g, "\\$&"),
            reemplazarCon = reemplazarCon.replace(/\$(?=[$&`'\d])/g, "$$$$"),
            modif = "g" + (ignorarMayMin ? "i" : ""),
            regex = new RegExp(reemplazarQue, modif);
        
        return texto.replace(regex,reemplazarCon);
       
    }


////////////inicio guardar zendesk un poco optimizada//////////
    public async guardarzendesk(){

        console.log('Registrando Nuevos Articulos Zendesk...');

        let articlesdb:any=await this.db.nikcleanPoolConection.query('SELECT articulo.id_otros FROM articulo WHERE articulo.id_otros IS NOT NULL');
        
        let arraydb=articlesdb[0].map(item=>item.id_otros)

        const es=await client()
        const res= await axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles.json`);
        const datos2:any=await res.data

        
        for (let i = 1; i <= datos2.page_count; i++) {

          setTimeout( async () =>{
            
            const res= await axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles.json?page=${i}&per_page=${datos2.per_page}`);
            const datos=await res.data

            datos.articles.forEach(async datap => {
        
              let index = arraydb.indexOf(datap.id);
              
              if(index===-1){

                let html = datap.body;
                let htmlF = this.reemplazarTodos(html, "https://konecta-xp.zendesk.com/hc/es-co/articles/", "./#/app/article/",false);
                let text = htmlToText(htmlF, { wordwrap: 130 });
    
                let htmlString = datap.body;
                let htmlStringF = this.reemplazarTodos(htmlString, "https://konecta-xp.zendesk.com/hc/es-co/articles/","./#/app/article/",false);
                
                await this.db.NIK('call crear_articulo_otros(?,?,?,?,?,?)',[
                datap.title,
                text,
                htmlStringF,
                datap.id,
                datap.updated_at,
                1102850901
              ]).then((data:any)=>{
               
                if(data[0].respuesta!=0){
        
                  
               
                  es.index({
                    index:'articulo',
                    id:data[0].respuesta,
                        body:{
                            base: 68,
                            likes: 0,
                            disLikes: 0,
                            favorites: 0,
                            views: 0,
                            publicationDate:(new Date()).getTime(),
                            type:'articulo',
                            attached : [],
                            category : 1627,
                            content : data[0].content,
                            obj : data[0].obj,
                            role : "articulo",
                            state : "1",
                            tags : [ ],
                            title : data[0].title
                            }
                    })  
        
                }
        
            }).catch(error=>{

                console.log(error)
            })  
    
            }

            })
            
          }, i * 9000)
        }
         

    console.log('Finalizado...');

    }
////////////fin guardar zendesk un poco optimizada//////////


    public async getarticulozendesk(){
        let result = await this.db.NIK(`call get_articulos_otros()`)
        return result;
    }

    public async changearticulozendesk(articulo){

      const es=await client()

            es.update({
                index: "articulo",
                id: articulo.articulo.id,
                body: {
                    doc: {
                        base:articulo.articulo.idpcrc,
                        category:articulo.articulo.idcategoria
                    }
                }
            })
        
        let result = await this.db.NIK(`call change_articulos_otros(?,?,?,?)`,[
            articulo.articulo.id,articulo.articulo.idcliente,articulo.articulo.idpcrc,articulo.articulo.idcategoria
        ])
        return result;
    }

////////////inicio actualizar zendesk un poco optimizada//////////
    public async actualizarzendesk(){
    
      const es=await client()

      console.log('Actualizando Articulos Zendesk...');

      const res= await axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles.json`);
      const datos:any=await res.data
    
      for (let i = 1; i <= datos.page_count; i++) {

        setTimeout( async () =>{

           const res= await axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles.json?page=${i}&per_page=${datos.per_page}`);
      const datos2=await res.data

    datos2.articles.forEach(async (data,index)=> {

      let html = data.body;
      let htmlF = this.reemplazarTodos(html, "https://konecta-xp.zendesk.com/hc/es-co/articles/", "./#/app/article/",false);
      let text = htmlToText(htmlF, {
        wordwrap: 130
      });

      let htmlString = data.body;
      let htmlStringF = this.reemplazarTodos(htmlString, "https://konecta-xp.zendesk.com/hc/es-co/articles/","./#/app/article/",false);
      
      
      let datas:any;

        this.db.NIK('call actualizar_articulo_otros(?,?,?,?,?)',[
          data.id,
          data.title,
          text,
          htmlStringF,
          data.updated_at
        ]).then((datas:any)=>{

        if(datas[0].respuesta!=0){
          
         es.update({
          index:'articulo',
          id:datas[0].respuesta,
              body:{
                doc:{
                  base: 68,
                  likes: 0,
                  disLikes: 0,
                  favorites: 0,
                  views: 0,
                  publicationDate:(new Date()).getTime(),
                  type:'articulo',
                  attached : [],
                  category : 1627,
                  content : datas[0].content,
                  obj : datas[0].obj,
                  role : "articulo",
                  state : "1",
                  tags : [ ],
                  title : datas[0].title
                  }
                }
          })

        }

        }).catch(error=>{
          console.log(error.status)

          if(error.status===404){

            this.db.nikcleanPoolConection.query('DELETE FROM articulo WHERE id= ?',[datas[0].respuesta])
  
          }

        }) 
            
        })  
    

      }, i * 9000)

    }

    console.log('Finalizado...');

    }
////////////fin editar zendesk un poco optimizada//////////

public async datacargada(){

  let array = [];
  let requests = [];

  const res = await axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles.json`);
  const datos: any = await res.data;

  for (let i = 1; i <= datos.page_count; i++) {
    requests.push(axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles.json?page=${i}&per_page=${datos.per_page}`));
  }

  const results = await Promise.all(requests);
  
  results.forEach(result => {
    result.data.articles.map(item => {
      array.push(item.id);
    });
  });

  return array 

}

    public async borrarzendesk(){

      console.log('Borrando Articulos Zendesk No Habilitados...');

      let result:any = await this.db.NIK(`call get_articulos_otros()`)

      let datos=await this.datacargada()
        
       result.forEach(async element2 => {
        
          let index = datos.indexOf(element2.id_otros); 
           
          if(index==-1){
           const datas:any= await this.db.NIK('call borrar_articulo_otros(?)',[
             element2.id_otros
           ]) 
 
         } 
         
       });  
      
        console.log('Finalizado...');
       
    }


    public async borrarzendeskfaq(){

      let arrayid=[]

      console.log('Borrando Articulos Zendesk No Habilitados...');

       let arrayidDB=await this.db.NIK('SELECT id_otros FROM eliminar_articulo_zendesk')
       
       arrayidDB.forEach((element:any) => {
         arrayid.push(element.id_otros)
       });

      const res= await axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles.json`);
      const datos:any=await res.data
    
      for (let i = 0; i < datos.page_count; i++) {

    const res= await axios.get(`https://konecta-xp.zendesk.com/api/v2/help_center/es-co/articles.json?page=${i}&per_page=${datos.per_page}`);
    const datos2=await res.data

     datos2.articles.forEach(async data=> {

      let datos=arrayid.indexOf(data.id)
      if(datos!=-1){
        console.log(data.id)

        try {

          await this.db.nikcleanPoolConection.query('DELETE FROM articulo WHERE id_otros=?',[data.id]) 
                
        const es=await client()

          await es.delete({
             index: "articulo",
             id: data.id
             });
          
        } catch (error) {
          
        }

      }

    }); 

    }   
    
   

        console.log('Finalizado...');

    }


    public async migrarzendesk(){

      let data:any=await this.db.nikcleanPoolConection.query('SELECT * FROM articulo WHERE base_id=580');
      let dataF=data[0];

       dataF.forEach(async element => {

        const es=await client()
        
        es.index({
          index:'articulomapa',
          id:element.id,
              body:{
                  base: element.base_id,
                  likes: 0,
                  disLikes: 0,
                  favorites: 0,
                  views: 0,
                  publicationDate:(new Date()).getTime(),
                  type:'articulo',
                  attached : [],
                  category : element.categoria_id,
                  content : element.content,
                  obj : element.obj,
                  role : "articulo",
                  state : "1",
                  tags : [ ],
                  title : element.title
                  }
          })
        
      }); 


    }


} 
