'use client'

import { UserListProps } from "@/app/types"
import UserBox from "./UserBox"

const UserList = ({ users }: UserListProps) => {
    return (
        <aside className="inset-y-0 w-1/4 h-full">
            <div>
                <div className="flex-col">
                    <div className="mb-6 font-bold text-neutral-100 text-2xl">
                        People
                    </div>
                </div>
                {users.map((user) => (
                    <UserBox key={user.id} data={user} />
                ))}
            </div>
        </aside>
    )
}

export default UserList