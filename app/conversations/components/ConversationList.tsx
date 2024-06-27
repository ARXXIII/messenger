'use client'

import GroupChat from "./GroupChat";
import ConversationBox from "./ConversationBox";
import useConversation from "@/app/hooks/useConversation";

import { find } from "lodash";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { MdGroupAdd } from "react-icons/md";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { useEffect, useMemo, useState } from "react";
import { ConversationListProps, FullConversationType } from "@/app/types";

const ConversationList = ({ initialsItems, users }: ConversationListProps) => {
    const [items, setItems] = useState(initialsItems)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const router = useRouter()
    const session = useSession()

    const { conversationId, isOpen } = useConversation()

    const pusherKey = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        if (!pusherKey) {
            return
        }

        pusherClient.subscribe(pusherKey)

        const newConversationHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                if (find(current, { id: conversation.id })) {
                    return current;
                }

                return [conversation, ...current];
            });
        };

        const updateHandler = (conversation: FullConversationType) => {
            setItems((current) => current.map((currentConversation) => {
                if (currentConversation.id === conversation.id) {
                    return {
                        ...currentConversation,
                        messages: conversation.messages
                    }
                }

                return currentConversation;
            }))
        };

        const removeHandler = (conversation: FullConversationType) => {
            setItems((current) => {
                return [...current.filter((chat) => chat.id !== conversation.id)]
            });

            if (conversationId === conversation.id) {
                router.push('/conversations');
            }
        };

        pusherClient.bind('conversation:new', newConversationHandler)
        pusherClient.bind('conversation:update', updateHandler);
        pusherClient.bind('conversation:remove', removeHandler);

        return () => {
            pusherClient.unsubscribe(pusherKey)
            pusherClient.unbind('conversation:new', newConversationHandler)
            pusherClient.unbind('conversation:update', updateHandler);
            pusherClient.unbind('conversation:remove', removeHandler);
        }
    }, [pusherKey, conversationId, router])

    return (
        <>
            <GroupChat
                users={users}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <aside className={cn('inset-y-0 h-full overflow-y-auto',
                isOpen ? 'hidden lg:block lg:w-1/4' : 'block w-full lg:w-1/4'
            )}>
                <div>
                    <div className="flex justify-between items-center gap-x-6 mb-6">
                        <div className="font-bold text-2xl text-neutral-100 tracking-wide">
                            All chats
                        </div>
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="flex justify-center items-center p-1.5 text-neutral-300 hover:text-purple-700 bg-zinc-900 rounded-full transition cursor-pointer"
                        >
                            <MdGroupAdd size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-3">

                        {items.map((item) => (
                            <ConversationBox
                                key={item.id}
                                data={item}
                                selected={conversationId === item.id}
                            />
                        ))}

                    </div>
                </div>
            </aside>
        </>
    )
}

export default ConversationList