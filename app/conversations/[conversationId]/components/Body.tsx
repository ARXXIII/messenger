'use client'

import axios from "axios"
import MessageBox from "./MessageBox"
import useConversation from "@/app/hooks/useConversation"

import { BodyProps } from "@/app/types"
import { useEffect, useRef, useState } from "react"

const Body = ({ initialMessages }: BodyProps) => {
    const [messages, setMessages] = useState(initialMessages)

    const bottomRef = useRef<HTMLDivElement>(null)

    const { conversationId } = useConversation()

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`)
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

            <div ref={bottomRef} className="pt-24" />
        </div >
    )
}

export default Body