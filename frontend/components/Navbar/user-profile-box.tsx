"use client"
import React, { useEffect } from 'react'
import { ProfileDropDownMenu } from './profile-dropdown';
import { useUserStore } from '@/store/user-store';


const UserProfileBox = ({ userToken }: string | any) =>
{
    const userData = useUserStore().user
    const setUserauth = useUserStore().setUserAuth
    useEffect(() =>
    {
        if (!userToken)
        {
            setUserauth(null)
        }
    }, [])

    return (
        <>
            {<ProfileDropDownMenu user={userData} />}
        </>

    )
}

export default UserProfileBox