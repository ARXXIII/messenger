'use client'

import { cn } from "@/lib/utils"
import { Empty } from "../components"
import useConversation from "../hooks/useConversation"

const Home = () => {
    const { isOpen } = useConversation()

    return (
        <div className={cn('lg:block w-full h-full',
            isOpen ? 'block' : 'hidden'
        )}>
            <Empty />
        </div>
    )
}

export default Home