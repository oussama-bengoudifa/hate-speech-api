"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.enableCors();
    const options = new swagger_1.DocumentBuilder()
        .setTitle("KEY LOGGER API")
        .setDescription("KEY LOGGER API DESCRIPTION")
        .setVersion("1.0")
        .addTag("API")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("", app, document);
    await app.listen(configService.get("PORT") || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map