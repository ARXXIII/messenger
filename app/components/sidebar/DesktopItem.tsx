'use client'

import Link from "next/link"

import { cn } from "@/lib/utils"
import { DesktopItemProps } from "@/app/types"

const DesktopItem = ({ href, label, icon: Icon, active, onClick }: DesktopItemProps) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }

    return (
        <li onClick={handleClick}>
            <Link href={href} className={cn(`group flex flex-col items-center gap-y-3 p-3 text-sm text-neutral-300 hover:text-white hover:bg-zinc-800/50 leading-relaxed rounded-xl`,
                active && 'text-purple-700 hover:text-purple-600 bg-zinc-800 hover:bg-zinc-800'
            )}>
                <Icon className='w-6 h-6 shrink-0' />
                {label}
            </Link>
        </li>
    )
}

export default DesktopItem