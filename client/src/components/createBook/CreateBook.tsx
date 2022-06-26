import { useState } from "react"
import UploadBookModal from "../uploadBookModal/UploadBookModal"
// import s from './CreateBook.module.css'

const CreateBook = () => {
    const [isUploadModal, setIsUploadModal] = useState(false)
    const toggleModal = () => setIsUploadModal(!isUploadModal)

    return (
        <div>
            <button onClick={toggleModal} >Create Book</button>
            <UploadBookModal isUploadModal={isUploadModal} setIsUploadModal={setIsUploadModal}/>
        </div>
    )
}

export default CreateBook
 