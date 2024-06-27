'use client'

import axios from "axios"
import toast from "react-hot-toast"
import useConversation from "@/app/hooks/useConversation"

import { Button, Modal } from "@/app/components"
import { useRouter } from "next/navigation"
import { GoAlertFill } from "react-icons/go";
import { useCallback, useState } from "react"
import { ConfirmModalProps } from "@/app/types"
import { DialogTitle } from "@headlessui/react"

const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
    const router = useRouter()

    const { conversationId } = useConversation()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onDelete = useCallback(() => {
        setIsLoading(true)

        axios.delete(`/api/conversations/${conversationId}`)
            .then(() => {
                onClose()
                router.push('/conversations')
                router.refresh()
            })
            .catch(() => toast.error('Something went wrong'))
            .finally(() => setIsLoading(false))
    }, [conversationId, router, onClose])

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="sm:flex sm:items-start">
                <div className="flex justify-center items-center mx-auto sm:mx-0 flex-shrink-0">
                    <GoAlertFill className="w-6 h-6 text-rose-500" />
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3 text-center sm:text-left">
                    <DialogTitle as="h3" className="font-semibold text-base text-neutral-100 tracking-wide leading-relaxed">
                        Delete conversation
                    </DialogTitle>
                    <div className="mt-3 text-sm text-gray-500">
                        <p>Are you sure you want to delete this conversation?</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center lg:justify-end gap-x-3 mt-6 sm:mt-3">
                <Button
                    secondary
                    disabled={isLoading}
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    danger
                    disabled={isLoading}
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </div>
        </Modal>
    )
}

export default ConfirmModal