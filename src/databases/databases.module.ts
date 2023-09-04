import { Module, Global } from '@nestjs/common';
import { DbService } from "./db.service";

@Global()
@Module({
    controllers: [],
    imports: [],
    providers: [
        DbService
    ], 
    exports: [
        DbService
    ]
})
export class DatabasesModule {}
   