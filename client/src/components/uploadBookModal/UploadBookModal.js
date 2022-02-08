import React, { useContext, useEffect, useState } from 'react'
import s from './UploadBookModal.module.css'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { toast } from 'react-toastify'
import { setClientSideError, setServerSideError } from '../../utility/ErrorHelper';
import { uploadBook } from '../../utility/AxiosService';

const UploadBookInput = ({ errors, register, type, item }) => {
    return (
        <div className={s.wrapper}>
            <input className={errors[item] ? `${s.input} ${s.invalidInput}` : s.input} type={type} placeholder={item}
                {...register(item)} />
            {errors[item] && <p>{item} is required.</p>}
        </div>
    )
}

const UploadBookModal = ({ isUploadModal, setIsUploadModal }) => {
    const { user } = useContext(UserContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const onSubmit = async e => {
        try {
            const formData = new FormData()
            formData.append('book', e.pdfRU[0])
            formData.append('book1', e.pdfEN[0])
            const some = await uploadBook(formData)
            // setIsUploaded(true)
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
                <div className={s.title} level='h1'>
                    Upload Book
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <UploadBookInput errors={errors} register={register} type='text' item='titleRU' />
                    <UploadBookInput errors={errors} register={register} type='text' item='titleEN' />
                    <UploadBookInput errors={errors} register={register} type='text' item='titleAM' />
                    <UploadBookInput errors={errors} register={register} type='text' item='descriptionRU' />
                    <UploadBookInput errors={errors} register={register} type='text' item='descriptionEN' />
                    <UploadBookInput errors={errors} register={register} type='text' item='descriptionAM' />
                    <UploadBookInput errors={errors} register={register} type='text' item='authorRU' />
                    <UploadBookInput errors={errors} register={register} type='text' item='authorEN' />
                    <UploadBookInput errors={errors} register={register} type='text' item='authorAM' />
                    <UploadBookInput errors={errors} register={register} type='date' item='date' />
                    <UploadBookInput errors={errors} register={register} type='text' item='topic' />
                    <UploadBookInput errors={errors} register={register} type='text' item='literature' />
                    <UploadBookInput errors={errors} register={register} type='file' item='pdfRU' />
                    <UploadBookInput errors={errors} register={register} type='file' item='pdfEN' />
                    <UploadBookInput errors={errors} register={register} type='file' item='pdfAM' />
                    <UploadBookInput errors={errors} register={register} type='file' item='epubRU' />
                    <UploadBookInput errors={errors} register={register} type='file' item='epubEN' />
                    <UploadBookInput errors={errors} register={register} type='file' item='epubAM' />
                    <UploadBookInput errors={errors} register={register} type='file' item='image' />
                    <input type='submit' value='Upload the book' />
                </form>
            </div>
        </div>
    )
}

export default UploadBookModal