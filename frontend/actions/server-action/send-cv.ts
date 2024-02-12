"use server"


import nodemailer from "nodemailer";


export interface Emailoptions
{
    to: string;
    subject: string;
    body: string;
    filePath?: string
    fileName: string
}

export const sendCV = async (options: Emailoptions): Promise<void> =>
{

    console.log(options)
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: "dahalarjun409@gmail.com",
            pass: "xafbbasoqenxxqye",
        },
    });

    const { body, to, filePath, subject, fileName } = options;

    const mailoptions = {
        from: "dahalarjun409@gmail.com",
        to,
        subject,
        html: `<body>${body.replace(/\n/g, '<br>')}</body>`,
        attachments: [
            {
                filename: fileName,
                path: filePath
            }]
    };

    console.log(mailoptions)

    try
    {
        const testResutl = await transport.verify()
        console.log(testResutl)

    } catch (error)
    {
        console.log(error)
    }

    try
    {

        const sendResult = await transport.sendMail(mailoptions)
        console.log(sendResult)
    } catch (error)
    {
        console.log(error)
    }
}
