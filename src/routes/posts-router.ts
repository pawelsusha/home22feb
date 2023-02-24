import { Router } from "express"
export const postsRouter = Router()
import {Request, Response} from 'express'
import { postsRepository } from "../repositories/posts-repository"
import { inputValidationMiddleware, postValidationMiddleware } from "../middlewares/input-valudation-middleware"
import { blogsRepository } from "../repositories/blogs-repository"

export const basicAuth = require('express-basic-auth')
export const adminAuth = basicAuth({users: { 'admin': 'qwerty' }});

//GET - return all
postsRouter.get('/', (req: Request, res: Response) => {
    let newPost = postsRepository.returnAllPost()
    res.status(200).send(newPost)
    return
})
//GET - return by ID
postsRouter.get('/:id', (req: Request, res: Response) => {
    let post = postsRepository.returnPostById(req.params.id)
    if (post){
        res.status(200).send(post)
        return
    } else {
        res.send(404)
        return
    }
})
//DELETE - delete by ID
postsRouter.delete('/:id', adminAuth, (req: Request, res: Response) => {
    let status = postsRepository.deletePostById(req.params.id)
    if (status){
        res.sendStatus(204)
        return
    } else{
        res.sendStatus(404)
        return
    }
})
//POST - create new
postsRouter.post('/', adminAuth, postValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response) => {
    const blog = blogsRepository.returnBlogById(req.body.blogId)
    let newPost = postsRepository.createNewPost(req.body, blog!.name);
    res.status(201).send(newPost)
    return
})
//PUT - update
postsRouter.put('/:id', adminAuth, postValidationMiddleware, inputValidationMiddleware, (req: Request, res: Response) => {
    const status = postsRepository.updatePostById(req.body, req.params.id);
    if (status){
        res.sendStatus(204)
    }
    else {
        res.sendStatus(404)
    }

})