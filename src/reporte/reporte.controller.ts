import {  Controller, UseGuards, Post, Body, HttpCode, Get, Param, Inject, Query, Res, Req} from '@nestjs/common';
import { JwtGuard } from "../jwt/jwt.guard";
import { ReportsModelService } from '../reporte/reporte-model.service';
import {  Request, Response } from 'express'
import { AutorizationGuard } from '../jwt/autorization.guard';


@Controller('api/reports')
export class ReportsController {

    constructor(@Inject('activeDirectory')
    private ad,private ReporteService:ReportsModelService) { }

    // Aqui se encuentran las endpoint de descargas xlsx //
    
    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('lecturadescargar')
    async getAllLecturaLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportLecturaLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('lecturacategoriadescargar')
    async getReportLecturaCategoriaLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportLecturaCategoriaLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('comentariodescargar')
    async getAllComentarioLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportComentarioLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('comentariocategoriadescargar')
    async getAllComentariocategoriaLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportComentariocategoriaLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('basedatosdescargar')
    async getAllBaseDatosLimit(@Body() body,@Res() res){

      const limite=500;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportBaseDatosLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('basedatoscategoriadescargar')
    async getAllBaseDatosCategoriaLimit(@Body() body,@Res() res){

      const limite=500;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportBaseDatosCategoriaLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cambiodescargar')
    async getAllCambioLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportCambioLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cambiocategoriadescargar')
    async getAllCambioCategoriaLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportCambioCategoriaLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('usuariodescargar')
    async getAllUsuarioLimit(@Body() body,@Res() res){

      const limite=500;
      const pag=(body.page-1)*limite;
      const {id}=body
      const report = await this.ReporteService.getReportUsuarioLimit(id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('financieradescargar')
    async getAllFinancieraLimit(@Body() body,@Res() res){

      const { fechaIn, fechaFin}=body
      const report = await this.ReporteService.getReportFinancieraLimit(fechaIn,fechaFin);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('obligatoriodescargar')
    async getAllObligatorioLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin,usuario}=body
      const report = await this.ReporteService.getReportObligatorioLimit(id,fechaIn,fechaFin,usuario,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('obligatoriocategoriadescargar')
    async getAllObligatorioCategoriaLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin,usuario,idcategoria}=body
      const report = await this.ReporteService.getReportObligatorioCategoriaLimit(id,fechaIn,fechaFin,usuario,limite,pag,idcategoria);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    // Finaliza bloque //

    // Aqui se encuentran las rutas de las tablas //

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('lecturapcrc')
    getalllecturabypcrc(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaIn, fechaFin }= body
      return this.ReporteService.getReportLecturaPcrc(fechaIn, fechaFin,id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('lecturacategoria')
    getalllecturabycategoria(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaIn, fechaFin }= body
      return this.ReporteService.getReportLecturaCategoria(fechaIn, fechaFin,id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('lecturatotal')
    async getlecturatotal(@Body() body){
      
      const { id, fechaIn, fechaFin }= body
      let data:any=await this.ReporteService.getLecturaTotal(fechaIn, fechaFin,id)
      
      return data

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('lecturacategoriatotal')
    async getlecturacategoriatotal(@Body() body){
      
      const { id, fechaIn, fechaFin }= body
      let data:any=await this.ReporteService.getLecturaCategoria(fechaIn, fechaFin,id)
      
      return data

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('comentariopcrc')
    getallcomentariobypcrc(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaIn, fechaFin }= body
      return this.ReporteService.getReportComentarioPcrc(fechaIn, fechaFin,id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('comentariocategoria')
    getallcomentariobycategoria(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaIn, fechaFin }= body
      return this.ReporteService.getReportComentarioCategoria(fechaIn, fechaFin,id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('comentariototal')
    async getcomentariototal(@Body() body){
      
      const { id, fechaIn, fechaFin }= body
      let data:any=await this.ReporteService.getComentarioTotal(fechaIn, fechaFin,id)
      
     return data

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('comentariocategoriatotal')
    async getcomentariocategoriatotal(@Body() body){
      
      const { id, fechaIn, fechaFin }= body
      let data:any=await this.ReporteService.getComentarioCategoriaTotal(fechaIn, fechaFin,id)
      
     return data

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('basedatospcrc')
    getallbasedatosbypcrc(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaIn, fechaFin }= body
      return this.ReporteService.getReportBaseDatosPcrc(fechaIn, fechaFin,id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('basedatoscategoria')
    getallbasedatosbycategoria(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaIn, fechaFin }= body
      return this.ReporteService.getReportBaseDatosCategoria(fechaIn, fechaFin,id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('basedatostotal')
    async getbasedatostotal(@Body() body){
      
      const { id }= body
      let data:any=await this.ReporteService.getBaseDatosTotal(id)
      
     return data

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('basedatoscategoriatotal')
    async getbasedatoscategoriatotal(@Body() body){
      
      const { id }= body
      let data:any=await this.ReporteService.getBaseDatosCategoriaTotal(id)
      
     return data

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cambiopcrc')
    getallcambiobypcrc(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaIn, fechaFin }= body
      return this.ReporteService.getReportCambioPcrc(fechaIn, fechaFin,id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cambiocategoria')
    getallcambiobycategoria(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaIn, fechaFin }= body
      return this.ReporteService.getReportCambioCategoria(fechaIn, fechaFin,id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cambiototal')
    async getcambiototal(@Body() body){
      
      const { id, fechaIn, fechaFin }= body
      let data:any=await this.ReporteService.getCambioTotal(fechaIn, fechaFin,id)
      
     return data

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cambiocategoriatotal')
    async getcambiocategoriatotal(@Body() body){
      
      const { id, fechaIn, fechaFin }= body
      let data:any=await this.ReporteService.getCambioCategoriaTotal(fechaIn, fechaFin,id)
      
     return data

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('usuariopcrc')
    getallusuariobypcrc(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id }= body
      return this.ReporteService.getReportUsuarioPcrc(id,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('usuariototal')
    async getusuariototal(@Body() body){
      
      const { id}= body
      let data:any=await this.ReporteService.getUsuarioTotal(id)
      
     return data

    }

    // Finaliza bloque //

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cambio')
     getAllCambio(@Body() body){
       return this.ReporteService.getReportCambio(body.idarticulo,body.ini,body.fin);
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('bases')
     getAllBases(@Body() body){
       return this.ReporteService.getReportBases(body.idarticulo);
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('bases/category')
     async getAllBasesCategory(@Body() body){

      let res:any=[]
       
      const data = await this.ReporteService.getReportBasesCategory(body.idcategoria);

        for(let item of data){
          let data2=await this.ReporteService.getReportBases(item["id"])
          res.push(...data2);
        }

        return res;


    }

  
    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('bases/categorylimit')
     async getAllBasesCategoryLimit(@Body() body){

      const limite=5;
      const pag=(body.page-1)*limite;
      let res:any=[]
       
      const data = await this.ReporteService.getReportBasesCategoryLimit(body.idcategoria,limite,pag);

        for(let item of data){
          let data2=await this.ReporteService.getReportBases(item["id"])
          res.push(...data2);
        }

        return res;


    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('bases/pcrclimit')
     async getAllBasesPcrcLimit(@Body() body){

      const limite=5;
      const pag=(body.page-1)*limite;
      let res:any=[]
       
      const data = await this.ReporteService.getReportBasesPcrcLimit(body.idpcrc,limite,pag);

        for(let item of data){
          let data2=await this.ReporteService.getReportBases(item["id"])
          res.push(...data2);
        }

        return res;


    }

 
    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('usuario')
    getAllBasesUsuario(@Body() body){

      return this.ReporteService.getReportUsuario(body.id);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('usuariolimit')
    getAllBasesUsuarioLimit(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      return this.ReporteService.getReportUsuarioLimit(body.id,limite,pag);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('lectura')
     getAllLectura(@Body() body){
       const {id, fechaIn, fechaFin}=body
       return this.ReporteService.getReportLectura(fechaIn,fechaFin,id);
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('lectura/category')
    getalllecturabycategory(@Body() body){

     const { id, fechaIn, fechaFin }= body
     return this.ReporteService.getReportLecturaCategory(fechaIn, fechaFin,id )
    }

    @Post('bases/pcrc/limite')
    async getAllBasesLimit(@Body() body){
        const { idpcrc } = body 
        let resp= []
        const data:any = await this.ReporteService.getReportBasesPcrc(idpcrc);
        for (let index = 0; index < 10; index++) {
           resp.push(...await this.ReporteService.getReportBases(data[index].id))
        }
        return resp
    }

   
     
    @UseGuards(JwtGuard)
    @Post('comentarios')
    getCommentPcrc(@Body() req){
      const {id, fechaIn ,fechaFin} = req
     
    
      return this.ReporteService.getCommnetByPcrc(id,fechaIn,fechaFin)
    }

    @UseGuards(JwtGuard)
    @Post('comentarioslimit')
    getCommentPcrcLimit(@Body() req){
      const limite=5;
      const pag=(req.page-1)*limite;
      const {id, fechaIn ,fechaFin} = req
      return this.ReporteService.getCommnetByPcrcLimit(id,fechaIn,fechaFin,limite,pag)
    }

    @UseGuards(JwtGuard)
    @Get('categoria/:id')
    getCategoriaById(@Param('id') id){
      return this.ReporteService.getCategoryById(id)
    }

    @UseGuards(JwtGuard)
    @Post('totalarticulos')
    getTotalArticulo(@Body() body){

    return this.ReporteService.getTotalArticulo()

    }

    @UseGuards(JwtGuard)
    @Post('totalarticuloslimit')
    getTotalArticuloLimit(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
    return this.ReporteService.getTotalArticuloLimit(limite,pag)

    }
  
    @Post('financieralimit') 
    async getTotalFinancieraLimit(
    @Body() body,
    @Query() query,
 
    ){
      
      const { inicial,final } = body
      const { limit, page }= query
   
      const offset = ( page - 1) * limit
      return await this.ReporteService.getTotalFinancieraLimit( inicial, final, limit, offset)
    }


  /* generando excel */
  @UseGuards(JwtGuard)
  @Post('financiera')
  async getTotalFinanciera(
    @Body() body,
    @Res() res:Response
    ){
    const { inicial, final } = body
     const result = await  this.ReporteService.getTotalFinanciera(inicial,final)
     const resp = await this.ReporteService.generaExcel(result, 5,  Date.now())
     return res.json(resp)

  } 

  @UseGuards(JwtGuard) 
  @HttpCode(200)
  @Post('bases/pcrc')
   async getAllBasesPcrc(@Body() body, @Res() resp:Response){
      let res:any=[]
      const data = await this.ReporteService.getReportBasesPcrc(body.idpcrc);

        for(let item of data){
          let data2=await this.ReporteService.getReportBases(item["id"])
          res.push(...data2);
        }

        let result =  res.map((item:any) => {
          if(item.indiceUtilidad==null || item.indiceNoUtilidad==null ){ 
            item.indiceUtilidad = 0
            item.indiceNoUtilidad = 0
            item.tasarebote = item.tasarebote == null ? "0" : parseInt(item.tasarebote).toFixed()
            return item
          }else{
            item.indiceUtilidad = item.indiceUtilidad          
            item.indiceNoUtilidad = item.indiceNoUtilidad
            item.tasarebote = item.tasarebote == null ? "0" : parseInt(item.tasarebote).toFixed()
            return item
          }
        });
        
        const datos = await this.ReporteService.generaExcel(result, 3, Date.now())
        return resp.json(datos);
  }

   @UseGuards(JwtGuard)
   @Post('lectura/data')
   async getAllLecturaData(
     @Body() body,
     @Res()  res:Response
     ){
      const { id, fechaIn, fechaFin } = body
      const reporteLectura = await this.ReporteService.getReportLecturaData(fechaIn,fechaFin,id);
      const resp = await this.ReporteService.generaExcel(reporteLectura, 4,Date.now())
      return res.json(resp)
      
   }
   

   @UseGuards(JwtGuard)
   @Post('comentarios/data')
   async getAllComentarioData(
     @Body() body, 
     @Res() res:Response,
     ){ 
      const {id, fechaIn ,fechaFin} = body
      const reportesComentarios = await this.ReporteService.getCommnetByPcrc(id,fechaIn,fechaFin)
      const resp =  await this.ReporteService.generaExcel(reportesComentarios,  1, Date.now())
      return res.json(resp)
   }

   @HttpCode(200)
   @UseGuards(JwtGuard)
   @Post('cambio/data')
   async getReportCambioData(
     @Req() req: Request,  
     @Res() res:Response
     ){
      const {idarticulo,ini,fin} = req.body
      const reportesCambios =  await this.ReporteService.getReportCambio(idarticulo,ini,fin);
      const resp =  await this.ReporteService.generaExcel(reportesCambios,  2, Date.now())
      return res.json(resp)
   }

 /* fin generando excel */


  @UseGuards(JwtGuard)
  @Get('cambio/remove')
  async getReportCambioRemove(
    @Query() query,
    @Res() res:Response
  ){
     const { id } = query
     const response = await this.ReporteService.deleteReport(id)
     return res.status(200).json(response) 
  }

  @UseGuards(JwtGuard)
  @Get('lectura/remove')
  async getReportlecuraRemove(
    @Query() query,
    @Res() res:Response
  ){
     const { id } = query
     const response = await this.ReporteService.deleteReport(id)
     return res.status(200).json(response) 
  }

  @UseGuards(JwtGuard)
  @Get('base/remove')
  async getReportbaseRemove(
    @Query() query,
    @Res() res:Response
  ){
     const { id } = query
     const response = await this.ReporteService.deleteReport(id)
     return res.status(200).json(response) 
  }

  @UseGuards(JwtGuard)
  @Get('comentario/remove')
  async getReportcomentarioRemove(
    @Query() query,
    @Res() res:Response
  ){
     const { id } = query
     const response = await this.ReporteService.deleteReport(id)
     return res.status(200).json(response) 
  }

  @UseGuards(JwtGuard)
  @Get('financiera/remove')
  async getReportfinancieraRemove(
    @Query() query,
    @Res() res:Response
  ){
     const { id } = query
     const response = await this.ReporteService.deleteReport(id)
     return res.status(200).json(response) 
  }
 
 @UseGuards(AutorizationGuard)
 @Get('debug')
 async   depurarAllreport(
    @Res() res:Response
  ){
    await this.ReporteService.depurarReporte()
    return res.json('reporte depurado')
  }

  @UseGuards(JwtGuard)
  @Post('obligatoriopcrc')
  getObligatorioPcrcLimit(@Body() body){

      const limite=5;
      const pag=(body.page-1)*limite;

    return this.ReporteService.getReportObligatorioPcrc(body.pcrc,body.fechaini,body.fechafinal,body.usuarios,limite,pag)

  }

  @UseGuards(JwtGuard)
  @Post('obligatoriocategory')
  getObligatorioCategoryLimit(@Body() body){

    const limite=5;
    const pag=(body.page-1)*limite;

  return this.ReporteService.getObligatorioCategoria(body.pcrc,body.fechaini,body.fechafinal,body.usuarios,limite,pag,body.categoria)

  }

  @UseGuards(JwtGuard)
  @Post('obligatoriototal')
  getObligatorioTotal(@Body() body){
    
    return this.ReporteService.getObligatorioTotal(body.pcrc,body.fechaini,body.fechafinal,body.usuarios)

  }

  @UseGuards(JwtGuard)
  @Post('obligatoriocategoriatotal')
  getObligatoriocategoriaTotal(@Body() body){

    return this.ReporteService.getObligatorioCategoriaTotal(body.pcrc,body.fechaini,body.fechafinal,body.usuarios,body.categoria)

  }

    
}