import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { comment, UserContextInterface } from "../../../utility/commonTypes"
import s from "../CommentSection.module.css"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../../App"
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from 'react-icons/ai'
import { postDeleteComment, postReactComment, postUpdateComment } from "../CommentSectionService"
import { toast } from "react-toastify"
import { toolbar } from "../ToolbarConfig"
import ReplayEditor from "./ReplayEditor"
import { getComments } from "../../../utility/AxiosService"
import { getTimeSince } from "../../../utility/Utility"
import { getCancelText, getChangeText, getDeleteText, getHideCommentsText, getReplayText, getShowCommentsText, getUpdatedText } from "../translatedText/translatedText"
import { getUnauthorizedWarningText } from "../../../utility/Constants"
import ReactGA from 'react-ga'

const Comment = ({ comment, comments, setComments, isSubcomment }: Props) => {
    const { user, language } = useContext<UserContextInterface>(UserContext)
    const [commentState, setCommentState] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(comment.body))))
    const [subcomments, setSubcomments] = useState<comment[]>([])
    const [isLiking, setIsLiking] = useState(false)
    const [isDisliking, setIsDisliking] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isReplaying, setIsReplaying] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)

    const isButtonDisabled = !commentState.getCurrentContent().hasText() || !commentState.getCurrentContent().getPlainText().trim()

    useEffect(() => {
        if (isSubcomment) return

        (async function () {
            try {
                setSubcomments((await getComments(comment._id)).data.comments)
            } catch (error) {
                toast.error(`Error ${error}`)
            }
        })()
    }, [comment._id, isSubcomment])

    const isLiked = () => comment.likes.find(userId => userId === user?._id)
    const isDisliked = () => comment.dislikes.find(userId => userId === user?._id)

    const likeComment = () => {
        reactComment(true)
    }
    const dislikeComment = () => {
        reactComment(false)        
    }
    const reactComment = async (isLike: boolean) => {
        if (!user) return toast.warning(getUnauthorizedWarningText(language))
        isLike ? setIsLiking(true) : setIsDisliking(true)
        try {
            const reactCommentData = await postReactComment(comment._id, user._id, isLike)
            setComments(comments.map(commentItem => commentItem._id === comment._id 
                ? { ...commentItem, likes: reactCommentData.data.likes, dislikes: reactCommentData.data.dislikes } 
                : commentItem))
        } catch (error) {
            toast.error(`Error ${error}`)
        } finally {
            isLike ? setIsLiking(false) : setIsDisliking(false)
            ReactGA.event({
                category: 'Comment',
                action: isLike ? 'Liked' : 'Disliked',
                label: comment._id
            })
        }
    }

    const replayToComment = () => {
        setIsReplaying(!isReplaying)
    }
    const deleteComment = async () => {
        ReactGA.event({
            category: 'Comment',
            action: 'Deleted',
            label: `User name: ${comment.userName}. Comment body: ${comment.body}`
        })
        await postDeleteComment(comment._id, comment.userId, language)
        setComments(comments.filter(commentItem => commentItem._id !== comment._id))
    }
    const changeComment = async () => {
        setIsEditing(!isEditing)
        ReactGA.event({
            category: 'Comment',
            action: 'Changed'
        })
    }
    const collapseSubcomments = () => {
        setIsCollapsed(!isCollapsed)
    }

    const commentStateHandler = (commentState: any) => {
        setCommentState(commentState)
    }

    const saveComent = async (e: any) => {
        if (document.activeElement) (document.activeElement as HTMLElement).blur();

        setIsEditing(false)
        const commentBody = JSON.stringify(convertToRaw(commentState.getCurrentContent()))
        if (comment.body === commentBody) return
        
        const updatedCommentData = await postUpdateComment(comment._id, commentBody, comment.userId, language)
        setComments(comments.map(commentItem => commentItem._id === comment._id 
            ? updatedCommentData.data.updatedComment
            : commentItem))
    }

    return (
        <div className={isSubcomment ? s.subcommentWrapper : s.commentWrapper}>
            <div className={s.comment}>
                <p className={s.commentTitle}>
                    <span className={s.userName}>
                        {comment.userName}
                    </span> - <span className={s.time}>
                        {getTimeSince(comment.createdDate, language)} {comment.isUpdated && `(${getUpdatedText(language)})`}
                    </span>
                </p>
                <Editor
                    readOnly={!isEditing}
                    toolbar={toolbar(s.inputToolbarInline, s.inputToolbarList, s.inputToolbarEmoji, s.inputToolbarPopupEmoji)}
                    toolbarClassName={isEditing ? `${s.commentToolbar} ${s.active}` : s.commentToolbar}
                    editorClassName={isEditing ? `${s.inputComment} ${s.editing}` : s.inputComment}
                    editorState={commentState}
                    onEditorStateChange={commentStateHandler}
                    toolbarCustomButtons={[
                        <button
                            onClick={saveComent}
                            className={isButtonDisabled ? s.saveButton : `${s.saveButton} ${s.acitve}`}
                            disabled={isButtonDisabled}>
                            Save
                        </button>
                    ]}
                />
                <div className={s.interactionSection}>
                    <div className={s.likeSection}>
                        <button onClick={likeComment} className={s.likeButton} disabled={isLiking}>
                            {
                                isLiked() 
                                    ? <AiFillLike className={s.reactionIcon}/>
                                    : <AiOutlineLike className={s.reactionIcon}/>
                            }
                        </button>
                        <span className={s.reactionCount}>{comment.likes.length || ''}</span>
                        <button onClick={dislikeComment} className={s.dislikeButton} disabled={isDisliking}>
                            {
                                isDisliked() 
                                    ? <AiFillDislike className={`${s.reactionIcon} ${s.dislikeButton}`}/> 
                                    : <AiOutlineDislike className={`${s.reactionIcon} ${s.dislikeButton}`}/>
                            }
                        </button>
                        <span className={s.reactionCount}>{comment.dislikes.length || ''}</span>
                    </div>
                    <div className={s.editingSection}>
                    <button onClick={replayToComment}>
                        {isReplaying ? <span className={s.cancelSpan}>{getCancelText(language)}</span> : getReplayText(language)}
                    </button>
                    {user?._id === comment.userId && <button onClick={changeComment}>
                        {isEditing ? <span className={s.cancelSpan}>{getCancelText(language)}</span> : getChangeText(language)}
                    </button>}
                    {(user?._id === comment.userId || user?.isAdmin) && !subcomments.length && <button onClick={deleteComment}>
                        {getDeleteText(language)}
                    </button>}
                    </div>
                    {subcomments.length !== 0 && <button onClick={collapseSubcomments} className={s.collapseButton}>
                        {isCollapsed ? getHideCommentsText(language) : `${getShowCommentsText(language)} (${subcomments.length})`}
                    </button>}
                </div>
            </div>
            {isReplaying && <ReplayEditor comments={isSubcomment ? comments : subcomments} setComments={isSubcomment ? setComments : setSubcomments} setIsReplaying={setIsReplaying} parentId={isSubcomment ? comment.parentId : comment._id} targetName={comment.userName} setIsCollapsed={setIsCollapsed}/>}
            {isCollapsed && subcomments.map(subcomment => <Comment key={subcomment._id} comment={subcomment} comments={subcomments} setComments={setSubcomments} isSubcomment={true}/>)}
        </div>
    )
}

interface Props {
	comment: comment
    comments: comment[]
    setComments: any,
    isSubcomment?: boolean
}

export default Comment