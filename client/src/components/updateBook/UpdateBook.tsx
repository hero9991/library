import { useState } from "react"
import UploadBookModal from "../uploadBookModal/UploadBookModal"
import s from './UpdateBook.module.css'
import { RiEdit2Line } from 'react-icons/ri'

const UpdateBook = ({ bookId, setCurrentBook }: Props) => {
    const [isUploadModal, setIsUploadModal] = useState(false)
    const toggleModal = () => setIsUploadModal(!isUploadModal)

    return (
        <div>
            <RiEdit2Line onClick={toggleModal} className={s.editButton}/>
            <UploadBookModal isUploadModal={isUploadModal} setIsUploadModal={setIsUploadModal} bookId={bookId} setCurrentBook={setCurrentBook}/>
        </div>
    )
}

interface Props {
    bookId: string
    setCurrentBook: any
}

export default UpdateBook
