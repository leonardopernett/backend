"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
class helper {
    combine(obj, obj2) {
        return { ...obj2, ...obj };
    }
    async asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}
exports.help = new helper();
//# sourceMappingURL=helper.js.map