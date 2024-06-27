import { Fragment } from "react"
import { ModalProps } from "../types"
import { IoClose } from "react-icons/io5"
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react"

const Modal = ({ children, isOpen, onClose }: ModalProps) => {
    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-300 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-zinc-800 bg-opacity-75 transition-opacity" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-auto z-10">
                    <div className="flex justify-center items-center p-3 min-h-full text-center sm:p-0">
                        <TransitionChild
                            as={Fragment}
                            enter="duration-300 ease-out"
                            enterFrom="opacity-0 translate-y-3 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="duration-100 ease-in"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-100 translate-y-3 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="relative p-3 text-left w-full lg:w-1/3 bg-zinc-900 rounded-xl shadow-xl transform transition-all overflow-hidden">
                                <div className="hidden sm:block absolute top-0 right-0 pt-3 pr-3 z-10">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="text-gray-500 hover:text-purple-700 focus:ring-2 focus:ring-purple-700 rounded-lg transition-colors"
                                    >
                                        <IoClose className="w-6 h-6" />
                                    </button>
                                </div>
                                {children}
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Modal