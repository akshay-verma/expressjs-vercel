"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.get("/api", (_req, res) => {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
    res.end(`Hello! Shefa`);
});
app.get("/api/item/:slug", (req, res) => {
    const { slug } = req.params;
    res.end(`Item: ${slug}`);
});
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
