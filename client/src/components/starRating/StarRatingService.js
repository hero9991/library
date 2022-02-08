import { toast } from "react-toastify"
import { setBookRating } from "../../utility/AxiosService"

export const postBookRating = async (bookId, userId, ratingValue) => await toast.promise(
    setBookRating(bookId, userId, ratingValue),
    {
        pending: 'Pending',
        success: 'Your vote is successfully saved 👌',
        error: { render({ data }) { return `An unexpected error: ${data.message} 🤯` } }
    }
)