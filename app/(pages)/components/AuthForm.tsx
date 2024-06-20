'use client'

import axios from "axios"
import { toast } from "react-hot-toast"
import { useCallback, useState } from "react"
import { Button, Input } from "@/app/components"
import AuthSocialButton from "./AuthSocialButton"
import { BsGithub, BsGoogle } from "react-icons/bs"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { signIn } from "next-auth/react"

type variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const [variant, setVariant] = useState<variant>('LOGIN')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const toggleVariant = useCallback(() => {

        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }

    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .catch(() => toast.error('Something went wrong'))
                .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials')
                    }

                    if (callback?.ok) {
                        toast.success('Great Success')
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true)

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials')
                }

                if (callback?.ok) {
                    toast.success('Great Success')
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <div className="mt-8 lg:mx-auto lg:w-full lg:max-w-md">
            <div className="p-6 bg-white lg:rounded-xl shadow">
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    {variant === 'REGISTER' && (
                        <Input
                            id='name'
                            label='Name'
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        id='email'
                        label='Email'
                        type="email"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <Input
                        id='password'
                        label='Password'
                        type="password"
                        register={register}
                        errors={errors}
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            type="submit"
                            fullWidth
                            disabled={isLoading}
                        >
                            {variant === 'LOGIN' ? 'Sign In' : 'Register'}
                        </Button>
                    </div>
                </form>
                <section className="mt-6">
                    <div className="relative">
                        <div className="absolute flex items-center inset-0">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-center text-sm">
                            <span className="px-2 text-gray-500 bg-white">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                        <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                        <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                    </div>
                </section>
                <section className="flex justify-center gap-2 mt-6 text-sm text-gray-500">
                    <div>
                        {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                    </div>
                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default AuthForm