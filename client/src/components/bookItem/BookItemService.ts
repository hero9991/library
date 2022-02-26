import { book, user, language } from './../../utility/commonTypes';
import { toast } from "react-toastify";
import { addOrRemoveBook } from "../../utility/AxiosService";
import { TITLE } from "../../utility/Constants";

export const postAddOrRemoveBook = async (bookItem: book, user: user, language: language) => await toast.promise(
    addOrRemoveBook(bookItem._id, user._id),
    {
        pending: 'Pending',
        success: {
            render({ data }: any) {
                return data.data.length > user.books.length
                    ? `${bookItem[(TITLE + language) as keyof book]} has been added 👌`
                    : `${bookItem[(TITLE + language) as keyof book]} has been deleted 👌`
            }
        },
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)