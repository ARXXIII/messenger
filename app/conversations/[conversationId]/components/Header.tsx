'use client'

import Link from "next/link"
import useOtherUser from "@/app/hooks/useOtherUser"

import { useMemo } from "react"
import { HeaderProps } from "@/app/types"
import { Avatar } from "@/app/components"
import { HiChevronLeft, HiEllipsisVertical } from "react-icons/hi2"

const Header = ({ conversation }: HeaderProps) => {
    const otherUser = useOtherUser(conversation)

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return 'Active'
    }, [conversation])

    return (
        <header className="flex justify-between items-center p-3 w-full bg-zinc-900 rounded-xl">
            <div className="flex items-center gap-3">
                <Link
                    href='/conversations'
                    className="block lg:hidden text-purple-700 transition cursor-pointer"
                >
                    <HiChevronLeft size={32} />
                </Link>
                <Avatar user={otherUser[0]} />
                <div className="flex flex-col">
                    <div className="text-neutral-100">
                        {conversation.name || otherUser[0].name}
                    </div>
                    <div className="font-light text-sm text-gray-500 tracking-wide">
                        {statusText}
                    </div>
                </div>
            </div>
            <HiEllipsisVertical
                size={32}
                onClick={() => { }}
                className="text-gray-500 lg:hover:text-purple-700 transition cursor-pointer"
            />
        </header>
    )
}

export default Header