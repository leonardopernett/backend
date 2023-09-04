import { Body, Controller, Get, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { User as U } from '../usuarios/entities';
import { JwtGuard } from "../jwt/jwt.guard";
import { newSearchDTO, SearchModelService } from "./search-model.service";
import { User } from '../user.decorator';


@Controller('api')
export class searchController {

    // constructor(private searchModel:SearchModelService) {}

    // @UseGuards(JwtGuard)
    // @Get('suggestions')
    // getSuggestions(
    //     @Query('input') input:string,
    //     @Query('subline') subline:string){

    //     if(subline && input){
    //         return this.searchModel.getSuggestions(input, subline);
    //     }else if (subline) {
    //         return this.searchModel.getBySubline(subline);
    //     }else{
    //         return this.searchModel.getAll();
    //     }
    // }

    // @UseGuards(JwtGuard)
    // @Post('search')
    // newSearch(
    //     @Body() body:newSearchDTO,        
    //     @User() user: U
    // ){
    //     this.searchModel.newSearch(body.query, body.subline, user.sub)
    // }
}