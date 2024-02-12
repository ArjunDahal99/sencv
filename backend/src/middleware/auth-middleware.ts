import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import ErrorHandler from "./error-handeler";
import jwt from 'jsonwebtoken'
import env from '../utils/validate-ENV'
import { UserModel } from "../models/userModel/user-model";
export const authenticateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
    console.log("fdsfdssdf")
    // here to support mobile 
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "")
    if (!token)
    {
        throw new ErrorHandler(false, "Token Not Valid", 400)
    }
    const decodedToken = jwt.verify(token, env.ACCESS_TOKEN_SECRET)
    //@ts-ignore
    const user = await UserModel.findById(decodedToken._id)
    if (!user)
    {
        throw new ErrorHandler(false, "User Found", 400)
    }
    res.locals.user = user._id
    next()

}

)