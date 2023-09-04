import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserModelService } from "../usuarios/user-model.service";
import { DbService } from "../databases/db.service";
import { BaseModelService } from '../bases/base-model.service';
export declare class ActiveDirectoryGuard implements CanActivate {
    private userModel;
    private db;
    private baseModel;
    constructor(userModel: UserModelService, db: DbService, baseModel: BaseModelService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
