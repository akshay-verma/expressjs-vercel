"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
if (process.env.NODE_ENV !== "production")
    app.use((0, morgan_1.default)("dev"));
app.get("/", (_req, res) => {
    res.send("Hello world!");
});
app.get("/api", (_req, res) => {
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.send(`Hello! Shefa`);
});
app.get("/api/item/:slug", (req, res) => {
    const { slug } = req.params;
    res.send(`Item: ${slug}`);
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
