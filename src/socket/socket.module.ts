import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';

@Module({
    providers: [
      SocketGateway
    ],

    imports: [],
    exports:[ SocketGateway ]

})
export class SocketModule {}
