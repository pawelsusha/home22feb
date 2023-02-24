"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogs_router_1 = require("./routes/blogs-router");
const posts_router_1 = require("./routes/posts-router");
const posts_repository_1 = require("./repositories/posts-repository");
const blogs_repository_1 = require("./repositories/blogs-repository");
const app = (0, express_1.default)();
const port = 3000;
//app.use(bodyParser)
app.use('/blogs', blogs_router_1.blogsRouter);
app.use('/posts', posts_router_1.postsRouter);
//DELETE ALL DATA
app.delete('/testing/all-data', (req, res) => {
    posts_repository_1.postsRepository.deleteAllData();
    blogs_repository_1.blogsRepository.deleteAllData();
    res.sendStatus(204);
    return;
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
