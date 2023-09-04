import { Controller, Get } from '@nestjs/common';
import { version } from "../frontVersion";
@Controller('api/version')
export class VersionController {

    @Get('/front')
    singleArticle(): any {
        return { version: version.version }
    }
    
}