import { toast } from "react-toastify";
import { addOrRemoveBook } from "../../utility/AxiosService";
import { TITLE } from "../../utility/Constants";

export const postAddOrRemoveBook = async (bookItem, user, language) => await toast.promise(
    addOrRemoveBook(bookItem._id, user._id),
    {
        pending: 'Pending',
        success: {
            render({ data }) {
                return data.data.length > user.books.length
                    ? `${bookItem[TITLE + language]} has been added 👌`
                    : `${bookItem[TITLE + language]} has been deleted 👌`
            }
        },
        error: { render({ data }) { return `${data.message} 🤯` } }
    }
)