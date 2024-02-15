
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
interface AuthLayoutPropsType
{
    children: React.ReactNode
}


const AuthLayout = ({ children }: AuthLayoutPropsType) =>
{
    const cookieStore = cookies()
    const token = cookieStore.get('accessToken')
    console.log(token)
    if (token)
    {
        redirect('/dashboard')
    }
    return (
        <div className="  w-full h-full flex justify-center items-center">
            {children}
        </div>
    )
}

export default AuthLayout