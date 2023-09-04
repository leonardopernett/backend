import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserjwtModelService } from "./userjwt-model.service";
export declare class RefreshJwtGuard implements CanActivate {
    private userjwtModel;
    constructor(userjwtModel: UserjwtModelService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
