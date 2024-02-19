"use client"
import { getTemplateWithHeaders } from '@/actions/template/tempate-action';
import { CardContainers } from './components/card-container';
import { CvTemplateType } from '@/types/TemplateTypes';
import { useEffect, useState } from 'react';
const Client = ({ token }: { token: string | any }) =>
{
    const [template, setTemplate] = useState<any>()
    useEffect(() =>
    {
        const getUserTemplate = async () =>
        {
            const data = await getTemplateWithHeaders(token?.value)
            console.log(data)
            setTemplate(data)
        }
        getUserTemplate()
    }, [])
    return (
        <>
            {template &&
                <div className=' flex  flex-wrap justify-start gap-x-6  max-md:justify-center  gap-y-6 items-start p-6 '>
                    <CardContainers data={null} />
                    {template?.userTemplate?.map((t: CvTemplateType) => (
                        <CardContainers data={t} key={t._id} />
                    ))}
                </div>}
        </>
    )
}

export default Client