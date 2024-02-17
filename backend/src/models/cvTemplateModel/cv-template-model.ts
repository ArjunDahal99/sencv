import { Schema, model, Model } from "mongoose";
import { CvTemplateModelType } from "../../types/cvTemplateModelTypes/cv-template-types";

const CvTemplateModelSchema: Schema<CvTemplateModelType> = new Schema<CvTemplateModelType>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    body: { type: String, required: true },
    email: { type: [String] },
    subject: { type: String },
    fileName: { type: String },
    fileUrl: { type: String }
}, { timestamps: true });

export const CvTemplateModel: Model<CvTemplateModelType> = model<CvTemplateModelType>('CvTemplateTable', CvTemplateModelSchema);
