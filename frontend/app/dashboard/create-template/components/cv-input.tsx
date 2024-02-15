import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { sendCV } from '@/actions/server-action/send-cv';
import { UploadButton } from '@/utils/uploadthing';
import { useCVTemplateStore } from '@/store/cv-template-store';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const CvInput = () =>
{
    const [isLoading, setIsLoading] = useState(false);
    const { subject, body, fileName, filePath, setField, email } = useCVTemplateStore();

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
                    <Textarea rows={9} disabled={isLoading} placeholder="Body" value={body} onChange={handleInputChange('body')} />
                </div>
                <div className="">
                    <Label> Attachment</Label>
                    <UploadButton
                        className="w-[200px] mx-auto border-2 border-secondary rounded-lg p-6"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) =>
                        {
                            setField({ fileName: res[0].name, filePath: res[0].url });
                        }}
                        onUploadError={(error: Error) =>
                        {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />

                </div>
                <Button disabled={isLoading} className="w-full" variant={'outline'} type="submit">
                    {isLoading ? 'Sending...' : 'Send CV'}
                </Button>
            </form>


        </div>
    );
};

export default CvInput;
