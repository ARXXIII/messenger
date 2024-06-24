'use client'

import axios from "axios"

import { Avatar } from "@/app/components"
import { UserBoxProps } from "@/app/types"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

const UserBox = ({ data }: UserBoxProps) => {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleClick = useCallback(() => {
        setIsLoading(true)

        axios.post('/api/conversations', {
            userId: data.id
        })
            .then((data) => {
                router.push(`/conversations/${data.data.id}`)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [data, router])

    return (
        <div onClick={handleClick} className="relative flex items-center p-3 gap-x-3 w-full bg-zinc-900 hover:bg-zinc-950/60 rounded-xl transition cursor-pointer">
            <Avatar user={data} />
            <div className="flex-1 min-w-0">
                <div className="focus:outline-none">
                    <div>
                        <p className="font-medium text-md text-neutral-100">
                            {data.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox