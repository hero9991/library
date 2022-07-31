import { language } from './../../utility/commonTypes';
import { setUserLanguage } from "../../utility/AxiosService"
import { toast } from "react-toastify";

export const postUserLanguage = async (language: language, userId: string) => await toast.promise(
    setUserLanguage(language, userId),
    {
        pending: 'Pending',
        success: `language has been set 👌`,
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)