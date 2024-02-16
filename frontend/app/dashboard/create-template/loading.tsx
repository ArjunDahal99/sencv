import LoadingSpinner from '@/components/spinner'
import React from 'react'

const Loading = () =>
{
    return (
        <div className=" w-full h-screen flex justify-center items-center ">
            <LoadingSpinner />
        </div>
    )
}

export default Loading