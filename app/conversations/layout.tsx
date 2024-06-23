import { Sidebar } from "../components";
import getConversations from "../actions/getConversations";
import ConversationList from "./components/ConversationList";

export default async function ConversationLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const conversations = await getConversations()

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList initialsItems={conversations} />
                {children}
            </div>
        </Sidebar>
    )
}