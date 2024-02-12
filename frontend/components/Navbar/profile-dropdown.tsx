"use client";

import
{
    DropdownMenuCheckboxItemProps,
} from "@radix-ui/react-dropdown-menu";
import
{
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Avatar from "react-avatar";
import { useState } from "react";
import { logoutFromAccount } from "@/actions/authAction/userAuthAction";
import { useUserStore } from "@/store/user-store";

export function ProfileDropDownMenu({ user }: any)
{
    const setUserAuth = useUserStore().setUserAuth
    const router = useRouter()

    const logout = () =>
    {
        logoutFromAccount()
        setUserAuth(null)
        router.push('/')
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {user ? (
                    <div className=' cursor-pointer border-2 border-secondary px-4 py-1 rounded-lg flex items-center justify-center space-x-4'>
                        <Avatar textSizeRatio={2} name={user?.username} size="40" round />
                        <h1 className=" max-md:hidden" >{user?.username}</h1>
                    </div>
                ) : (
                    <h1> Login </h1>
                )}
            </DropdownMenuTrigger>


            {user &&
                <DropdownMenuContent className="w-56 mr-5 cursor-pointer">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={"/profile"}>
                        <DropdownMenuCheckboxItem>Profile</DropdownMenuCheckboxItem>{" "}
                    </Link>
                    <Link href={"/dashboard"}>
                        <DropdownMenuCheckboxItem>DashBoard</DropdownMenuCheckboxItem>
                    </Link>
                    <DropdownMenuCheckboxItem>Setting</DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem onClick={logout} className="cursor-pointer ">
                        <LogOut className="w-4 text-red-400" />
                        <p className="text-red-400 ">
                            Logout
                        </p>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>}

            {!user &&
                <DropdownMenuContent className="w-56 mr-5 cursor-pointer">
                    <DropdownMenuLabel>Guest Mode</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href={"/auth/login"}>
                        <DropdownMenuCheckboxItem className="cursor-pointer ">
                            <LogIn className="w-4 " />
                            <h1>Login</h1>
                        </DropdownMenuCheckboxItem>
                    </Link>
                </DropdownMenuContent>}


        </DropdownMenu>
    );
}