import { bookFormats } from './../../utility/commonTypes';
import { toast } from "react-toastify";
import { addBookFile, deleteBookFile } from "../../utility/AxiosService";

export const postDeletionOfBookFile = async (currentBookId: string, currentBookFormat: bookFormats) => await toast.promise(
    deleteBookFile(currentBookId, currentBookFormat),
    {
        pending: 'Pending',
        success: `The book has been deleted 👌`,
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)

export const postAddingOfBookFile = async (formData: any) => await toast.promise(
    addBookFile(formData),
    {
        pending: 'Pending',
        success: `The book has been addedd 👌`,
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)
