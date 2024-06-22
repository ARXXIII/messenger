'use client'

import axios from "axios"
import Confetti from "react-confetti";
import AuthSocialButton from "./AuthSocialButton"

import { toast } from "react-hot-toast"
import { useWindowSize } from "react-use"
import { useRouter } from "next/navigation"
import { Button, Input } from "@/app/components"
import { BsGithub, BsGoogle } from "react-icons/bs"
import { signIn, useSession } from "next-auth/react"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

type variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const { width, height } = useWindowSize()

    const router = useRouter()
    const session = useSession()

    const [variant, setVariant] = useState<variant>('LOGIN')
    const [confetti, setConfetti] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/users')
        }
    }, [session?.status, router])

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
                .then(() => signIn('credentials', data))
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
                    setConfetti(true)
                    toast.success('Great Success')
                }
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <>
            {confetti ? (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
            ) : null}

            <div className="mt-6 lg:mx-auto w-full lg:max-w-md">
                <div className="p-6 bg-zinc-900 rounded-xl shadow">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

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
                                <span className="px-3 text-gray-400 bg-zinc-900">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')} />
                            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')} />
                        </div>
                    </section>
                    <section className="flex justify-center gap-3 mt-6 text-sm text-gray-400">
                        <div>
                            {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default AuthForm