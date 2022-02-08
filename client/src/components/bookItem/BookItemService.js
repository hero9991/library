import { toast } from "react-toastify";
import { addOrRemoveBook } from "../../utility/AxiosService";

export const postAddOrRemoveBook = async (bookItem, user) => await toast.promise(
    addOrRemoveBook(bookItem._id, user._id),
    {
        pending: 'Pending',
        success: {
            render({ data }) {
                return data.data.length > user.books.length
                    ? `${bookItem.title} has been added 👌`
                    : `${bookItem.title} has been deleted 👌`
            }
        },
        error: { render({ data }) { return `${data.message} 🤯` } }
    }
)