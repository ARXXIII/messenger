'use client'

import axios from "axios"
import MessageBox from "./MessageBox"
import useConversation from "@/app/hooks/useConversation"

import { find } from "lodash"
import { pusherClient } from "@/app/libs/pusher"
import { useEffect, useRef, useState } from "react"
import { BodyProps, FullMessageType } from "@/app/types"

const Body = ({ initialMessages }: BodyProps) => {
    const [messages, setMessages] = useState(initialMessages)

    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
    }, [conversationId])

    useEffect(() => {
        pusherClient.subscribe(conversationId)

        bottomRef?.current?.scrollIntoView()

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`)

            setMessages((curr) => {
                if (find(curr, { id: message.id })) {
                    return curr
                }

                return [...curr, message]
            })

            bottomRef?.current?.scrollIntoView()
        }

        pusherClient.bind('messages:new', messageHandler)

        return () => {
            pusherClient.unsubscribe(conversationId)
            pusherClient.unbind('messages:new', messageHandler)
        }
    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto">

            {messages.map((message, index) => (
                <MessageBox
                    key={message.id}
                    data={message}
                    isLast={index === messages.length - 1}
                />
            ))}

            <div ref={bottomRef} className="pt-12" />
        </div >
    )
}

export default Body