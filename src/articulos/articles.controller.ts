import { Body, Controller, Delete, Get, Param, Post,Put, Query, UseGuards, HttpCode, UseInterceptors, UploadedFile, Res, Header } from '@nestjs/common';
import { User as U } from '../usuarios/entities';
import { JwtGuard } from "../jwt/jwt.guard";
import { RefreshJwtGuard } from "../jwt/refreshjwt.guard";
import { articleDTO,updateArticleDTO,  ArticlesModelService, articleViewsDTO } from './articles-model.service';
import { SearchModelService } from '../elastic-search/search-model.service';
import { User } from '../user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3BucketService } from "../s3/s3-bucket.service";
import { Response } from 'express';
import {VerifyGuard} from "../auth/verifytoken.guard";
import { AutorizationGuard } from '../jwt/autorization.guard';
const { convertDeltaToHtml } = require('node-quill-converter');


@Controller('api/articles')
export class ArticlesController {

    constructor(
        private articlesModel: ArticlesModelService, 
        private S3BucketService: S3BucketService 
    ) { }

    @Get('/recaptcha')
    validarCaptcha(){
       return this.articlesModel.validarcaptcha()
    }

    @Get('/busqueda')
    validarbusqueda(){
       return this.articlesModel.validarbusqueda()
    }

    @Post('/accioncaptcha')
    accioncaptcha(
     
        @Body() body,
    ){
       return this.articlesModel.accioncaptcha(body.captcha)
    }

    @Post('/accionbusqueda')
    accionbusqueda(
     
        @Body() body,
    ){
       return this.articlesModel.accionbusqueda(body.busqueda)
    }

    @UseGuards(VerifyGuard)   
    @Get(':id/unico')
    Article(
        @Param('id') id:string,
        @User() user: U
    ): any {
        return this.articlesModel.getArticle(id);
    }

    @UseGuards(VerifyGuard) 
    @Post(':id/megusta')
    Like(@Param('id') idArticulo, @User() user: U): any {
        return this.articlesModel.actualizarValoraciones(idArticulo, "1102850901", 'like');
    }

    @UseGuards(VerifyGuard) 
    @Post(':id/disgusta')
    DisLike(@Param('id') idArticulo, @User() user: U): any {
        return this.articlesModel.actualizarValoraciones(idArticulo, "1102850901", 'disLike');
    }

