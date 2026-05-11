import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../../../packages/backend-common/dist/index.js";

export function middleware(req:Request, res:Response, next:NextFunction){
    const token = req.headers["authorization"] ?? "";

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        if(decoded && typeof decoded !== "string"){
        //@ts-ignore
            req.userId = decoded.userId;
            next();
            return;
        }
    } catch {
        // fall through to unauthorized response
    }

    res.status(403).json({
        message: "Unauthorized"
    })
}
