import { AuthSocialButtonProps } from "@/app/types"

const AuthSocialButton = ({ icon: Icon, onClick }: AuthSocialButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex justify-center p-3 w-full text-gray-500 bg-zinc-800 hover:bg-zinc-700/50 rounded-lg transition"
        >
            <Icon />
        </button>
    )
}

export default AuthSocialButton