import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState, useEffect } from 'react'
import { useCVTemplateStore } from '@/store/cv-template-store';
import { XIcon } from 'lucide-react';
import { sendCV } from '@/actions/server-action/send-cv';
import LoadingSpinner from '@/components/spinner';
import { toast } from 'sonner';

const CvSendContainer = () =>
{
    const { email, addEmail, deleteEmail, subject, body, fileName, filePath } = useCVTemplateStore();
    const [inputEmail, setInputEmail] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [emailColors, setEmailColors] = useState<string[]>([]);
    const defaultColors = [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 69, 0, 0.2)",
        "rgba(124, 252, 0, 0.2)",
        "rgba(255, 140, 0, 0.2)",
        "rgba(255, 215, 0, 0.2)",
        "rgba(238, 130, 238, 0.2)",
        "rgba(127, 255, 212, 0.2)",
        "rgba(0, 128, 128, 0.2)",
        "rgba(0, 255, 255, 0.2)",
        "rgba(176, 196, 222, 0.2)",
        "rgba(70, 130, 180, 0.2)",
        "rgba(255, 228, 196, 0.2)",
        "rgba(210, 180, 140, 0.2)",
        "rgba(139, 69, 19, 0.2)",
        "rgba(255, 165, 0, 0.2)",
    ];

    useEffect(() =>
    {
        if (email)
        {
            const initialEmailColors = email.map((_, i) => emailColors[i % emailColors.length]);
            setEmailColors(initialEmailColors);
        }
    }, [email]);

    const handleAddEmail = (e: React.FormEvent) =>
    {
        try
        {
            e.preventDefault()
            addEmail(inputEmail!)
            setInputEmail('')
            const nextColorIndex = email.length % defaultColors.length;
            setEmailColors([...emailColors, defaultColors[nextColorIndex]]);
        } catch (error)
        {
            console.log(error)
        }
    }

    const handleDeleteEmail = (deletedEmail: string) =>
    {
        deleteEmail(deletedEmail);
        setEmailColors(emailColors.filter((_, index) => email[index] !== deletedEmail));
    }

    const sendCv = async () =>
    {
        try
        {
            setIsLoading(true);
            alert(isLoading);
            await Promise.all(email.map(async (e) =>
            {
                await sendCV({ body, subject, to: e, filePath, fileName });
            }));
            toast.success("Email Sent")
        } catch (error)
        {
            console.log(error);
        } finally
        {
            setIsLoading(false);
        }
    }

    return (
        <div className="lg:w-[900px] max-md:w-full flex flex-col ">
            <form onSubmit={(e) => handleAddEmail(e)} className="flex space-x-2">
                <Input onChange={(e) => { setInputEmail(e.target.value) }} value={inputEmail} type='text' required />
                <Button type='submit' className='px-10'>Add</Button>
            </form>
            <div className="flex flex-wrap  justify-start  items-center py-5 w-full ">
                {email && email.map((e, i) => (
                    <div key={i} style={{ backgroundColor: emailColors[i] }} className="flex p-2  h-[30px] w-[250px] rounded-full items-center gap-y-1  justify-between">
                        <h1>{e}</h1>
                        {isLoading
                            ?
                            <LoadingSpinner />
                            :
                            <XIcon onClick={() => handleDeleteEmail(e)} className='  hover:text-red-500 cursor-pointer rounded-full ' size={16} />
                        }
                    </div>
                ))}
            </div>
            <Button onClick={sendCv} disabled={isLoading} variant={'outline'} > SenCv</Button>
        </div>
    )
}

export default CvSendContainer;
