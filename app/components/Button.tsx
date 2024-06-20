'use client'

import clsx from "clsx"
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
            className={clsx('flex justify-center items-center p-3 font-bold text-sm rounded-xl',
                disabled && 'opacity-50 cursor-default',
                fullWidth && 'w-full',
                secondary ? 'text-gray-900' : 'text-white',
                danger && 'bg-red-500 hover:bg-rose-600',
                !secondary && !danger && 'bg-sky-500 hover:bg-sky-600'
            )}
        >
            {children}
        </button>
    )
}

export default Button