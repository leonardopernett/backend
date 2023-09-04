"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
exports.User = common_1.createParamDecorator((data, req) => {
    var _a;
    if (req.args) {
        if ((_a = req.args[0]) === null || _a === void 0 ? void 0 : _a.user) {
            return req.args[0].user;
        }
    }
    if (req.user) {
        return req.user;
    }
});
//# sourceMappingURL=user.decorator.js.map