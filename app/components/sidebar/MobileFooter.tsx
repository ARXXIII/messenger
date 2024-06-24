'use client'

import MobileItem from "./MobileItem"
import useRoutes from "@/app/hooks/useRoutes"
import useConversation from "@/app/hooks/useConversation"

const MobileFooter = () => {
    const routes = useRoutes()
    const { isOpen } = useConversation()

    if (isOpen) return null

    return (
        <div className="absolute grid grid-cols-3 lg:hidden justify-between items-center w-full p-1 bottom-0 bg-zinc-900 z-40 rounded-xl">
            {routes.map((item) => (
                <MobileItem
                    key={item.label}
                    href={item.href}
                    icon={item.icon}
                    active={item.active}
                    onClick={item.onClick}
                />
            ))}
        </div>
    )
}

export default MobileFooter