'use client'

import axios from "axios"
import toast from "react-hot-toast"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GroupChatProps } from "@/app/types"
import { Button, Input, Modal, Select } from "@/app/components"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const GroupChat = ({ users, isOpen, onClose }: GroupChatProps) => {
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
            name: '',
            members: []
        }
    })

    const members = watch('members')

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)

        axios.post('/api/conversations', {
            ...data,
            isGroup: true
        })
            .then(() => {
                router.refresh(),
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
                            Create a group chat
                        </h2>
                        <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                            Create a chat with more than two people.
                        </p>
                        <div className="flex flex-col gap-y-6 mt-3">
                            <Input
                                id="name"
                                label="Name"
                                register={register}
                                disabled={isLoading}
                                errors={errors}
                                required
                            />
                            <Select
                                label='Members'
                                disabled={isLoading}
                                value={members}
                                options={users.map((user) => ({
                                    value: user.id,
                                    label: user.name
                                }))}
                                onChange={(value) => setValue('members', value, {
                                    shouldValidate: true
                                })}
                            />
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
            </form>
        </Modal>
    )
}

export default GroupChat