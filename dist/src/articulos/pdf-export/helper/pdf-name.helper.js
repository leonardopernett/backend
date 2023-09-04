"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfName = void 0;
exports.pdfName = (articleName) => {
    articleName = articleName.replace(/[^a-z0-9]/gi, '');
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let day = currentDate.getDate();
    let downladedTime = `${year}-${month}-${day}`;
    let result = `${articleName}-${downladedTime}`;
    return result;
};
//# sourceMappingURL=pdf-name.helper.js.map