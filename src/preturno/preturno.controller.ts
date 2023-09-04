import {  Controller, UseGuards, Post, Body, HttpCode, Get, Param, Inject, Put, Query, Res} from '@nestjs/common';
import { PreturnoModelService } from '../preturno/preturno-model.service';
import { JwtGuard } from '../jwt/jwt.guard';


@Controller('api/preturno')
export class PreturnoController {


    constructor(private Preturno:PreturnoModelService) { }

  
    @UseGuards(JwtGuard)
    @Post('insertar')  
    async insertarPreturno(
      @Body() body
    ){
     
      return await this.Preturno.insertarpreturno(body)

    }

    @UseGuards(JwtGuard)
    @Post('mostrar')  
    async mostrarPreturnos(
      @Body() body
    ){
    
      return await this.Preturno.mostrarpreturnos(body.pcrc)

    }

    @UseGuards(JwtGuard)
    @Post('mostraracargo')  
    async mostrarPreturnosAcargo(
      @Body() body
    ){
    
      return await this.Preturno.mostrarpreturnosacargo(body.cedula)

    }

    @UseGuards(JwtGuard)
    @Post('mostraradmin')  
    async mostrarPreturnosadmin(
        @Body() body
    ){
    
      return await this.Preturno.mostrarpreturnosadmin(body.cedula)

    }

    @UseGuards(JwtGuard)
    @Post('borrar')  
    async borrarPreturnos(
      @Body() body
    ){
    
      return await this.Preturno.borrarpreturno(body.idpreturno)

    }

    @UseGuards(JwtGuard)
    @Post('actualizar')  
    async actualizarPreturnos(
      @Body() body
    ){
    
      return await this.Preturno.actualizarpreturno(
        body.idpreturno,body.titulo,body.descripcion,body.contenido,body.fecha_inicial,body.fecha_final)

    }

    @HttpCode(200)
    @Post('/guardarPreguntas')
    guardarPreguntas(
     
        @Body() body,
    ){
       return this.Preturno.guardarPreguntas(body.idpreturno,body.preguntas,body.respuestas)
    }

    @HttpCode(200)
    @Post('/guardarConcepto')
    guardarConcepto(
     
        @Body() body,
    ){
       
        return this.Preturno.guardarConcepto(body.idpreturno,body.preguntas,body.respuestas)  
    }

    @HttpCode(200)
    @Post('/total')
    validarTotal(
     
        @Body() body,
    ){
       return this.Preturno.validarPreturnoTotal(body.idpcrc,body.cedula)
    }

    @HttpCode(200)
    @Post('/totalcargo')
    TotalCargo(
     
        @Body() body,
    ){
       return this.Preturno.totalcargo(body.cedula)
    }

    @HttpCode(200)
    @Post('/aprobacion')
    aprobacion(
     
        @Body() body,
    ){
       return this.Preturno.aprobacion(body.cedula)
    }

    @HttpCode(200)
    @Post('/obtenerpreguntas')
    getObligatorioPreguntas(
     
        @Body() body,
    ){
       return this.Preturno.obtenerPreguntasPreturno(body.id_preturno)
    }

    @HttpCode(200)
    @Post('/obtenerpreguntasunica')
    getObligatorioPreguntasUnica(
     
        @Body() body,
    ){
       return this.Preturno.obtenerPreguntasPreturnoUnica(body.id_preturno)
    }

    @HttpCode(200)
    @Post('/obtenerpreguntasconcepto')
    getObligatorioPreguntasConcepto(
     
        @Body() body,
    ){
       return this.Preturno.obtenerPreguntasPreturnoConcepto(body.id_preturno)
    }

    @HttpCode(200)
    @Post('/obtenerespuestasconcepto')
    getObligatorioRespuestasConcepto(
     
        @Body() body,
    ){
       return this.Preturno.obtenerRespuestaPreturnoConcepto(body.id_pregunta)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/guardarCuestionarioUnico')
    guardarCuestionarioUnico(
     
        @Body() body,
    ){
       return this.Preturno.guardarCuestionarioUnico(body.id_preturno,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/guardarCuestionarioConcepto')
    guardarCuestionarioConcepto(
     
        @Body() body,
    ){
       return this.Preturno.guardarCuestionarioConcepto(body.id_preturno,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/guardarCuestionarioMultiple')
    guardarCuestionario(
     
        @Body() body,
    ){
       return this.Preturno.guardarCuestionarioMultiple(body.id_preturno,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/guardarResultadoMultiple')
    guardarResultado(
     
        @Body() body,
    ){

       this.Preturno.guardarResultadoMultiple(body.id_preturno,body.cedula,body.porcentaje1,body.porcentaje2,body.porcentaje3)

    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/validarespuestasMultiple')
    getValidarRespuestas(
     
        @Body() body,
    ){
       return this.Preturno.validarRespuestasMultiple(body.respuestas)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/vistoMultiple')
    vistoMultiple(
     
        @Body() body,
    ){
       return this.Preturno.vistoMultiple(body.id_preturno,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/vistoUnico')
    vistoUnico(
     
        @Body() body,
    ){
       return this.Preturno.vistoUnico(body.id_preturno,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/vistoConcepto')
    vistoConcepto(
     
        @Body() body,
    ){
       return this.Preturno.vistoConcepto(body.id_preturno,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/guardarVisto')
    guardarVisto(
     
        @Body() body,
    ){
       return this.Preturno.guardarVisto(body.id_preturno,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/visto')
    visto(
     
        @Body() body,
    ){
       return this.Preturno.visto(body.id_preturno,body.cedula)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/validarocultar')
    validarocultar(
     
        @Body() body,
    ){
       return this.Preturno.validadoOcultar(body.cedula,body.id_preturno)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('/avance')
    avance(
     
        @Body() body,
    ){
       return this.Preturno.avance(body.cedula,body.pcrc)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('preturnodescargar')
    async getAllPreturnoLimit(@Body() body,@Res() res){

      const limite=100000;
      const pag=(body.page-1)*limite;
      const {id, fechaIn, fechaFin}=body
      const report = await this.Preturno.getReportPreturnoLimit(fechaIn,fechaFin,id,limite,pag);
      
      res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.header('Content-Disposition', `attachment; filename=output.xlsx`);
      res.send(report);

    }
    
    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('preturnopcrc')
    getallpreturnobyocrc(@Body() body){
      const limite=5;
      const pag=(body.page-1)*limite;
      const { id, fechaini, fechafin }= body
      return this.Preturno.getReportPreturnoPcrc(id,fechaini, fechafin,limite,pag)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post('preturnototal')
    async getpreturnototal(@Body() body){
      
      const { id, fechaIn, fechaFin }= body
      let data:any=await this.Preturno.getPreturnoTotal(fechaIn, fechaFin,id)
      
      return data

    }


    @HttpCode(200)
    @Post('/guardarunica')
    guardarunica(
     
        @Body() body,
    ){
     
       return this.Preturno.guardarPreguntasUnicas(body.idpreturno,body.preguntas,body.respuestas)
    }


    @HttpCode(200)
    @Post('/personasacargo')
    personasacargo(
     
        @Body() body,
    ){
     
       return this.Preturno.personasAcargo(body.cedula)
    }

}