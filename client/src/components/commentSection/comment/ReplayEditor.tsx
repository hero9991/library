import { comment, UserContextInterface } from "../../../utility/commonTypes"
import s from "../CommentSection.module.css"
import { useContext, useState } from "react"
import { UserContext } from "../../../App"
import { postCreateComment } from "../CommentSectionService"
import { toast } from "react-toastify"
import { getReplayText } from "../translatedText/translatedText"
import { getUnauthorizedWarningText } from "../../../utility/Constants"
import ReactGA from 'react-ga4'

const ReplayEditor = ({ comments, setComments, setIsReplaying, parentId, targetName, setIsCollapsed }: Props) => {
    const { user, language } = useContext<UserContextInterface>(UserContext)
    const [commentText, setCommentText] = useState(`@${targetName} `)

    const isButtonDisabled = !commentText.trim()


    const createSubcomment = async (e: any) => {
        if (!user) return toast.warning(getUnauthorizedWarningText(language))

        const commentBody = commentText
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
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write your reply..."
                    className={s.textarea}
                    rows={3}
                />
                <button
                    onClick={createSubcomment}
                    className={isButtonDisabled ? s.saveButton : `${s.saveButton} ${s.acitve}`}
                    disabled={isButtonDisabled}
                >
                    {getReplayText(language)}
                </button>
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
