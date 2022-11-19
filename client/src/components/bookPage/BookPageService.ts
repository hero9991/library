import { toast } from "react-toastify";
import { addBookImage, deleteBookImage } from "../../utility/AxiosService";

export const postDeletionOfBookImage = async (currentBookId: string) => await toast.promise(
    deleteBookImage(currentBookId),
    {
        pending: 'Pending',
        success: `The image has been deleted 👌`,
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)

export const postAddingOfBookImage = async (formData: any) => await toast.promise(
    addBookImage(formData),
    {
        pending: 'Pending',
        success: `The image has been addedd 👌`,
        error: { render({ data }: any) { return `${data.message} 🤯` } }
    }
)
