'use client'

import useOtherUser from '@/app/hooks/useOtherUser'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Avatar } from '@/app/components'
import { useRouter } from "next/navigation"
import { useSession } from 'next-auth/react'
import { useCallback, useMemo } from 'react'
import { ConversationBoxProps } from '@/app/types'

const ConversationBox = ({ data, selected }: ConversationBoxProps) => {
    const router = useRouter()
    const session = useSession()
    const otherUser = useOtherUser(data)

    const handleClick = useCallback(() => {
        router.push(`/conversations/${data.id}`)
    }, [data.id, router])

    const lastMessage = useMemo(() => {
        const messages = data.messages || []

        return messages[messages.length - 1]
    }, [data.messages])

    const userEmail = useMemo(() => {
        return session?.data?.user?.email
    }, [session?.data?.user?.email])

    const hasSeen = useMemo(() => {
        if (!lastMessage) return false

        const seenArr = lastMessage.seenBy || []

        if (!userEmail) return false

        return seenArr.filter((user) => user.email === userEmail).length !== 0
    }, [userEmail, lastMessage])

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return 'Sent an image'

        if (lastMessage?.body) return lastMessage.body

        return 'Started a conversation'
    }, [lastMessage])

    return (
        <div onClick={handleClick} className={cn('relative flex items-center p-3 gap-x-3 w-full hover:bg-zinc-950/60 rounded-xl transition cursor-pointer',
            selected ? 'bg-purple-700' : 'bg-zinc-900'
        )}>
            <Avatar user={otherUser[0]} />
            <div className='flex-1 min-w-0'>
                <div className='focus:outline-none'>
                    <div className='flex justify-between items-center'>
                        <p className='font-medium text-md text-neutral-100 tracking-wide'>
                            {data.name || otherUser[0].name}
                        </p>

                        {lastMessage?.createdAt && (
                            <p className='text-xs text-gray-500'>
                                {format(new Date(lastMessage.createdAt), 'p')}
                            </p>
                        )}

                    </div>
                    <p className={cn('text-sm truncate',
                        hasSeen ? 'text-gray-500' : 'font-medium text-neutral-300'
                    )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox