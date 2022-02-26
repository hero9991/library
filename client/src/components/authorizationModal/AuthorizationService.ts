import { toast } from "react-toastify"
import { authorizeGoogleAccount, getUserRatings, signIn, signUp } from "../../utility/AxiosService"


export const postSignIn = async (data: any) => await toast.promise(
    signIn(data.email, data.password),
    {
        pending: 'Authorization',
        success: { render({ data }: any) { return `Hello, ${data.data.user.name}. Please enjoy reading 👌` } },
        error: {
            render({ data }: any) { return `${data.message} 🤯` }
        }
    }
)

export const postSignUp = async (data: any) => await toast.promise(
    signUp(data.email, data.password, data.confirmPassword, data.firstName, data.lastName),
    {
        pending: 'Registration',
        success: 'Registration succeeded 👌',
        error: { render({ data }: any) { return `Registration has failed. Error: ${data.message} 🤯` } }
    }
)

export const postGoogleAccount = async (data: any) => await toast.promise(
    authorizeGoogleAccount(data?.tokenId),
    {
        pending: 'Google authorization',
        success: { render({ data }: any) { return `Hello, ${data.data.user.name}. Please enjoy reading 👌` } },
        error: { render({ data }: any) { return `Google authorization has failed. Error: ${data.message} 🤯` } }
    }
)

export const fetchUserRatings = async (userId: string) => await getUserRatings(userId)