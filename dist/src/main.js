"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const path_1 = require("path");
dotenv.config({ path: path_1.resolve('.env') });
const compression = require("compression");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const default_page_filter_1 = require("./filters/default-page.filter");
const common_1 = require("@nestjs/common");
const body_parser_1 = require("body-parser");
async function bootstrap() {
    const logger = new common_1.Logger();
    var app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(body_parser_1.json({ limit: '50mb' }));
    app.use(compression());
    app.use(cookieParser());
    app.enableCors();
    app.useStaticAssets(path_1.join(__dirname, '..', 'public'));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.useGlobalFilters(new default_page_filter_1.DefaultPageFilter());
    await app.listen(process.env.PORT);
    logger.log('Server listen on port 3001 👀');
}
bootstrap();
//# sourceMappingURL=main.js.map