    @UseGuards(VerifyGuard) 
    @Post(':id/favoritos')
    Favorite(@Param('id') idArticulo, @User() user: U): any {
        return this.articlesModel.addFavorite(idArticulo, "1102850901");
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    singleArticle(
        @Param('id') id:string,
        @User() user: U
    ): any {
        return this.articlesModel.getArticle(id);
    }

    @UseGuards(AutorizationGuard)
    @Get('unico/:id')
    singleArticle2(
        @Param('id') id:string,
        @User() user: U
    ): any {
        return this.articlesModel.getArticle(id);
    }

    @UseGuards(JwtGuard)
    @Get('prueba/prueba')
    prueba(
        @Param('id') id:string,
        @User() user: U
    ): any {        
        return this.articlesModel.prueba();
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteArticle(
        @Param('id') id: string,        
        @User() user: U,
    ): any {
       
        return this.articlesModel.deleteArticle(id,user.sub, user.name);
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post()
    createArticle(
     
        @Body() body: articleDTO,
        @User() user: U,
    ): any {
        
        return this.articlesModel.createArticle(body, user.sub);
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/cambiararticulo')
    cambiarArticulo(
     
        @Body() body
    ): any {
        
        return this.articlesModel.cambiararticulo(body.id_articulo,body.base,body.categoria);
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/required')
    createArticleRequired(
     
        @Body() body,
    ){
        
       return this.articlesModel.creararticlerequired(body.idarticulo,body.idpcrc,body.fechainicial,body.fechafinal,body.title,body.active)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/requiredverify')
    VerifyRequired(
     
        @Body() body,
    ){
       return this.articlesModel.verifyrequired(body.idarticulo,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/requiredverifyfecha')
    VerifyRequiredFecha(
     
        @Body() body,
    ){
       return this.articlesModel.verifyrequiredfecha(body.idarticulo)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/active')
    Active(
     
        @Body() body,
    ){
       return this.articlesModel.active(body.id_articulo,body.cedula)
    }

    @UseGuards(JwtGuard) 
    @HttpCode(200)
    @Post('/requiredverifyjarvis')
    VerifyRequiredJarvis(
     
        @Body() body,
    ){
       return this.articlesModel.verifyrequiredjarvis(body.cedula)
    }

    @UseGuards(JwtGuard) 
    @HttpCode(200)
    @Post('/verifyarticlesjarvis')
    VerifyArticleJarvis(
     
        @Body() body,
    ){
       return this.articlesModel.verifyarticlejarvis(body.idarticulo)
    }

    @UseGuards(JwtGuard) 
    @HttpCode(200)
    @Get('/tablarequired/obligatorios')
    tablaobligatorios(
    ){
       return this.articlesModel.tablaobligatorios()
    }

    @UseGuards(JwtGuard) 
    @HttpCode(200)
    @Post('/viewrequired')
    viewRequired(
     
        @Body() body,
    ){
       return this.articlesModel.viewarticlerequired(body.id_articulo,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/validarCuestionario')
    validarCuestionario(
     
        @Body() body,
    ){
       return this.articlesModel.validarCuestionario(body.id_articulo,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/guardarCuestionario')
    guardarCuestionario(
     
        @Body() body,
    ){
       return this.articlesModel.guardarCuestionario(body.id_articulo,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/guardarResultado')
    guardarResultado(
     
        @Body() body,
    ){

       this.articlesModel.guardarResultado(body.id_articulo,body.cedula,body.respuestas)

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/buscarequired')
    buscarRequired(
     
        @Body() body,
    ){
       return this.articlesModel.buscararticulo(body.buscar)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/totalrequired')
    ArticleRequiredTotal(
     
        @Body() body,
    ){
       return this.articlesModel.totalarticlerequired(body.id_pcrc,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/editarperiodo')
    editarPeriodo(
     
        @Body() body,
    ){
       return this.articlesModel.editarperiodo(body.inicial,body.final,body.titulo,body.id)
    }

    @HttpCode(200)
    @Post(':idArticle/files')
    @UseInterceptors(FileInterceptor('UploadFiles'))
    uploadFile(
        @UploadedFile() file,
        @Param('idArticle') idArticle
    ) {
        return this.articlesModel.uploadFile(idArticle,file)
    }
    

    //! verificar potque al eliminiar un archivo se hace con post 
    // @Post(':idArticle/delete')
    // @UseInterceptors(FileInterceptor('UploadFiles'))
    // deleteFile(
    //     @UploadedFile() file,
    //     @Param('idArticle') idArticle
    // ) {
    //     this.s3Bucket.deleteFile(idArticle,file.originalname)
    // }

    // @Delete(':idArticle/:fileName')
    // @UseInterceptors(FileInterceptor('UploadFiles'))
    // deleteFileAux(
    //     @Param('idArticle') idArticle,
    //     @Param('fileName') fileName
    // ) {
    //     this.s3Bucket.deleteFile(idArticle, fileName)
    // }


    @Get(':idArticle/files/:fileName')
    @Header('Content-Disposition', `inline`)
    getFile(
        @Param('idArticle') idArticle,
        @Param('fileName') fileName,
        @Res() res:Response
    ){
        let stream = this.S3BucketService.getFile(idArticle, fileName)
        stream.on('error', function(err){
            res.status(500).json({error:"Error -> " + err});

        }).pipe(res);
    }

    @Get(':idArticle/files')
    getArticleFiles(
        @UploadedFile() file,
        @Param('idArticle') idArticle
    ) {
        return this.articlesModel.getArticuloFiles(idArticle)
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    updateArticle(
        @Body() body: updateArticleDTO,
        @User() user: U,
        @Param('id') id: string,
    ): any {
        return this.articlesModel.updateArticle(id, body, user.sub);
    }

    @UseGuards(JwtGuard)
    @Post(':id/likes')
    addLike(@Param('id') idArticulo, @User() user: U): any {
        return this.articlesModel.actualizarValoraciones(idArticulo, user.sub, 'like');
    }

    @UseGuards(JwtGuard)
    @Post(':id/disLikes')
    addDisLike(@Param('id') idArticulo, @User() user: U): any {
        return this.articlesModel.actualizarValoraciones(idArticulo, user.sub, 'disLike');
    }

    @UseGuards(JwtGuard)
    @Post(':id/favorites')
    addFavorite(@Param('id') idArticulo, @User() user: U): any {
        return this.articlesModel.addFavorite(idArticulo, user.sub);
    }

    @UseGuards(JwtGuard)
    @Post(':id/views')
    addViews(
        @Param('id') idArticulo,
        @User() user: U,
        @Body() body: articleViewsDTO
    ): any {
        return this.articlesModel.addArticleView(idArticulo, body.initialDate, body.finalDate, user.sub)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/getcliente')
    getcliente(
     
    ){
       return this.articlesModel.getCliente()
    }
    
    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/getpcrc')
    getpcrc(
     
        @Body() body,
    ){
       return this.articlesModel.getPcrc(body.idpcrc)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/getobligatorioedit')
    getObligatorioEdit(
     
        @Body() body,
    ){
       return this.articlesModel.getObligatorioEdit(body.id)
    }

    
    @HttpCode(200)
    @Post('/obtenerpreguntas')
    getObligatorioPreguntas(
     
        @Body() body,
    ){
       return this.articlesModel.getObligatorioPreguntas(body.id_obligatorio)
    }

    @HttpCode(200)
    @Post('/validarespuestas')
    getValidarRespuestas(
     
        @Body() body,
    ){
       return this.articlesModel.validarRespuestas(body.respuestas)
    }

    @HttpCode(200)
    @Post('/guardarPreguntas')
    guardarPreguntas(
     
        @Body() body,
    ){
       return this.articlesModel.guardarPreguntas(body.idobligatorio,body.preguntas,body.respuestas)
    }

    
    @Post('/resultadoCuestionario')
    resultadoCuestionario(
     
        @Body() body,
    ){

        const limite=5;
        const pag=(body.page-1)*limite;

       return this.articlesModel.resultadosCuestionario(body.fechaini,body.fechafin,body.idpcrc,limite,pag)
    }

    @Post('/resultadocategoriaCuestionario')
    resultadocategoriaCuestionario(
     
        @Body() body,
    ){

        const limite=5;
        const pag=(body.page-1)*limite;

       return this.articlesModel.resultadoscategoriaCuestionario(body.fechaini,body.fechafin,body.categoria,limite,pag)
    }

    @UseGuards(JwtGuard)
  @Post('cuestionariototal')
  getcuestionarioTotal(@Body() body){
    
    return this.articlesModel.CuestionarioTotal(body.pcrc,body.fechaini,body.fechafin)

  }

  @UseGuards(JwtGuard)
  @Post('cuestionariocategoriatotal')
  getcuestionariocategoriaTotal(@Body() body){
    
    return this.articlesModel.CuestionariocategoriaTotal(body.categoria,body.fechaini,body.fechafin)

  }

  @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cuestionariodescargar')
    async getAllCuestionarioLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.articlesModel.getReportCuestionarioLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('cuestionariocategoriadescargar')
    async getAllCuestionarioCategoriaLimit(@Body() body,@Res() res){

        const limite=100000;
        const pag=(body.page-1)*limite;
        const {id, fechaIn, fechaFin}=body
        const report = await this.articlesModel.getReportCuestionariocategoriaLimit(fechaIn,fechaFin,id,limite,pag);
        
        res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.header('Content-Disposition', `attachment; filename=output.xlsx`);
        res.send(report);

    }

    @Post('/habilitarobligatorio')
    habilitarobligatorio(
     
        @Body() body,
    ){
       return this.articlesModel.habilitarobligatorio(body.idarticulo)
    }
    
    @Post('/multipleuser')
    async getMultipleUser(@Body() body){
        
        return await this.articlesModel.getMultipleUser(body.pcrc);
    }

    @Post('/guardarpcrcautomatizados')
    async guardarpcrcautomatizados(@Body() body){
        
        return await this.articlesModel.guardarpcrcautomatizado(body.origen,body.destino);
    }

    @Post('/eliminarpcrcautomatizados')
    async eliminarpcrcautomatizados(@Body() body){
        
        return await this.articlesModel.eliminarpcrcautomatizado(body.id);
    }
   

}