'use client'

import axios from "axios"
import MessageInput from "./MessageInput"
import useConversation from "@/app/hooks/useConversation"

import { IoSend } from "react-icons/io5";
import { PiPaperclip } from "react-icons/pi";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

const Form = () => {
    const { conversationId } = useConversation()

    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '', { shouldValidate: true })

        axios.post('/api/messages', {
            ...data,
            conversationId
        })
    }

    return (
        <div className="flex items-center gap-3 p-3 w-full bg-zinc-900 rounded-xl">
            <PiPaperclip size={30} className="text-gray-500" />
            <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3 w-full">
                <MessageInput
                    id='message'
                    register={register}
                    errors={errors}
                    required
                    placeholder='Write a message...'
                />
                <button type="submit" className="rounded-full text-purple-700">
                    <IoSend size={30} />
                </button>
            </form>
        </div>
    )
}

export default Form