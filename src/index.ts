import express, {Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import { blogsRouter } from './routes/blogs-router';
import { postsRouter } from './routes/posts-router';
import { postsRepository } from './repositories/posts-repository';
import { blogsRepository } from './repositories/blogs-repository';

const app = express();
const port = 3000;

//app.use(bodyParser)

app.use('/blogs', blogsRouter)
app.use('/posts', postsRouter)

//DELETE ALL DATA
app.delete('/testing/all-data', (req: Request,res: Response) => {
    postsRepository.deleteAllData();
    blogsRepository.deleteAllData();
    res.sendStatus(204)
    return
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

