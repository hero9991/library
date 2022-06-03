import { book, user } from './../../utility/commonTypes';
import { toast } from "react-toastify";
import { addOrRemoveBook } from "../../utility/AxiosService";

export const postAddOrRemoveBook = async (bookItem: book, user: user, titleKey: keyof book) => await toast.promise(
    addOrRemoveBook(bookItem._id, user._id),
    {
        pending: 'Pending',
        success: {
            render({ data }: any) {
                return data.data.length > user.books.length
                    ? `${bookItem[titleKey]} has been added 👌`
                    : `${bookItem[titleKey]} has been deleted 👌`
            }
        },
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)