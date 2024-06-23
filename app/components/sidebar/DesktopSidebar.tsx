'use client'

import { DesktopSidebarProps } from "@/app/types"
import Avatar from "../Avatar"
import DesktopItem from "./DesktopItem"
import useRoutes from "@/app/hooks/useRoutes"

import { useState } from "react"

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
    const routes = useRoutes()
    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className="hidden lg:flex lg:flex-col justify-between lg:p-3 lg:inset-y-0 lg:z-40 lg:bg-zinc-900 lg:overflow-y-auto lg:rounded-xl">
            <nav className="flex flex-col justify-between">
                <ul role="list" className="grid grid-cols-1 items-center gap-y-3">
                    {routes.map((item) => (
                        <DesktopItem
                            key={item.label}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            active={item.active}
                            onClick={item.onClick}
                        />
                    ))}
                </ul>
            </nav>
            <nav className="flex flex-col justify-between items-center">
                <div onClick={() => setIsOpen(true)} className="hover:opacity-75 cursor-pointer transition">
                    <Avatar user={currentUser} />
                </div>
            </nav>
        </div>
    )
}

export default DesktopSidebar