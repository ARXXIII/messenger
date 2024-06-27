'use client'

import Image from "next/image"

import { AvatarsGroupProps } from "../types"

const AvatarGroup = ({ users }: AvatarsGroupProps) => {
    const slicedUsers = users?.slice(0, 3)

    const positions = {
        0: 'top-0 left-0',
        1: 'top-0 right-0',
        2: 'left-[.8em] bottom-0'
    }

    return (
        <div className="relative w-12 h-12">

            {slicedUsers?.map((user, index) => (
                <div key={index} className={`inline-block absolute w-[21px] h-[21px] rounded-full overflow-hidden ${positions[index as keyof typeof positions]}`} >
                    <Image
                        src={user.user.image || '/images/noavatar.jpg'}
                        alt="avatar"
                        fill
                    />
                </div>
            ))}

        </div>
    )
}

export default AvatarGroup