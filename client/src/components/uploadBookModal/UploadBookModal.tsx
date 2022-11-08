import s from './UploadBookModal.module.css'
import { useForm } from 'react-hook-form';
import { updateBookInfo, uploadBook } from '../../utility/AxiosService';
import { COMMON, FILE, SUBMIT, TEXT } from '../../utility/Constants';
import { toast } from 'react-toastify';
import { setClientSideError } from '../../utility/ErrorHelper';
import { topics, types } from '../../utility/commonTypes';
import { useState } from 'react';

const UploadBookInput = ({ errors, register, clearErrors, type, item, isOptional, isUpdate }: ChildProps) => {
    const isRequired = !isOptional && !isUpdate;

    return (
        <div className={s.wrapper}>
            {item.includes('description')
                ? <textarea className={errors[item] ? `${s.input} ${s.invalidInput}` : s.input} type={type} placeholder={item} 
                {...register(item, {required: isRequired})} />
                : (item.includes('topic') || item.includes('type'))
                    ? <input className={errors[item] ? `${s.input} ${s.invalidInput}` : s.input} type={type} placeholder={item}
                    {...register(item, { onChange: () => clearErrors(COMMON), required: isRequired})} />
                    : <input className={errors[item] ? `${s.input} ${s.invalidInput}` : s.input} type={type} placeholder={item}
                    {...register(item, {required: isRequired})} />}
            {errors[item] && <p>{item} is required.</p>}
        </div>
    )
}

interface ChildProps {
    errors: any
    register: any
    clearErrors: any
    type: string
    item: string
    isOptional?: boolean
    isUpdate?: boolean
}

const UploadBookModal = ({ isUploadModal, setIsUploadModal, bookId, setCurrentBook }: Props) => {
    const [isDisabledButton, setIsDisabledButton] = useState(false)
    const { register, handleSubmit, reset, clearErrors, setError, formState: { errors } } = useForm()
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
            if (isDisabledButton) return

            setIsDisabledButton(true)
            const formData = new FormData()
            const getValue = (key: string, index: number) => index <= 11 ? addBreakForDescriptioins(e[key], key) : e[key] && e[key][0]
            const addBreakForDescriptioins = (value: string, key: string) => key.includes('description') ? value.replace(/\\n/g, "\n") : value
            bookKeys.forEach((key, index) => getValue(key, index) && formData.append(key, getValue(key, index)))

            if (formData.get('type') && !isTypeTypes(formData.get('type') as string)) return setClientSideError(setError, 'Correct the type field: it can be either literature or history or article')
            if (formData.get('topic') && !isTypeTopics(formData.get('topic') as string)) return setClientSideError(setError, `Correct the topic field: it can be: 'literature', 'novels', 'historicalNovels', 'epics', 'poems', 'biographies', 'culture', 'fromPoliticians', 'lettersAndDocuments', 'sovietHistoriography', 'historicalWritings', 'outstandingArmenians', 'history', 'economy', 'politics', 'philosophy', 'religion', 'law', 'others'`)
            
            if (bookId) {
                formData.append('bookId', bookId)
                const currentBook = await updateBookInfo(formData) 
                setCurrentBook(currentBook.data.updatedBook)
            } else {
                await uploadBook(formData)
            }

            reset()
        } catch (error) {
            toast.error(`Error ${error}`)
        } finally {
            setIsDisabledButton(false)
        }
    }

    const isTypeTypes = (inputString: string): inputString is types => 
        ['literature', 'history', 'article'].includes(inputString)

    const isTypeTopics = (inputString: string): inputString is topics => 
        [
            'literature', 'novels', 'historicalNovels', 'epics', 'poems', 'biographies', 
            'culture', 'fromPoliticians', 'lettersAndDocuments', 'sovietHistoriography', 'historicalWritings', 'outstandingArmenians',
            'history', 'economy', 'politics', 'philosophy', 'religion', 'law', 'others'
        ].includes(inputString)
    

    const hidePopup = () => setIsUploadModal(false)

    return (
        <div onClick={hidePopup} className={isUploadModal ? `${s.uploadBookModal} ${s.active}` : s.uploadBookModal}>
            <div onClick={e => e.stopPropagation()} className={isUploadModal ? `${s.uploadBookModalContent} ${s.active}` : s.uploadBookModalContent}>
                <div className={s.title}>
                    Upload Book
                </div>
                <form className={s.mainForm} onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        {bookKeys.slice(0, 12).map(key => <UploadBookInput key={key} errors={errors} register={register} clearErrors={clearErrors} type={key === 'date' ? 'date' : TEXT} item={key} isUpdate={!!bookId}/>)}
                    </div>
                    {!bookId && <div>
                        {bookKeys.slice(12).map((key, index) => <div key={key} >
                            {key}
                            <UploadBookInput errors={errors} register={register} clearErrors={clearErrors} type={FILE} item={key} isOptional={key !== 'image'}/>
                        </div>)}
                    </div>}
                    <input className={isDisabledButton ? s.disabledButton : s.uploadButton} type={SUBMIT} value={bookId ? 'Update the book' : 'Upload the book'} />
                    {errors.common && <p className={s.errorText}>{errors.common.message}</p>}
                </form>
            </div>
        </div>
    )
}

interface Props {
    isUploadModal: boolean
    setIsUploadModal: any
    bookId?: string
    setCurrentBook?: any
}

export default UploadBookModal