import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import ErrorHandler from "../../middleware/error-handeler";

import { UserModel } from "../../models/userModel/user-model";
import { CvTemplateModel } from "../../models/cvTemplateModel/cv-template-model";


export const deleteTemplate = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
    const userId = res.locals.user;
    const { templateId } = req.params;
    console.log(templateId)

    const user = await UserModel.findById(userId)
    if (!user) 
    {
        throw new ErrorHandler(false, "Usernot Found", 404)
    }

    const templateAlreadyExist = await CvTemplateModel.findById(templateId)
    if (!templateAlreadyExist)
    {
        throw new ErrorHandler(false, "Tempalte Not Found", 404)
    }
    const delteTemplate = await CvTemplateModel.deleteOne({ _id: templateId })

    return res.json({ sucess: true, message: "Template Deleted" })
})