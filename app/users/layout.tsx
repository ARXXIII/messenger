import getUsers from "../actions/getUsers";

import { Sidebar } from "../components";
import { UserList } from "./components";

export default async function UsersLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const users = await getUsers()

    return (
        <Sidebar>
            <div className="flex justify-between items-center gap-12 h-full">
                <UserList users={users} />
                {children}
            </div>
        </Sidebar>
    )
}