"use client"

import { redirect, useParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CvInput from './components/cv-input'
import CvPreview from './components/cv-preview'
import { getOneTemplateWithHeaders } from '@/actions/template/tempate-action'
import { useCVTemplateStore } from '@/store/cv-template-store'
import CvSendContainer from './components/cv-send'



const Template = () =>
{
    const { templateId } = useParams()
    const { setField } = useCVTemplateStore();

    if (templateId !== 'new') 
    {
        useEffect(() =>
        {
            async function fetchData()
            {
                const templateData = await getOneTemplateWithHeaders(templateId)

                setField({
                    body: templateData.userTemplate.body,
                    subject: templateData.userTemplate.subject,
                    fileName: templateData.userTemplate.fileName,
                    filePath: templateData.userTemplate.fileUrl,
                });
            }

            fetchData();
        }, [])
    }

    return (
        <>
            <div className=" flex flex-col w-full h-[150vh]">

                <div className=" max-md:pt-[30vh] max-md:p-4 flex  flex-col items-center">
                    <div className=" lg:flex-wrap max-md:space-y-10  lg:space-x-10   lg:space-y-4  max-md:flex-col    flex justify-center max-md:items-center  lg:pt-[6vh]  w-full  h-[110vh] ">
                        <CvInput />
                        <CvPreview />
                    </div>
                    <h1 className=' text-4xl'>Send Email</h1>
                    <CvSendContainer />
                </div>



            </div>

        </>

    )
}

export default Template