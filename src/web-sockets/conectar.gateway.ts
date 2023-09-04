import { SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { UserModelService} from "../usuarios/user-model.service";
// var elasticsearch=require('elasticsearch');

@WebSocketGateway()
export class ConectarGateway  implements  OnGatewayConnection, OnGatewayDisconnect{

  constructor(private userModel:UserModelService){  }

  @WebSocketServer() server;
  users:number=0;
  estado:string;

  async handleConnection() {
 
      // A client has connected
      this.users++;
      this.estado='Conectado';

  }
  
  async handleDisconnect() {

        this.users--;
        this.estado='Desconectado';

  }

  
     
  }

