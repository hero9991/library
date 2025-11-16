import s from "./CommentSection.module.css"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import { comment, UserContextInterface } from "../../utility/commonTypes"
import { postCreateComment } from "./CommentSectionService"
import { toast } from "react-toastify"
import { getComments } from "../../utility/AxiosService"
import Comment from "./comment/Comment"
import { getPostsUpperText, getShareText } from "./translatedText/translatedText"
import { getUnauthorizedWarningText } from "../../utility/Constants"
import ReactGA from 'react-ga4'

const CommentSection = ({ bookId }: Props) => {
    const { user, language } = useContext<UserContextInterface>(UserContext)
    const [commentText, setCommentText] = useState("")
    const [comments, setComments] = useState<comment[]>([])

    const isButtonDisabled = !commentText.trim()

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

    const shareComent = async () => {
        if (!user) return toast.warning(getUnauthorizedWarningText(language))

        const commentBody = commentText
        const response = await postCreateComment(user._id, user.name, bookId, commentBody, language)
        setComments([...comments, response.data.createdComment])
        setCommentText("")
        ReactGA.event({
            category: 'Comment',
            action: 'Created a parent comment'
        })
    }

    return (
        <div className={s.wrapper}>
            <div className={s.header}>{getPostsUpperText(language)} {comments.length !== 0 && `(${comments.length})`} </div>
            <div className={s.inputWrapper}>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Share your thoughts..."
                    className={s.textarea}
                    rows={3}
                />
                <button
                    onClick={shareComent}
                    className={isButtonDisabled ? s.shareButton : `${s.shareButton} ${s.acitve}`}
                    disabled={isButtonDisabled}
                >
                    {getShareText(language)}
                </button>
            </div>
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
