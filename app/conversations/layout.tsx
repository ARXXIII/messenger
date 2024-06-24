import getConversations from "../actions/getConversations";

import { Sidebar } from "../components";
import { ConversationList } from "./components";

export default async function ConversationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const conversations = await getConversations()

    return (
        <Sidebar>
            <div className="flex items-center gap-6 h-full">
                <ConversationList initialsItems={conversations} />
                {children}
            </div>
        </Sidebar>
    )
}