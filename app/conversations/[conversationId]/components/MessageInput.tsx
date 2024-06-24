'use client'

import { MessageInputProps } from "@/app/types"

const MessageInput = ({ id, type, register, required, placeholder, errors }: MessageInputProps) => {
    return (
        <div className="relative w-full">
            <input
                id={id}
                type={type}
                autoComplete='off'
                placeholder={placeholder}
                {...register(id, { required })}
                className="p-3 w-full font-light text-neutral-100 bg-zinc-900"
            />
        </div>
    )
}

export default MessageInput