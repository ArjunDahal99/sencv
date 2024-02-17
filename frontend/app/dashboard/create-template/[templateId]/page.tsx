"use client"

import { redirect, useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CvInput from './components/cv-input'
import CvPreview from './components/cv-preview'
import { getOneTemplateWithHeaders } from '@/actions/template/tempate-action'
import { useCVTemplateStore } from '@/store/cv-template-store'



const Template = () =>
{
    const { templateId } = useParams()
    const { setField } = useCVTemplateStore();
    const [template, setTemplate] = useState()

    if (templateId !== 'new') useEffect(() =>
    {
        async function fetchData()
        {
            const templateData = await getOneTemplateWithHeaders(templateId)
            setTemplate(templateData)
            setField({
                body: templateData.userTemplate.body,
                subject: templateData.userTemplate.subject,
                fileName: templateData.userTemplate.fileName,
                filePath: templateData.userTemplate.fileUrl,
            });
        }

        fetchData();
    }, [])


    return (
        <>
            {<div className=" max-md:pt-[60vh] max-md:p-10 lg:flex-wrap max-md:space-y-10  lg:space-x-10   lg:space-y-4  max-md:flex-col    flex justify-center max-md:items-center  lg:pt-[6vh]  w-full  h-[110vh] ">
                <CvInput />
                <CvPreview />
            </div>}


        </>

    )
}

export default Template