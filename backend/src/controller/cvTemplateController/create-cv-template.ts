import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../utils/async-handler";
import ErrorHandler from "../../middleware/error-handeler";

import { UserModel } from "../../models/userModel/user-model";
import { CvTemplateModel } from "../../models/cvTemplateModel/cv-template-model";

export const createTemplate = asyncHandler(async (req: Request, res: Response, next: NextFunction) =>
{
    const userId = res.locals.user;
    console.log(req.body)
    const { body, subject, email, fileName, fileUrl, templateId } = req.body;
    const user = await UserModel.findById(userId)
    if (!user)
    {
        throw new ErrorHandler(false, "User not Found", 404)
    }

    if (templateId && templateId !== "new")
    {
        const templateAlreadyExist = await CvTemplateModel.findById(templateId)
        if (templateAlreadyExist)
        {
            templateAlreadyExist.set({
                userId,
                body,
                subject,
                email,
                fileName,
                fileUrl
            })
            await templateAlreadyExist.save()
            console.log(templateAlreadyExist)
            return res.json({ success: true, message: "Template Updated" })
        }
    }

    const createCvTemplate = await CvTemplateModel.create({
        userId,
        body,
        subject,
        email,
        fileName,
        fileUrl
    })

    return res.json({ success: true, message: "Template Created" })
})
