import { NextFunction } from "express";
import { Response, Request } from "express";
import { CustomValidator } from "express-validator/src/base";
import { blogs, blogsRepository } from "../repositories/blogs-repository";
import { posts, postsRepository } from "../repositories/posts-repository";
import { body, validationResult } from 'express-validator';
export  const findByIdBlogs : CustomValidator = value => {
    let blog = blogsRepository.returnBlogById(value)
    if (!blog){
        throw new Error('Invalid blogId')
    }
    return true
};
export const inputValidationMiddleware  = (req: Request,
                                           res: Response,
                                           next: NextFunction) => {
    const error = validationResult(req)
    if (error.isEmpty()) {
        next()
    }else {
        res.status(400).send({
            errorsMessages: error.array({onlyFirstError: true}).map(e => {
                return {
                    message: e.msg,
                    field: e.param
                }
            })
        })
    }
}


export const nameCheck = body("name").trim().isLength({min: 1, max: 15}).isString();
export const descriptionCheck = body("description").trim().isLength({min: 1, max: 500}).isString();
export const websiteUrlCheck = body("websiteUrl").trim().isLength({min: 1, max: 100}).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString()

export const titleCheck = body("title").trim().isLength({min:1, max: 30}).isString()
export const shortDescriptionCheck = body("shortDescription").trim().isLength({min:1,max:100}).isString()
export const contentCheck = body("content").trim().isLength({min:1, max: 1000}).isString()
export const blogIdCheck = body("blogId").trim().custom(findByIdBlogs).isString()


export const postValidationMiddleware = [
    body("title").trim().isLength({min:1, max: 30}).isString(),
    body("shortDescription").trim().isLength({min:1,max:100}).isString(),
    body("content").trim().isLength({min:1, max: 1000}).isString(),
    body("blogId").trim().custom(findByIdBlogs).isString()
];
export const blogValidationMiddleware = [
    body("name").trim().isLength({min: 1, max: 15}).isString(),
    body("description").trim().isLength({min: 1, max: 500}).isString(),
    body("websiteUrl").trim().isLength({min: 1, max: 100}).matches(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/).isString(),
];
