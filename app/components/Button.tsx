'use client'

import { cn } from "@/lib/utils"
import { ButtonProps } from "../types"

const Button = ({
    type,
    fullWidth,
    children,
    onClick,
    secondary,
    danger,
    disabled,
}: ButtonProps) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cn('flex justify-center items-center p-3 font-bold text-sm tracking-wide rounded-lg transition',
                disabled && 'opacity-50 cursor-default',
                fullWidth && 'w-full',
                secondary ? 'text-neutral-300 bg-zinc-800' : 'text-white',
                danger && 'bg-rose-500 hover:bg-rose-600',
                !secondary && !danger && 'bg-purple-700 hover:bg-purple-600'
            )}
        >
            {children}
        </button>
    )
}

export default Button