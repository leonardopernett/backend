import { Module } from '@nestjs/common';
import { CommentsController } from "./comments.controller";
import { CommentsModelService } from "./comments-model.service";

@Module({
    controllers: [
        CommentsController
    ],
    providers: [
        CommentsModelService
    ],
    exports: [
        CommentsModelService
    ]
})
export class ComentariosModule {}
 