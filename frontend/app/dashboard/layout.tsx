import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import SideNavBar from '@/components/sideNavbar/side-navbar'
interface DashBoardLayoutPropsType
{
    children: React.ReactNode
}


const DashBoardLayout = ({ children }: DashBoardLayoutPropsType) =>
{
    const cookieStore = cookies()
    const token = cookieStore.get('accessToken')
    // console.log(token)
    // if (!token)
    // {
    //     redirect('/auth/login')
    // }
    return (
        <div className=" pt-[10vh] flex ">
            <SideNavBar />
            {children}
        </div>
    )
}

export default DashBoardLayout