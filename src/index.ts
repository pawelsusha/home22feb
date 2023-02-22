import express, {NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser'


const app = express()
const port = 3000
const parserMiddleware = bodyParser({});
app.use(parserMiddleware)

app.get('/', (req:Request, res: Response) => {
    res.send('Blog Platform 22Feb2023/1245')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
    //дывлыдвлдылвдылвдылвдлдывл
export { NextFunction };

