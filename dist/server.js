"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const typeorm_1 = require("typeorm");
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const ormconfig_1 = __importDefault(require("./database/ormconfig"));
exports.db = new typeorm_1.DataSource(ormconfig_1.default);
let PORT;
if (process.env.NODE_ENV !== 'test') {
    PORT = process.env.PORT || 8888;
}
const app = (0, app_1.default)();
app.listen(PORT, () => {
    exports.db.initialize()
        .then(() => {
        console.log('Data Source has been initialized!');
    })
        .catch((err) => {
        console.error('Error during Data Source initialization:', err);
    });
    return console.log(`Server is running on port: ${PORT}`);
});
