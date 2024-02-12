import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/userModel/user-model";
import bcrypt from 'bcryptjs';
import { generateVerificationToken } from "../../libs/generateTokenLibs/generate-activation-token";
import { loginFormSchema } from "../../zodschema/authSchema/login-schema";
import { sendUserSessionCookie } from "../../utils/send-cookie";
import ErrorHandler from "../../middleware/error-handeler";
import { sendEmail } from "../../libs/sendMailLibs/send-email";
import { asyncHandler } from "../../utils/async-handler";
import { generateAccessTokenAndRefreshToken } from "../../libs/generateTokenLibs/generate-access-&-refresh-token";


export const loginToAccount = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) =>
    {
        const { email, password } = req.body;
        //zod verification of the data
        loginFormSchema.parse(req.body);

        //checking if there exists an email
        const user = await UserModel.findOne({ email });

        if (!user)
        {
            return next(new ErrorHandler(false, "Email Not Registered", 400));
        }

        //checking if the password is correct or not
        const isPasswordMatch = await user.isPasswordCorrect(password)

        if (!isPasswordMatch)
        {
            return next(new ErrorHandler(false, "Incorrect Password", 400));
        }

        //checking if the email is verified or not 
        if (!user.emailActivated)
        {
            const activationToken = await generateVerificationToken(email);
            sendEmail({ email, subject: "Activate Your Account !!", templateName: "activationMail.ejs", data: { activationToken, email } });
            return res.status(403).json({ success: false, message: "Account Not Activated Please Check Inbox" });
        }

        const tokens = await generateAccessTokenAndRefreshToken(user._id)
        if (!tokens)
        {
            return next(new ErrorHandler(false, "Could Not Generate Tokens", 400));
        }

        // it will send the cookie to the user in response
        sendUserSessionCookie(user, tokens, res, `Welcome back, ${user.username}`, 200);
    }
)