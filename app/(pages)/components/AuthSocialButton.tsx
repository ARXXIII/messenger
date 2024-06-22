import { AuthSocialButtonProps } from "@/app/types"
import { IconType } from "react-icons"

const AuthSocialButton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex justify-center p-3 w-full text-gray-400 bg-zinc-800 hover:bg-gray-50 rounded-xl"
        >
            <Icon />
        </button>
    )
}

export default AuthSocialButton