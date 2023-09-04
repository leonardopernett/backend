import { SubscribeMessage, WebSocketGateway, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { Socket } from "socket.io";
import { BaseModelService } from "../bases/base-model.service";
import { NotificationsModelService } from "./notifications-model.service";
import { UsersesionsModelService } from "../usuarios/usersesions-model.service";
import * as R from 'remeda';

@WebSocketGateway({ namespace: 'articles' })
export class NotificationsGateway  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{

  constructor(
    private notificationsModel:NotificationsModelService,
    private usersesionsModel:UsersesionsModelService,
  ){  }

  afterInit(server: any) {
  }

  async handleConnection(socket: Socket, ...args: any[]) {
  }
  
  handleDisconnect(client: any) {
  }
  
  @SubscribeMessage('subcribe')
  async subcribeToRoom(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket
    ) {
      
    let rooms = Object.keys(socket.rooms)

    if(rooms.length > 1){
      socket.leave(rooms[0])
      socket.leave(rooms[0]+'/'+socket.handshake.query.cedula)
    }

    socket.join(data)
    socket.join(data+'/'+socket.handshake.query.cedula)
    socket.join(socket.handshake.query.cedula)

    let [lastConnection] = await this.usersesionsModel.getUserSesions(socket.handshake.query.cedula)

    if(lastConnection){
      
      let result = await Promise.all([
       this.notificationsModel.getNotificationsByDate(parseInt(lastConnection.logout), (new Date()).getTime(), data),
       this.notificationsModel.getNotificationsByDate(parseInt(lastConnection.logout), (new Date()).getTime(), data+'/'+socket.handshake.query.cedula)
      ])      

      return R.flatten(result)

    }else{
      return [];
    }

  }

  @SubscribeMessage('newarticle')
  async newArticle(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket
  ) {

    let rooms = Object.keys(socket.rooms)

    let notificationRegister = await this.notificationsModel.registerNotification('newarticle', rooms[0], data )

    if(rooms.length > 1){
      socket.in(rooms[0]).emit('newarticle', notificationRegister)
    }
  }

  @SubscribeMessage('articleUpdate')
  async articleUpdate(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket
  ) {

    let rooms = Object.keys(socket.rooms)

    let notificationRegister = await this.notificationsModel.registerNotification('articleUpdate', rooms[0], data)

    if(rooms.length > 1){
      socket.in(rooms[0]).emit('articleUpdate',notificationRegister)
    }
  }

  @SubscribeMessage('nuevanoticia')
  async nuevanoticia(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket
  ) {

    let rooms = Object.keys(socket.rooms)

    let notificationRegister = await this.notificationsModel.registerNotification('nuevanoticia',  rooms[0], data)

    if(rooms.length > 1){
      socket.in(rooms[0]).emit('nuevanoticia',notificationRegister)
    }
  }

  @SubscribeMessage('newComment')
  async newComment(
    @MessageBody() data: string,
    @ConnectedSocket() socket: Socket
  ) {

    let rooms = Object.keys(socket.rooms)

    let notificationRegister = await this.notificationsModel.registerNotification('newComment', rooms[0]+'/'+socket.handshake.query.cedula, data)

    if(rooms.length > 1){
      socket.in(rooms[0]+'/'+socket.handshake.query.cedula).emit('newComment',notificationRegister)
    }
  }
}