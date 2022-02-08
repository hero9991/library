import { toast } from "react-toastify"
import { authorizeGoogleAccount, getUserRatings, signIn, signUp } from "../../utility/AxiosService"


export const postSignIn = async data => await toast.promise(
    signIn(data.email, data.password),
    {
        pending: 'Authorization',
        success: 'Hello, ms ... Please enjoy reading 👌',
        error: {
            render({ data }) { return `${data.message} 🤯` }
        }
    }
)

export const postSignUp = async data => await toast.promise(
    signUp(data.email, data.password, data.confirmPassword, data.firstName, data.lastName),
    {
        pending: 'Registration',
        success: 'Registration succeeded 👌',
        error: { render({ data }) { return `Registration has failed. Error: ${data.message} 🤯` } }
    }
)

export const postGoogleAccount = async data => await toast.promise(
    authorizeGoogleAccount(data?.tokenId),
    {
        pending: 'Google authorization',
        success: { render({ data }) { return `Hello, ${data.data.user.name}. Please enjoy reading 👌` } },
        error: { render({ data }) { return `Google authorization has failed. Error: ${data.message} 🤯` } }
    }
)

export const fetchUserRatings = async userId => await getUserRatings(userId)