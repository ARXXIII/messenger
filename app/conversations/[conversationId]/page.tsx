import getMessages from "@/app/actions/getMessages"
import getConversationById from "@/app/actions/getConversationById"

import { Empty } from "@/app/components"
import { Body, Form, Header } from "./components"
import { ConversationIdProps } from "@/app/types"

const ConversationId = async ({ params }: ConversationIdProps) => {
    const conversation = await getConversationById(params.conversationId)
    const messages = await getMessages(params.conversationId)

    if (!conversation) {
        return (
            <div className="w-full h-full">
                <Empty />
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-between gap-y-6 w-full h-full">
            <Header conversation={conversation} />
            <Body initialMessages={messages} />
            <Form />
        </div>
    )
}

export default ConversationId