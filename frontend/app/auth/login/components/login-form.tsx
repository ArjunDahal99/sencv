"use client"
import { loginFormSchema } from "@/schema/authSchema/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import
{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormSuccessMessage } from "@/components/auth/FormSuccessMessage"
import { FormErrorMessage } from "@/components/auth/FormErrorMessage"
import { loginToAccount } from "@/actions/authAction/userAuthAction"
import { useState } from "react"
import Link from "next/link"
import { useUserStore } from "@/store/user-store"





const LoginForm = () =>
{
    const setUserAuth = useUserStore().setUserAuth
    const router = useRouter()
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: '',
        },
    })

    function onSubmit(values: z.infer<typeof loginFormSchema>)
    {
        setIsLoading(true)
        loginToAccount(values).then((data) =>
        {
            if (data.success)
            {
                form.reset()
                setUserAuth(data.user)
                setSuccessMessage(data.message)
                setErrorMessage('')
                router.push('/dashboard')

            } else
            {
                console.log(data)
                setErrorMessage(data.message)
                setSuccessMessage('')
            }
        }).finally
        {
            setIsLoading(false)
        }

    }



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                {/* email container */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder="Enter your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* passoword container */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} type="password" placeholder="*******" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Link href={'/auth/forgot-password'}>
                    <Button className=" translate-x-[-14px]" disabled={isLoading} variant={'link'}>Forgot Password ?</Button>
                </Link>


                {/* display the message accordingly after action*/}

                <FormSuccessMessage message={successMessage} />
                <FormErrorMessage message={errorMessage} />

                <Button disabled={isLoading} className=" w-full" variant={'outline'} type="submit">Login</Button>
            </form>
        </Form>
    )
}

export default LoginForm