"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUserId = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentUserId = (0, common_1.createParamDecorator)((_data, context) => {
    var _a;
    const request = context.switchToHttp().getRequest();
    return (_a = request.user) === null || _a === void 0 ? void 0 : _a.userId;
});
//# sourceMappingURL=current-user-id.decorator.js.map