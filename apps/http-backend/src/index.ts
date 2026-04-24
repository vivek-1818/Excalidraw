import express from "express"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware.js";
import {CreateUserSchema, SigninSchema, CreateRoomSchema} from "@repo/common/types"
import { prismaClient } from "@repo/db/client"
import bcrypt from "bcrypt"

const app = express();
app.use(express.json())

app.post("/signup", async (req,res)=>{
    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return
    }
    
    try {
        const hashedPass = await bcrypt.hash(parsedData.data.password,10)
        const user = await prismaClient.user.create({
            data:{
                email: parsedData.data?.username,
                password: hashedPass,
                name: parsedData.data?.name
            }
        })  
        res.json({
        userId: user.id
    })  
    } catch (e) {
        res.status(411).json({
            message: "User already exist with this username"
        })
    }
})

app.post("/signin",async (req,res)=>{
    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return
    }

    const user = await prismaClient.user.findFirst({
        where:{
            email: data.data.username
        }
    })

    if(!user){
        res.status(403).json({
            message: "User not Found"
        })
        return
    }

    const isMatch = await bcrypt.compare(
        data.data.password,
        user.password
    )

    const token = jwt.sign({
        userId: user.id
    },JWT_SECRET)
    
    res.json({
        token
    })
})

app.post("/room", middleware, async (req,res)=>{
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if(!parsedData.success){
        res.json({
            message: "Incorrect Inputs"
        })
        return
    }
    try{
        //@ts-ignore
        const userId =  req.userId;
        const room = await prismaClient.room.create({
          data:{
            slug: parsedData.data.name,
            adminId: userId
        }
    })
    
        res.json({
            roomId: room.id
        })    
    }catch(e){
        res.status(411).json({
            message: "Room already exist with this name"
        })
    }
    
})

app.listen(3001)
