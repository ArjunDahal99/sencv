import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import ErrorHandler from "../../middleware/error-handeler";

import { UserModel } from "../../models/userModel/user-model";
import { CvTemplateModel } from "../../models/cvTemplateModel/cv-template-model";


export const getTemplate = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
    const userId = res.locals.user;
    const user = await UserModel.findById(userId)
    if (!user) 
    {
        throw new ErrorHandler(false, "Usernot Found", 404)
    }
    const userTemplate = await CvTemplateModel.find({ userId })

    return res.json({ sucess: true, message: "Template Fetched", userTemplate })
})