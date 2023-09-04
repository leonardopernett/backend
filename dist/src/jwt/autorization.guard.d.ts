import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DbService } from '../databases/db.service';
export declare class AutorizationGuard implements CanActivate {
    private db;
    constructor(db: DbService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
