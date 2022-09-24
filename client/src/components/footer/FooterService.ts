import { language } from './../../utility/commonTypes';
import { setUserLanguage } from "../../utility/AxiosService"
import { toast } from "react-toastify";
import { getLanguageUpdatedText } from './translatedText/translatedText';

export const postUserLanguage = async (language: language, userId: string) => await toast.promise(
    setUserLanguage(language, userId),
    {
        pending: 'Pending',
        success: `${getLanguageUpdatedText(language)} 👌`,
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)