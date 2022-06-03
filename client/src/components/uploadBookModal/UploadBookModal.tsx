import s from './UploadBookModal.module.css'
import { useForm } from 'react-hook-form';
import { uploadBook } from '../../utility/AxiosService';
import { FILE, SUBMIT, TEXT } from '../../utility/Constants';
import { toast } from 'react-toastify';

const UploadBookInput = ({ errors, register, type, item, isOptional }: ChildProps) => {
    return (
        <div className={s.wrapper}>
            <input className={errors[item] ? `${s.input} ${s.invalidInput}` : s.input} type={type} placeholder={item}
                {...register(item, {required: !isOptional})} />
            {errors[item] && <p>{item} is required.</p>}
        </div>
    )
}

interface ChildProps {
    errors: any
    register: any
    type: string
    item: string
    isOptional?: boolean
}

const UploadBookModal = ({ isUploadModal, setIsUploadModal }: Props) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const bookKeys = ['titleRU',       'titleEN',       'titleAM', 
                      'descriptionRU', 'descriptionEN', 'descriptionAM', 
                      'authorRU',      'authorEN',      'authorAM',
                      'date',          'topic',         'type',
                      'pdfRU',         'pdfEN',         'pdfAM',
                      'epubRU',        'epubEN',        'epubAM',
                      'image'
    ]

    const onSubmit = async (e: any) => {
        try {
            const formData = new FormData()
            const getValue = (key: string, index: number) => index <= 11 ? e[key] : e[key][0]

            bookKeys.forEach((key, index) => formData.append(key, getValue(key, index)))

            await uploadBook(formData)
            reset()
        } catch (error) {
            toast.error(`Error ${error}`)
        }
    }

    const hidePopup = () => setIsUploadModal(false)

    return (
        <div onClick={hidePopup} className={isUploadModal ? `${s.uploadBookModal} ${s.active}` : s.uploadBookModal}>
            <div onClick={e => e.stopPropagation()} className={isUploadModal ? `${s.uploadBookModalContent} ${s.active}` : s.uploadBookModalContent}>
                <div className={s.title}>
                    Upload Book
                </div>
                <form className={s.mainForm} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {bookKeys.slice(0, 12).map(key => <UploadBookInput key={key} errors={errors} register={register} type={key === 'date' ? 'date' : TEXT} item={key} />)}
                    </div>
                    <div>
                        {bookKeys.slice(12).map((key, index) => <div key={key} >
                            {key}
                            <UploadBookInput errors={errors} register={register} type={FILE} item={key} isOptional={key !== 'image'} />
                        </div>)}
                    </div>
                    <input className={s.uploadButton} type={SUBMIT} value='Upload the book' />
                </form>
            </div>
        </div>
    )
}

interface Props {
    isUploadModal: boolean
    setIsUploadModal: any
}

export default UploadBookModal