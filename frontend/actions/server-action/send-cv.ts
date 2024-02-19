"use server"
import nodemailer from "nodemailer";

export interface Emailoptions
{
    to: string;
    subject: string;
    body: string;
    filePath?: string;
    fileName?: string;
}

export const sendCV = async (options: Emailoptions): Promise<void> =>
{
    console.log(options);
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: "dahalarjun409@gmail.com",
            pass: "xafbbasoqenxxqye",
        },
    });

    const { body, to, filePath, subject, fileName } = options;

    const mailoptions: any = {
        from: "dahalarjun409@gmail.com",
        to,
        subject,
        html: `<body>${body.replace(/\n/g, '<br>')}</body>`
    };

    // Conditionally add attachment if filePath is provided
    if (filePath && fileName)
    {
        mailoptions.attachments = [{
            filename: fileName,
            path: filePath
        }];
    }

    console.log(mailoptions);

    try
    {
        const testResult = await transport.verify();
        console.log(testResult);
    } catch (error)
    {
        console.log(error);
    }

    try
    {
        const sendResult = await transport.sendMail(mailoptions as nodemailer.SendMailOptions); // Type assertion here
        console.log(sendResult);
    } catch (error)
    {
        console.log(error);
    }
};
