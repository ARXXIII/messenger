'use client'

import ConversationBox from "./ConversationBox";
import useConversation from "@/app/hooks/useConversation";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdGroupAdd } from "react-icons/md";
import { ConversationListProps } from "@/app/types";

const ConversationList = ({ initialsItems }: ConversationListProps) => {
    const [items, setItems] = useState(initialsItems)

    const router = useRouter()

    const { conversationId, isOpen } = useConversation()

    return (
        <aside className={cn('inset-y-0 h-full',
            isOpen ? 'hidden' : 'block w-full lg:w-1/4'
        )}>
            <div>
                <div className="flex justify-between items-center gap-x-6 mb-6">
                    <div className="font-bold text-2xl text-neutral-100 tracking-wide">
                        All chats
                    </div>
                    <div className="flex justify-center items-center p-1.5 text-neutral-300 hover:text-purple-700 bg-zinc-900 rounded-full transition cursor-pointer">
                        <MdGroupAdd size={20} />
                    </div>
                </div>

                {items.map((item) => (
                    <ConversationBox
                        key={item.id}
                        data={item}
                        selected={conversationId === item.id}
                    />
                ))}

            </div>
        </aside>
    )
}

export default ConversationList