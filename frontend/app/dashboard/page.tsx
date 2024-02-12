"use client"

import { redirect } from 'next/navigation'
import React from 'react'
import CvInput from './components/cv-input'
import CvPreview from './components/cv-preview'

const DashBoard = () =>
{


    return (
        <div className=" px-[10vw] max-md:pt-[60vh] max-md:space-y-10   max-md:flex-col   space-x-4  flex justify-center items-center  w-full  h-[110vh] ">
            <CvInput />
            <CvPreview />

        </div>
    )
}

export default DashBoard