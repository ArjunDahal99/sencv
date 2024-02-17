"use client"

import { sideNavContent } from "@/constant/side-nav"
import Link from "next/link"
import { usePathname } from "next/navigation"

const SideNavBar = () =>
{
    const path = usePathname()
    return (
        <div className="   flex flex-col pt-2 justify-start gap-y-10  max-md:hidden min-w-[250px] min-h-screen">
            {sideNavContent.map((nav) => (
                <Link key={nav.name} className={` flex gap-x-4 p-2 hover:text-purple-400 ${nav.link === path ? 'text-purple-400 ' : ''} `} href={nav.link}>
                    {<nav.logo />}
                    <h1>{nav.name}</h1>
                </Link>
            ))}

        </div>
    )
}

export default SideNavBar