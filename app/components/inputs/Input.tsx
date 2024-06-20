'use client'

import clsx from "clsx"
import { InputProps } from "@/app/types"
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form"

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
            <label htmlFor={id} className="block font-medium text-sm">{label}</label>
            <div className="mt-3">
                <input
                    id={id}
                    type={type}
                    autoComplete={id}
                    disabled={disabled}
                    {...register(id, { required })}
                    className={clsx(`p-3 w-full lg:min-w-[300px] border-2 border-gray-200 focus:border-green-500 rounded-xl shadow duration-200 ease-in`,
                        errors[id] && 'border-rose-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
            </div>
        </div>
    )
}

export default Input