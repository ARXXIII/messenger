'use client'

import ConfirmModal from "./ConfirmModal"
import useOtherUser from "@/app/hooks/useOtherUser"

import { format } from "date-fns"
import { ProfileDrawerProps } from "@/app/types"
import { Fragment, useMemo, useState } from "react"
import { Avatar, AvatarGroup } from "@/app/components"
import { IoClose, IoTrashOutline } from "react-icons/io5"
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'

const ProfileDrawer = ({ data, isOpen, onClose }: ProfileDrawerProps) => {
    const otherUser = useOtherUser(data)

    const [ModalOpen, setModalOpen] = useState(false)

    const name = useMemo(() => {
        return data.name || otherUser.user.name
    }, [data.name, otherUser])

    const status = useMemo(() => {
        if (data.isGroup) {
            return `${data.users.length} members`
        }

        return 'Active'
    }, [data])

    const joinedDate = useMemo(() => {
        return format(new Date(otherUser.user.createdAt), 'PP')
    }, [otherUser])

    return (
        <>
            <ConfirmModal
                isOpen={ModalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Transition show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-zinc-950 bg-opacity-40" />
                    </TransitionChild>
                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="fixed inset-y-0 flex pl-10 max-w-full right-0 pointer-events-none">
                                <TransitionChild
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500"
                                    leaveTo="translate-x-full"
                                >
                                    <DialogPanel className="w-screen max-w-md pointer-events-auto">
                                        <div className="flex h-full flex-col py-6 border-l-2 border-purple-700 bg-zinc-900 shadow-xl overflow-y-scroll">
                                            <div className="px-3 sm:px-6">
                                                <div className="flex items-start justify-end">
                                                    <div className="flex ml-3 h-6 items-center">
                                                        <button
                                                            type="button"
                                                            onClick={onClose}
                                                            className="text-gray-500 hover:text-purple-700 focus:ring-2 focus:ring-purple-700 rounded-lg transition-colors"
                                                        >
                                                            <IoClose size={24} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="relative flex-1 mt-6 px-3 sm:px-6">
                                                <div className="flex flex-col items-center">
                                                    <div>
                                                        {data.isGroup ? (
                                                            <AvatarGroup users={data.users} />
                                                        ) : (
                                                            <Avatar user={otherUser.user} />
                                                        )}
                                                    </div>
                                                    <div className="mt-3 text-neutral-100">
                                                        {name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 tracking-wide">
                                                        {status}
                                                    </div>
                                                    <div className="flex gap-10 my-6">
                                                        <div onClick={() => setModalOpen(true)} className="flex flex-col items-center cursor-pointer">
                                                            <div className="flex justify-center items-center w-10 h-10 text-neutral-100 hover:text-rose-500 transition-colors">
                                                                <IoTrashOutline size={22} />
                                                            </div>
                                                            <div className="text-sm font-light text-gray-500 tracking-wide">
                                                                Delete
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="pt-6 pb-6 w-full sm:pt-0 sm:px-0">
                                                        <dl className="space-y-6 px-3 sm:px-6">

                                                            {data.isGroup && (
                                                                <div>
                                                                    <dt className="text-sm font-medium text-neutral-300 sm:w-40 sm:flex-shrink-0">
                                                                        Emails
                                                                    </dt>
                                                                    <dd className="flex flex-col gap-y-1 mt-1 text-sm text-gray-500">
                                                                        {data.users.map((el) => (
                                                                            <p key={el.user.id}>
                                                                                {el.user.email}
                                                                            </p>
                                                                        ))}
                                                                    </dd>
                                                                </div>
                                                            )}

                                                            {!data.isGroup && (
                                                                <div>
                                                                    <dt className="text-sm font-medium text-neutral-300 sm:w-40 sm:flex-shrink-0">
                                                                        Email
                                                                    </dt>
                                                                    <dd className="mt-1 text-sm text-gray-500 sm:col-span-2">
                                                                        {otherUser.user.email}
                                                                    </dd>
                                                                </div>
                                                            )}

                                                            {!data.isGroup && (
                                                                <>
                                                                    <hr />
                                                                    <div>
                                                                        <dt className="text-sm font-medium text-neutral-300 sm:w-40 sm:flex-shrink-0">
                                                                            Joined
                                                                        </dt>
                                                                        <dd
                                                                            className="mt-1 text-sm text-gray-500 sm:col-span-2">
                                                                            <time dateTime={joinedDate}>
                                                                                {joinedDate}
                                                                            </time>
                                                                        </dd>
                                                                    </div>
                                                                </>
                                                            )}

                                                        </dl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ProfileDrawer