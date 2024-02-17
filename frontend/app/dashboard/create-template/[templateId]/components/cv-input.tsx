import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { sendCV } from '@/actions/server-action/send-cv';
import { UploadDropzone } from '@/utils/uploadthing';
import { useCVTemplateStore } from '@/store/cv-template-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import LoadingSpinner from '@/components/spinner';
import { createTemplate } from '@/actions/template/tempate-action';
import { useParams } from 'next/navigation';

const CvInput = () =>
{
    const { templateId } = useParams()
    const [isLoading, setIsLoading] = useState(false);
    const { subject, body, fileName, filePath, setField, email } = useCVTemplateStore();


    //chnaging the globalState
    const handleInputChange = (field: keyof typeof useCVTemplateStore.prototype) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        setField({ [field]: e.target.value });
    };

    const onSubmit = async (e: any) =>
    {
        e.preventDefault()
        if (fileName && filePath)
        {
            setIsLoading(true);
            try
            {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                sendCV({ body, subject, to: email, filePath, fileName });
                setIsLoading(false);
                toast.success("Email Sent")
            } catch (error)
            {
                console.error('Error sending CV:', error);
                setIsLoading(false);
            }
        }
    };

    const saveTemplate = async () =>
    {
        const data = { subject, body, fileName, fileUrl: filePath, setField, email, templateId }

        setIsLoading(true)
        const response = await createTemplate(data)
        console.log(response)
        setIsLoading(false)


    }

    return (
        <div className=" lg:w-[500px] max-md:w-full">
            <form onSubmit={(e) => onSubmit(e)} className="space-y-4">
                <div>
                    <Label> To</Label>
                    <Input disabled={isLoading} type="email" placeholder="Enter your Email" value={email} onChange={handleInputChange('email')} />
                </div>
                <div >
                    <Label> Subject</Label>
                    <Input disabled={isLoading} placeholder="Title" value={subject} onChange={handleInputChange('subject')} />
                </div>
                <div>
                    <Label>Body</Label>
                    <Textarea rows={5} disabled={isLoading} placeholder="Body" value={body} onChange={handleInputChange('body')} />
                </div>
                <Label> Attachment</Label>

                <UploadDropzone
                    appearance={{
                        button({ ready, isUploading, uploadProgress })
                        {
                            return ` ${ready ? "text-xl m-4 p-4 bg-white text-black" : '  w-8 h-8 bg-blue-500 animate-pulse'} 
                            ${uploadProgress ? 'rounded-full h-20 w-20 bg-violet-800 animate-ping' : ""}  
                            `;
                        },

                    }}

                    className="text-lg h-[250px] mx-auto  bg-secondary-foregroundy rounded-lg "
                    endpoint="imageUploader"
                    onClientUploadComplete={(res: any) =>
                    {
                        setField({ fileName: res[0].name, filePath: res[0].url });
                    }}
                    onUploadError={(error: Error) =>
                    {
                        alert(`ERROR! ${error.message}`);
                    }}
                    onUploadBegin={(name: any) =>
                    {
                        // Do something once upload begins
                        console.log("Uploading: ", name);
                    }}
                />

                <Button disabled={isLoading} className="w-full" variant={'outline'} type="submit">
                    {isLoading ? 'Sending...' : 'Send CV'}
                </Button>

            </form>
            <Button onClick={saveTemplate} disabled={isLoading} className="w-full" variant={'outline'}>
                {isLoading ? 'Saving...' : 'Save TemplateCV'}
            </Button>

        </div>
    );
};

export default CvInput;
