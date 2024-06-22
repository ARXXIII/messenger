'use client'

import { cn } from "@/lib/utils"
import { InputProps } from "@/app/types"

const Input = ({
    id,
    type,
    label,
    required,
    register,
    errors,
    disabled,
}: InputProps) => {
    return (
        <div>
            <label htmlFor={id} className="block font-medium text-sm text-white">{label}</label>
            <div className="mt-3">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={cn(`p-3 w-full lg:min-w-[300px] text-white border-2 border-zinc-800 focus:border-purple-500 bg-transparent rounded-xl duration-200 ease-in`,
                        errors[id] && 'border-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    )
}

export default Input