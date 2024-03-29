import { Schema, model, Model } from "mongoose";
import { UserModelType } from "../../types/userModelTypes/user-types";
import jwt from 'jsonwebtoken'
import env from '../../utils/validate-ENV'

const UserModelSchema: Schema<UserModelType> = new Schema<UserModelType>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    createdAt: { type: Date, default: Date.now },
    emailActivated: { type: Date },
    refreshToken: { type: String },
    role: { type: String, default: 'user', required: true },
});

UserModelSchema.methods.generateAccessToken = function (): string
{
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: env.ACCESS_TOKEN_EXPIRY
        }
    );
};

UserModelSchema.methods.generateRefreshToken = function (): string
{
    return jwt.sign(
        {
            _id: this._id,
        },
        env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const UserModel: Model<UserModelType> = model<UserModelType>('UserTable', UserModelSchema);