'use client'

import Link from "next/link"

import { cn } from "@/lib/utils"
import { MobileItemProps } from "@/app/types"

const MobileItem = ({ href, icon: Icon, active, onClick }: MobileItemProps) => {
    const handleClick = () => {
        if (onClick) return onClick()
    }

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(`flex justify-center gap-x-3 p-3 w-full font-semibold text-neutral-300 rounded-xl`,
                active && 'text-purple-700 bg-zinc-800'
            )}
        >
            <Icon className='w-6 h-6' />
        </Link>
    )
}

export default MobileItem