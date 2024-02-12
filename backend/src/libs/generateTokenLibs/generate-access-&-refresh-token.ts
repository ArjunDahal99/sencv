import { UserModel } from "../../models/userModel/user-model"


export interface TokenResponseType
{
    accessToken: string;
    refreshToken: string;
}



export const generateAccessTokenAndRefreshToken = async (userId: string): Promise<null | TokenResponseType> =>
{

    try
    {
        const user = await UserModel.findById(userId);

        if (!user)
        {
            return null
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }


    } catch (error)
    {
        return null
    }
}