"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = __importDefault(require("./routes/user"));
const notes_1 = __importDefault(require("./routes/notes"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// middleware
app.use('/api/notes', notes_1.default);
app.use('/api/user', user_1.default);
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`helloworld, listening on port ${PORT}`);
    });
}).catch(err => console.log('@@err', err));
