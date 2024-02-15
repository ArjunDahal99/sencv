
import { LogoDark, LogoWhite } from "@/public/images"
import Image from "next/image"
import { ModeToggle } from "./toggle-theme"
import Link from "next/link"
import UserProfileBox from "./user-profile-box"
import { cookies } from "next/headers"


const Navbar = () =>
{
    const cookieStore = cookies()
    const userToken = cookieStore.get('accessToken')
    return (
        <nav
            className=" fixed  z-[9999] border-secondary bg-background/70  border-b-2 w-full px-[10vw]   max-sm:px-4 flex justify-between items-center py-3 "
        >
            <Link href={'/'}>
                <Image src={LogoWhite} alt="Light Mode Image" className=" w-[150px]  object-cover dark:hidden" />
                <Image src={LogoDark} alt="Light Mode Image" className=" w-[150px]   object-cover hidden dark:block" />
            </Link>
            <div className=" flex items-center justify-center space-x-5">
                <UserProfileBox userToken={userToken?.value} />
                <ModeToggle />
            </div>

        </nav>
    )
}

export default Navbar