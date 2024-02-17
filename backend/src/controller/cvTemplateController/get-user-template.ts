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


export const getTemplateByID = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
    const userId = res.locals.user;
    console.log(userId);
    console.log(req.body);

    const { templateId } = req.body;

    if (!templateId)
    {
        throw new ErrorHandler(false, "Template ID is required", 400);
    }

    const user = await UserModel.findById(userId);
    if (!user)
    {
        throw new ErrorHandler(false, "User not found", 404);
    }

    const userTemplate = await CvTemplateModel.findById(templateId);
    if (!userTemplate)
    {
        throw new ErrorHandler(false, "Template not found", 404);
    }

    return res.json({ success: true, message: "Template Fetched", userTemplate });
});