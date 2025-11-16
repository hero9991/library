import { language } from './../../utility/commonTypes';
import { toast } from "react-toastify"
import { createComment, deleteComment, reactComent, updateComment } from "../../utility/AxiosService"
import { getCommentDeletedText, getCommentSavedText, getCommentUpdatedText } from "./translatedText/translatedText"

export const postCreateComment = async (userId: string, userName: string, parentId: string, body: string, language: language) => await toast.promise(
    createComment(userId, userName, parentId, body),
    {
        pending: 'Pending',
        success: getCommentSavedText(language),
        error: {
            render({ data }: any) { return `${data.message} 🤯` }
        }
    }
)

export const postReactComment = async (commentId: string, userId: string, isLike: boolean) => await toast.promise(
    reactComent(commentId, userId, isLike),
    {
        error: {
            render({ data }: any) { return `${data.message} 🤯` }
        }
    }
)

export const postDeleteComment = async (commentId: string, userId: string, language: language) => await toast.promise(
    deleteComment(commentId, userId),
    {
        pending: 'Pending',
        success: getCommentDeletedText(language),
        error: {
            render({ data }: any) { return `${data.message} 🤯` }
        }
    }
)

export const postUpdateComment = async (commentId: string, body: string, userId: string, language: language) => await toast.promise(
    updateComment(commentId, body, userId),
    {
        pending: 'Pending',
        success: getCommentUpdatedText(language),
        error: {
            render({ data }: any) { return `${data.message} 🤯` }
        }
    }
)