"use client"

import { redirect } from 'next/navigation'
import React from 'react'
import CvInput from './components/cv-input'
import CvPreview from './components/cv-preview'

const DashBoard = () =>
{


    return (
        <div className=" max-md:pt-[60vh] max-md:p-10 lg:flex-wrap max-md:space-y-10  lg:space-x-10   lg:space-y-4  max-md:flex-col    flex justify-center max-md:items-center  lg:pt-[6vh]  w-full  h-[110vh] ">
            <CvInput />
            <CvPreview />
        </div>
    )
}

export default DashBoard