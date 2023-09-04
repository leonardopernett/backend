import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, HttpCode, UseInterceptors } from '@nestjs/common';
import { User as U } from "./entities";
import { JwtGuard } from "../jwt/jwt.guard";
import { BaseModelService, postUserPcrcDTO } from "../bases/base-model.service";
import { deleteUserDTO, updateUserRolDTO, UserModelService, createUserDTO } from "./user-model.service";
import { User } from "../user.decorator";
import { UsersesionsModelService, sesionDTO, updateSesionDTO } from "./usersesions-model.service";
import { UserNotificationsModelService, userNotificationDTO } from "../web-sockets/userNotifications-model.service";
import { asignarPerfilDTO, PermisionsModelService } from '../permisos/permisions-model.service'
import { VerifyGuard } from '../auth/verifytoken.guard';
import { doUntil } from 'async';
import { AutorizationGuard } from '../jwt/autorization.guard';

@Controller('api/users')
export class UsersController {

    constructor(
        private userModel: UserModelService,
        private permisionsModel: PermisionsModelService,
        private baseModel: BaseModelService,
        private usersesionsModel: UsersesionsModelService,
        private userNotificationsModel: UserNotificationsModelService,
        ) {  }

        @UseGuards(VerifyGuard)  
    @Get('mis/favoritos')
    getSelfFavorite(
        @User() user: U,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('pcrc') baseId: string,
    ): any {
        return this.userModel.getUserFavorites("1102850901","0",from,size);
    }

    @UseGuards(JwtGuard)
    @Get()
    getUsers(
        @Query('query') query:string,
        @Query('pcrcId') pcrcId:string
    ): any {
        return this.userModel.searchUsers(query, pcrcId);        
    }

    @UseGuards(JwtGuard)
    @Post()
    @HttpCode(200)
    createUser(
        @Body() userDto:createUserDTO,
    ): any {
        return this.userModel.createUser(userDto.nombre, userDto.documento);        
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getSingleUser(
        @Param('id') user_id: string
    ) {
        return await this.userModel.getUserByDocumento(user_id);
    }

    @UseGuards(AutorizationGuard)
    @Get('permisos/:id')
    async getSingleUser2(
        @Param('id') user_id: string
    ) {
        return await this.userModel.getUserByDocumento(user_id);
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    async deleteSingleUser(
        @Param('id') user_id: string
    ) {
        return await this.userModel.deleteUser(user_id);
    }

    @UseGuards(JwtGuard)
    @Put(':id')
    async updateSingleUser(
        @Param('id') user_id: string,
        @Body() body: updateUserRolDTO
    ) {
        return await this.userModel.updateUser(user_id, body.rol);
    }

    // @UseGuards(JwtGuard)
    // @Get('me/likes')
    // getSelfLikes(@User() user: U
    // ): any {
    //     return this.userModel.getUserLikes(user.sub);
    // }

    // @UseGuards(JwtGuard)
    // @Get('me/dislikes')
    // getSelfdisLikes(
    //     @User() user: U
    // ): any {
    //     return this.userModel.getUserDisLikes(user.sub);
    // }

    @UseGuards(JwtGuard)
    @Get('me/favorites')
    getSelfFavorites(
        @User() user: U,
        @Query('from') from: string,
        @Query('size') size: string,
        @Query('pcrc') baseId: string,
    ): any {
        return this.userModel.getUserFavorites(user.sub,baseId,from,size);
    }

      @UseGuards(JwtGuard)
    @Get(':idUser/pcrc')
    getUserPcrc(        
        @Param('idUser') idUser:string
    ): any {
        return this.baseModel.getUserBases(idUser)
    }  

    @UseGuards(AutorizationGuard)
    @Get(':idUser/cliente')
    getUserPcrc2(        
        @Param('idUser') idUser:string
    ): any {
        return this.baseModel.getUserBases(idUser)
    }

    @UseGuards(JwtGuard)
    @HttpCode(200)
    @Post(':userId/pcrc')
    async postUserPcrc(
        @Param('userId') userId:string,
        @Body() body:postUserPcrcDTO,
        @User() user: U
    ){
        return await this.baseModel.postUserBase(userId, body.pcrc, user.sub)
    }

    @UseGuards(JwtGuard)
    @Delete(':user_id/pcrc/:base_id')
    deleteUserPcrc(
        @Param('user_id') idUser:string,
        @Param('base_id') baseId:string,
        @User() user: U
    ): any {
        return this.baseModel.deleteUserBase(idUser, baseId, user.sub)
    }

    @UseGuards(JwtGuard)
    @Post('me/sesion')
    postUserSesion(
        @Body() body:sesionDTO,
        @User() user: U
    ): any {
        return this.usersesionsModel.postUserSesion(user.sub, body)
    }

    @UseGuards(JwtGuard)
    @Put('me/sesion/:id')
    updateUserSesion(
        @Param('id') id:string,
        @User() user: U
    ): any {
        return this.usersesionsModel.udpateUserSesion(id)
    }

    @UseGuards(JwtGuard)
    @Get(':id/sesion')
    getUserSessions(
        @Param('id') id:string,
        @Query('from') from:string,
        @Query('size') size:string,
        @Query('pcrc') pcrc:string,
        @User() user: U
    ): any {
        return this.usersesionsModel.getUserSesions(id)
    }

    @UseGuards(JwtGuard)
    @Post('me/notification')
    postUserNotification(
        @Body() body:userNotificationDTO,
        @User() user: U
    ): any {
        return this.userNotificationsModel.postUserNotification(body.id, user.sub)
    }

    @UseGuards(JwtGuard)
    @Get('me/notification')
    getUserNotification(
        @Query('pcrc') pcrc:string,
        @User() user: U
    ): any {
        return this.userNotificationsModel.getUserNotifications(user.sub, pcrc)
    }

    @UseGuards(JwtGuard)
    @Delete('me/notification/:id')
    deleteUserNotification(        
        @Param('id') id:string,
        @User() user: U
    ): any {
        return this.userNotificationsModel.deleteUserNotification(id, user.sub)
    }

    // @UseGuards(JwtGuard)
    // @Delete('me/notification')
    // deleteAllUserNotification(
    //     @Query('pcrc') pcrc:string,
    //     @User() user: U
    // ): any {
    //     return this.userNotificationsModel.deleteAllUserNotification(user.sub, pcrc)
    // }

    @UseGuards(JwtGuard)
    @Get('/base/:documento')
    async getUserBase( @Param('documento') documento){
        return  await this.userModel.getUserBase(documento) 
    }
}