import { Body, Controller, Get, Post, Param, Delete, Put, Res, UseGuards} from '@nestjs/common';
import { PapeleriaService } from './papeleria.service';
import  { Response } from 'express'
import { User as U } from '../usuarios/entities';
import { User } from '../user.decorator';
import { JwtGuard } from '../jwt/jwt.guard';


@Controller('/api/papeleria')
export class PapeleriaController {

   
  constructor(private readonly papeleriaService:PapeleriaService){
   
  }

    @UseGuards(JwtGuard)
    @Get('/')
    async getAllArticleDelete(@Res() res){
     const articles = await this.papeleriaService.getAllArticledelete();
     return res.json(articles)
    } 

    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    async deleteArticle(@Param('id') id, @Res() res:Response){
        await this.papeleriaService.deleteArticlePermanent(id);
        return res.json({ message:'articulo eliminado permanentemente de nik'})
    }

    
} 

