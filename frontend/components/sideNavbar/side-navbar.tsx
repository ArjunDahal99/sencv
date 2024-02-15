"use client"

import { sideNavContent } from "@/constant/side-nav"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideNavBar = () =>
{
    const path = usePathname()
    console.log(path)
    return (
        <div className="   border-r-2 flex flex-col pt-2 justify-start gap-y-10 border-secondary  max-md:hidden w-[350px] min-h-screen">
            {sideNavContent.map((nav) => (
                <Link className={` flex gap-x-4 p-2 hover:text-purple-400 ${nav.link === path ? 'text-purple-400 ' : ''} `} href={nav.link}>
                    {<nav.logo />}
                    <h1>{nav.name}</h1>
                </Link>
            ))}

        </div>
    )
}

export default SideNavBar