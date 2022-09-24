import { language } from './../../utility/commonTypes';
import { getVoteSavedText } from './translatedText/translatedText';
import { toast } from "react-toastify"
import { setBookRating } from "../../utility/AxiosService"

export const postBookRating = async (bookId: string, userId: string, ratingValue: number, language: language) => await toast.promise(
    setBookRating(bookId, userId, ratingValue),
    {
        pending: 'Pending',
        success: `${getVoteSavedText(language)} 👌`,
        error: { render({ data }: any) { return `An unexpected error: ${data.message} 🤯` } }
    }
)