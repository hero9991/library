import { book, user, language } from './../../utility/commonTypes';
import { toast } from "react-toastify";
import { addOrRemoveBook } from "../../utility/AxiosService";
import { getAddedText, getDeletedText } from './translatedText/translatedText';

export const postAddOrRemoveBook = async (bookItem: book, user: user, titleKey: keyof book, language: language) => await toast.promise(
    addOrRemoveBook(bookItem._id, user._id),
    {
        pending: 'Pending',
        success: {
            render({ data }: any) {
                return data.data.userBookIds.length > user.books.length
                    ? `${bookItem[titleKey]} ${getAddedText(language)} 👌`
                    : `${bookItem[titleKey]} ${getDeletedText(language)} 👌`
            }
        },
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)