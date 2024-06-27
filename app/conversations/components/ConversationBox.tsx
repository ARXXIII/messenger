'use client'

import useOtherUser from '@/app/hooks/useOtherUser'

import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useCallback, useMemo } from 'react'
import { ConversationBoxProps } from '@/app/types'
import { Avatar, AvatarGroup } from '@/app/components'

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

    const lastMessageText = useMemo(() => {
        if (lastMessage?.image) return 'Sent an image'

        if (lastMessage?.body) return lastMessage.body

        return 'Started a conversation'
    }, [lastMessage])

    return (
        <div onClick={handleClick} className={cn('relative flex items-center p-3 gap-x-3 w-full hover:bg-zinc-950/60 rounded-xl transition cursor-pointer',
            selected ? 'bg-purple-700 hover:bg-purple-600' : 'bg-zinc-900'
        )}>

            {data.isGroup ? (
                <AvatarGroup users={data.users} />
            ) : (
                <Avatar user={otherUser.user} />
            )}

            <div className='flex-1 min-w-0'>
                <div className='focus:outline-none'>
                    <div className='flex justify-between items-center'>
                        <p className='font-medium text-md text-neutral-100 tracking-wide'>
                            {data.name || otherUser.user.name}
                        </p>

                        {lastMessage?.seenAt && (
                            <p className='text-xs text-gray-500'>
                                {format(new Date(lastMessage.sentAt), 'p')}
                            </p>
                        )}

                    </div>
                    <p className={cn('text-sm text-gray-500',
                        selected && 'text-neutral-300'
                    )}>
                        {lastMessageText}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox