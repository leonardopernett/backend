import { Module, Global } from '@nestjs/common';
import { AutorizationGuard } from './autorization.guard';
import { JwtGuard } from "./jwt.guard";
import { RefreshJwtGuard } from "./refreshjwt.guard";
import { UserjwtModelService } from "./userjwt-model.service";

@Global()
@Module({
    providers: [
        JwtGuard,
        RefreshJwtGuard,
        UserjwtModelService,
        AutorizationGuard
    ],
    exports: [
        JwtGuard,
        RefreshJwtGuard,
        UserjwtModelService,
        AutorizationGuard
    ]
})
export class JwtModule {}
