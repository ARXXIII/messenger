'use client'

import Image from "next/image"
import { AvatarProps } from "../types"

const Avatar = ({ user }: AvatarProps) => {
    return (
        <div className="relative">
            <div className="relative inline-block w-12 h-12 rounded-full overflow-hidden">
                <Image
                    src={user?.image || '/images/noavatar.jpg'}
                    alt="avatar"
                    fill
                />
            </div>
            <span className="absolute block top-0 right-0 w-3 h-3 bg-green-500 ring-2 ring-white rounded-full" />
        </div>
    )
}

export default Avatar