'use client'

import UserBox from "./UserBox"

import { UserListProps } from "@/app/types"

const UserList = ({ users }: UserListProps) => {
    return (
        <aside className="inset-y-0 w-full lg:w-1/4 h-full">
            <div>
                <div className="flex-col">
                    <div className="mb-6 font-bold text-2xl text-neutral-100 tracking-wide">
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