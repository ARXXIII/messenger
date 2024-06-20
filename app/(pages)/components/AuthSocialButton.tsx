import { AuthSocialButtonProps } from "@/app/types"
import { IconType } from "react-icons"

const AuthSocialButton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex justify-center p-3 w-full text-gray-500 bg-white hover:bg-gray-50 rounded-xl shadow"
        >
            <Icon />
        </button>
    )
}

export default AuthSocialButton