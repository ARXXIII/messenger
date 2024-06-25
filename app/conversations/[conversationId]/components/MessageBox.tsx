'use client'

import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Avatar } from "@/app/components"
import { useSession } from "next-auth/react"
import { MessageBoxProps } from "@/app/types"

const MessageBox = ({ data, isLast }: MessageBoxProps) => {
    const session = useSession()

    const isOwn = session?.data?.user?.email === data?.sender?.email

    return (
        <div
            className={cn('flex gap-3 p-3',
                isOwn && 'justify-end')}
        >
            <div className={cn(isOwn && 'order-2')}>
                <Avatar user={data.sender} />
            </div>
            <div
                className={cn('flex flex-col gap-3',
                    isOwn && 'items-end')}
            >
                <div className="flex items-center gap-1">
                    <div className="text-sm text-neutral-300">
                        {data.sender.name}
                    </div>
                    <div className="text-xs text-gray-500">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div
                    className={cn('px-2 py-1 w-fit text-sm text-neutral-100 tracking-wide leading-relaxed overflow-hidden rounded-full',
                        isOwn ? 'bg-purple-700' : 'bg-zinc-950/60')}
                >
                    {data.body}
                </div>
            </div>
        </div>
    )
}

export default MessageBox