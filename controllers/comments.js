import { getDecodedUserData, isAdminUser } from '../middleware/adminAuth.js'
import Comment from '../models/comment.js'

export const createComment = async (req, res) => {
    const { userId, userName, parentId, body } = req.body

    try {
        const createdComment = await Comment.create({ userId, userName, parentId, body, createdDate: new Date() })
        res.status(201).json({ createdComment })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateComment= async (req, res) => {
    const { commentId, body, userId } = req.body

    try {
        const decodedUserData = getDecodedUserData(req)
        if (decodedUserData.id !== userId) return res.status(401).json({ message: 'Invalid credentials' })

        const updatedComment = await Comment.findByIdAndUpdate(commentId, { body, isUpdated: true }, { new: true })
        res.status(201).json({ updatedComment })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteComment = async (req, res) => {
    const { commentId, userId } = req.body


    try {
        const decodedUserData = getDecodedUserData(req)
        if (!isAdminUser(decodedUserData) && decodedUserData.id !== userId) return res.status(401).json({ message: 'Invalid credentials' })
    
        await Comment.deleteOne({ _id: commentId })
        res.status(201).json()
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getComments = async (req, res) => {
    const { parentId } = req.query

    try {
        const comments = await Comment.find({ parentId })
        res.status(201).json({ comments })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const reactComment = async (req, res) => {
    const { commentId, userId, isLike } = req.body
    try {
        const oldCommentData = await Comment.findById(commentId)
        if (!oldCommentData) return res.status(401).json({ message: 'Comment is not available' })

        const isLiked = oldCommentData.likes.find(likeUserId => likeUserId === userId)
        const isDisliked = oldCommentData.dislikes.find(dislikeUserId => dislikeUserId === userId)

        let commentData
        if (isLike && isLiked) {
            commentData = await Comment.findByIdAndUpdate(commentId, { likes: oldCommentData.likes.filter(reactionUserId => reactionUserId !== userId) }, { new: true })
        } else if (isLike && isDisliked) {
            commentData = await Comment.findByIdAndUpdate(commentId, { dislikes: oldCommentData.dislikes.filter(reactionUserId => reactionUserId !== userId), likes: [...oldCommentData.likes, userId] }, { new: true })
        } else if (!isLike && isLiked) {
            commentData = await Comment.findByIdAndUpdate(commentId, { likes: oldCommentData.likes.filter(reactionUserId => reactionUserId !== userId), dislikes: [...oldCommentData.dislikes, userId] }, { new: true })
        } else if (!isLike, isDisliked) {
            commentData = await Comment.findByIdAndUpdate(commentId, { dislikes: oldCommentData.dislikes.filter(reactionUserId => reactionUserId !== userId) }, { new: true })
        } else if (isLike) {
            commentData = await Comment.findByIdAndUpdate(commentId, { likes: [...oldCommentData.likes, userId] }, { new: true })
        } else if (!isLike) {
            commentData = await Comment.findByIdAndUpdate(commentId, { dislikes: [...oldCommentData.dislikes, userId] }, { new: true })
        }

        res.status(201).json({ likes: commentData.likes, dislikes: commentData.dislikes })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error })
    }
}