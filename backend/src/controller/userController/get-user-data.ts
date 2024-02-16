import { NextFunction, Response, Request } from "express";
import { asyncHandler } from "../../utils/async-handler";
import { UserModel } from "../../models/userModel/user-model";
import ErrorHandler from "../../middleware/error-handeler";

export const getUserData = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{

    const userId = res.locals.user;

    const user = await UserModel.findById(userId)
    if (!user)
    {
        throw new ErrorHandler(false, 'User not Found', 400);
    }

    res.status(200).json({ success: true, message: "Got User Data", user })

})