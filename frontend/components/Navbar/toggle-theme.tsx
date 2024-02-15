"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "lucide-react"

export function ModeToggle()
{
    const { setTheme } = useTheme()

    return (
        <>
            <SunIcon onClick={() => setTheme("dark")} className="h-[1.2rem] w-[1.2rem]  cursor-pointer dark:hidden" />
            <MoonIcon onClick={() => setTheme("light")} className="h-[1.2rem] w-[1.2rem]  cursor-pointer hidden dark:block" />
        </>
    )
}
