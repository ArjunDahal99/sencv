import { Document, Schema } from "mongoose";

export interface CvTemplateModelType extends Document
{
    body: string;
    subject: string;
    email: string[];
    userId: Schema.Types.ObjectId;
    fileName: string
    fileUrl: string
}
