import { toast } from "react-toastify"
import { signOut } from "../../utility/AxiosService"

export const postSignOut = async () => await toast.promise(
    signOut(),
    {
        pending: 'Authorization',
        success: 'Authorization succeeded 👌',
        error: {
            render({ data }) { return `${data.message} 🤯` }
        }
    }
)