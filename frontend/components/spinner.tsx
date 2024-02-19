import React from 'react'

const LoadingSpinner = () =>
{
    return (
        <div className="p-1 bg-gradient-to-b animate-spin from-green-500 to-white rounded-full">
            <div className="bg-white rounded-full">
                <div className="w-4 h-4 rounded-full"></div>
            </div>
        </div>

    )
}

export default LoadingSpinner