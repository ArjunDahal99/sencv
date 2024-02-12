import { Response } from 'express'
import { TokenResponseType } from '../libs/generateTokenLibs/generate-access-&-refresh-token'
import { UserModelType } from '../types/userModelTypes/user-types'

export const sendUserSessionCookie = (user: UserModelType, tokens: TokenResponseType, res: Response, message: string, statuscode = 200) =>
{
    const { accessToken, refreshToken } = tokens
    const options = {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        //sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    }
    res.status(statuscode)

        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ success: true, user, accessToken, refreshToken, message })
}
