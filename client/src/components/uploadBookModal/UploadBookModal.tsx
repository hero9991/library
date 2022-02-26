import React from 'react'
import s from './UploadBookModal.module.css'
import { useForm } from 'react-hook-form';
import { uploadBook } from '../../utility/AxiosService';
import { FILE, SUBMIT, TEXT } from '../../utility/Constants';

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

    const onSubmit = async (e: any) => {
        try {
            console.log(e.titleRU)
            const formData = new FormData()
            formData.append('titleRU', e.titleRU)
            formData.append('titleEN', e.titleEN)
            formData.append('titleAM', e.titleAM)
            formData.append('descriptionRU', e.descriptionRU)
            formData.append('descriptionEN', e.descriptionEN)
            formData.append('descriptionAM', e.descriptionAM)
            formData.append('authorRU', e.authorRU)
            formData.append('authorEN', e.authorEN)
            formData.append('authorAM', e.authorAM)
            formData.append('date', e.date)
            formData.append('topic', e.topic)
            formData.append('type', e.type)
    
            formData.append('pdfRU', e.pdfRU[0])
            formData.append('pdfEN', e.pdfEN[0])
            formData.append('pdfAM', e.pdfAM[0])
            formData.append('epubRU', e.epubRU[0])
            formData.append('epubEN', e.epubEN[0])
            formData.append('epubAM', e.epubAM[0])
            formData.append('image', e.image[0])
            await uploadBook(formData)
            reset()
        } catch (error) {
            console.log(error)
            console.log(33)
        }
    }

    const hidePopup = () => setIsUploadModal(false)

    return (
        <div onClick={hidePopup} className={isUploadModal ? `${s.uploadBookModal} ${s.active}` : s.uploadBookModal}>
            <div onClick={e => e.stopPropagation()} className={isUploadModal ? `${s.uploadBookModalContent} ${s.active}` : s.uploadBookModalContent}>
                <div className={s.title}>
                    Upload Book
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='titleRU' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='titleEN' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='titleAM' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='descriptionRU' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='descriptionEN' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='descriptionAM' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='authorRU' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='authorEN' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='authorAM' />
                    <UploadBookInput errors={errors} register={register} type='date' item='date' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='topic' />
                    <UploadBookInput errors={errors} register={register} type={TEXT} item='type' />
                    PDF RU
                    <UploadBookInput errors={errors} register={register} type={FILE} item='pdfRU' isOptional={true} />
                    PDF EN
                    <UploadBookInput errors={errors} register={register} type={FILE} item='pdfEN' isOptional={true} />
                    PDF AM
                    <UploadBookInput errors={errors} register={register} type={FILE} item='pdfAM' isOptional={true} />
                    EPUB RU
                    <UploadBookInput errors={errors} register={register} type={FILE} item='epubRU' isOptional={true} />
                    EPUB EN
                    <UploadBookInput errors={errors} register={register} type={FILE} item='epubEN' isOptional={true} />
                    EPUB AM
                    <UploadBookInput errors={errors} register={register} type={FILE} item='epubAM' isOptional={true}/>
                    IMAGE
                    <UploadBookInput errors={errors} register={register} type={FILE} item='image' />
                    <input type={SUBMIT} value='Upload the book' />
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