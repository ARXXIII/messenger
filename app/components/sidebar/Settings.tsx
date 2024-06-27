'use client'

import { useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { SettingsProps } from "@/app/types"
import axios from "axios"
import toast from "react-hot-toast"
import Modal from "../Modal"
import Input from "../inputs/Input"
import Image from "next/image"
import Button from "../Button"

const Settings = ({ currentUser, isOpen, onClose }: SettingsProps) => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser.name,
            image: currentUser.image
        }
    })

    const image = watch('image')

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url, {
            shouldValidate: true
        })
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/settings', data)
            .then(() => {
                router.refresh,
                    onClose()
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <div>
                        <h2 className="font-semibold text-base text-neutral-300 leading-relaxed">
                            Profile:
                        </h2>
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                            Edit your information.
                        </p>
                        <div className="mt-3">
                            <Input
                                id="name"
                                label="Name"
                                register={register}
                                errors={errors}
                                disabled={isLoading}
                                required
                            />
                            <div className="flex flex-col gap-y-3 mt-3">
                                <label className="block font-medium text-base text-neutral-300 leading-relaxed">
                                    Avatar
                                </label>
                                <div className="flex items-center gap-x-3">
                                    <Image
                                        src={image || currentUser?.image || '/images/noavatar.jpg'}
                                        alt="avatar"
                                        width='48'
                                        height='48'
                                        className="rounded-full"
                                    />
                                    <div>
                                        <Button
                                            type="button"
                                            secondary
                                            disabled={isLoading}
                                        >
                                            Change
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center gap-x-3 mt-3">
                        <Button
                            type="button"
                            secondary
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={onClose}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default Settings