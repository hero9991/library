import { Editor } from "react-draft-wysiwyg"
import { EditorState, ContentState, convertToRaw } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import s from "./CommentSection.module.css"
import { toolbar } from "./ToolbarConfig"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import { comment, UserContextInterface } from "../../utility/commonTypes"
import { postCreateComment } from "./CommentSectionService"
import { toast } from "react-toastify"
import { getComments } from "../../utility/AxiosService"
import Comment from "./comment/Comment"
import { getPostsUpperText, getShareText } from "./translatedText/translatedText"
import { getUnauthorizedWarningText } from "../../utility/Constants"

const CommentSection = ({ bookId }: Props) => {
    const { user, language } = useContext<UserContextInterface>(UserContext)
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [comments, setComments] = useState<comment[]>([])

    const isButtonDisabled = !editorState.getCurrentContent().hasText() || !editorState.getCurrentContent().getPlainText().trim()

    useEffect(() => {
        (async function () {
            try {
                setComments((await getComments(bookId)).data.comments)
            } catch (error) {
                toast.error(`Error ${error}`)
            }
        })()

        return () => setComments([])
    }, [bookId])

    const editorStateHandler = (editorState: any) => {
        setEditorState(editorState)
    }

    const shareComent = async () => {
        if (!user) return toast.warning(getUnauthorizedWarningText(language))

        const commentBody = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        const response = await postCreateComment(user._id, user.name, bookId, commentBody, language)
        setComments([...comments, response.data.createdComment])
        setEditorState(EditorState.push(editorState, ContentState.createFromText('')))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>{getPostsUpperText(language)} {comments.length !== 0 && `(${comments.length})`} </div>
            <Editor
                editorState={editorState}
                toolbarClassName={s.inputToolbar}
                wrapperClassName={s.inputWrapper}
                editorClassName={s.inputEditor}
                toolbar={toolbar(s.inputToolbarInline, s.inputToolbarList, s.inputToolbarEmoji, s.inputToolbarPopupEmoji)}
                toolbarCustomButtons={[
                <button
                    onClick={shareComent}
                    className={isButtonDisabled ? s.shareButton : `${s.shareButton} ${s.acitve}`}
                    disabled={isButtonDisabled}>
                    {getShareText(language)}
                </button>
                ]}
                onEditorStateChange={editorStateHandler}
            />
            <div className={s.comments}>
                {comments.map(comment => <Comment key={comment._id} comment={comment} comments={comments} setComments={setComments}/>)} 
            </div>
        </div>
    )
}

interface Props {
	bookId: string
}

export default CommentSection
