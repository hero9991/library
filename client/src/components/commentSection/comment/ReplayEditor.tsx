import { Editor } from "react-draft-wysiwyg"
import { EditorState, ContentState, convertToRaw } from "draft-js"
import { comment, UserContextInterface } from "../../../utility/commonTypes"
import s from "../CommentSection.module.css"
import { useContext, useState } from "react"
import { UserContext } from "../../../App"
import { postCreateComment } from "../CommentSectionService"
import { toolbar } from "../ToolbarConfig"
import { toast } from "react-toastify"
import { getReplayText } from "../translatedText/translatedText"
import { getUnauthorizedWarningText } from "../../../utility/Constants"
import ReactGA from 'react-ga'

const ReplayEditor = ({ comments, setComments, setIsReplaying, parentId, targetName, setIsCollapsed }: Props) => {
    const { user, language } = useContext<UserContextInterface>(UserContext)
    const [editorState, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(targetName)))

    const isButtonDisabled = !editorState.getCurrentContent().hasText() || !editorState.getCurrentContent().getPlainText().trim()


    const editorStateHandler = (editorState: any) => {
        setEditorState(editorState)
    }

    const createSubcomment = async (e: any) => {
        if (!user) return toast.warning(getUnauthorizedWarningText(language))

        const commentBody = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        const response = await postCreateComment(user._id, user.name, parentId, commentBody, language)
        setComments([...comments, response.data.createdComment])
        setIsReplaying(false)
        setIsCollapsed(true)
        ReactGA.event({
            category: 'Comment',
            action: 'Created a subcoment'
        })
    }

    return (
        <div className={s.subcommentWrapper}>
            <div className={s.comment}>
                <p className={s.commentTitle}>
                    <span className={s.userName}>
                        {user?.name}
                    </span>
                </p>
                <Editor
                    toolbar={toolbar(s.inputToolbarInline, s.inputToolbarList, s.inputToolbarEmoji, s.inputToolbarPopupEmoji)}
                    toolbarClassName={`${s.commentToolbar} ${s.active}`}
                    editorClassName={`${s.inputComment} ${s.editing}`}
                    editorState={editorState}
                    onEditorStateChange={editorStateHandler}
                    toolbarCustomButtons={[
                        <button
                            onClick={createSubcomment}
                            className={isButtonDisabled ? s.saveButton : `${s.saveButton} ${s.acitve}`}
                            disabled={isButtonDisabled}>
                            {getReplayText(language)}
                        </button>
                    ]}
                />
            </div>
        </div>
    )
}

interface Props {
    comments: comment[]
    setComments: any
    setIsReplaying: any
    parentId: string,
    targetName: string,
    setIsCollapsed: any
}

export default ReplayEditor