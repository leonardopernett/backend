import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { UserModelService } from "../usuarios/user-model.service";
export declare class ConectarGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private userModel;
    constructor(userModel: UserModelService);
    server: any;
    users: number;
    estado: string;
    handleConnection(): Promise<void>;
    handleDisconnect(): Promise<void>;
}
