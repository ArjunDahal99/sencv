import ErrorHandler from "../../middleware/error-handeler";
import { UserModel } from "../../models/userModel/user-model";
import { asyncHandler } from "../../utils/async-handler";
import { Request, Response, NextFunction } from 'express'


export const logoutUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
    const user = await UserModel.findById(res.locals.user)
    if (!user)
    {
        throw new ErrorHandler(false, "User Found", 400)
    }
    res
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
        .json({ success: true, message: "Logged Out Succesfully " })
}

)