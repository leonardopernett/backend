import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class VerifyGuard implements CanActivate {
    constructor();
    generarcabacera(payload: any): void;
    canActivate(context: ExecutionContext): boolean;
}
