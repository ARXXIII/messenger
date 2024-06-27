'use client'

import Link from "next/link"
import ProfileDrawer from "./ProfileDrawer"
import useOtherUser from "@/app/hooks/useOtherUser"

import { useMemo, useState } from "react"
import { HeaderProps } from "@/app/types"
import { Avatar, AvatarGroup } from "@/app/components"
import { HiChevronLeft, HiEllipsisVertical } from "react-icons/hi2"

const Header = ({ conversation }: HeaderProps) => {
    const otherUser = useOtherUser(conversation)

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

    const statusText = useMemo(() => {
        if (conversation.isGroup) {
            return `${conversation.users.length} members`
        }

        return 'Active'
    }, [conversation])

    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <header className="flex justify-between items-center px-2 py-1 lg:p-3 w-full bg-zinc-900 rounded-xl">
                <div className="flex items-center gap-3">
                    <Link
                        href='/conversations'
                        className="block lg:hidden text-purple-700 transition cursor-pointer"
                    >
                        <HiChevronLeft size={32} />
                    </Link>
                    {conversation.isGroup ? (
                        <AvatarGroup users={conversation.users} />
                    ) : (
                        <Avatar user={otherUser.user} />
                    )}
                    <div className="flex flex-col">
                        <div className="text-neutral-100">
                            {conversation.name || otherUser.user.name}
                        </div>
                        <div className="font-light text-sm text-gray-500 tracking-wide">
                            {statusText}
                        </div>
                    </div>
                </div>
                <HiEllipsisVertical
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="text-gray-500 lg:hover:text-purple-700 transition cursor-pointer"
                />
            </header>
        </>
    )
}

export default Header