import React, { useContext } from 'react'
import s from './AuthorizationModal.module.css'
import { TiSocialGooglePlus } from 'react-icons/ti'
import { GoogleLogin } from 'react-google-login'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { toast } from 'react-toastify'
import { fetchUserRatings, postGoogleAccount, postSignIn, postSignUp } from './AuthorizationService';
import { setClientSideError, setServerSideError } from '../../utility/ErrorHelper';
import { COMMON, EMAIL, PASSWORD, SUBMIT, TEXT, TOKEN } from '../../utility/Constants';
import { getConfirmPasswordErrorText, getConfirmPasswordText, getEmailErrorText, getEmailText, getFirstNameErrorText, getFirstNameText, getLastNameErrorText, getLastNameText, getPasswordErrorText, getPasswordText } from './translatedText/translatedText';
import { UserContextInterface } from '../../utility/commonTypes';

const AuthorizationModal = ({ isLoginModal, isSignUpModal, setIsLoginModal, setIsSignUpModal }: Props) => {
    const { setUser, language } = useContext<UserContextInterface>(UserContext)
    const { register, handleSubmit, reset, clearErrors, setError, formState: { errors } } = useForm()

    const submitLogin = async (data: any) => {
        try {
            clearErrors(COMMON)

            enterUser(true, postSignIn, data)
        } catch (error: any) {
            setServerSideError(setError, error.response?.data?.message[0]?.msg || error.response?.data?.message)
        }
    }
    const submitRegister = async (data: any) => {
        try {
            if (data.password !== data.confirmPassword) return setClientSideError(setError, getConfirmPasswordErrorText(language))

            enterUser(false, postSignUp, data)
        } catch (error: any) {
            setServerSideError(setError, error.response?.data?.message[0]?.msg || error.response?.data?.message)
        }
    }

    const googleSuccess = async (data: any) => {
        enterUser(true, postGoogleAccount, data)
    }
    const googleFailure = (error: any) => {
        if (error?.error === 'popup_closed_by_user') return
        toast.error(`Authorization has failed. Error: ${error?.error}`)
    }

    const enterUser = async (isLogin: boolean, signUser: any, data: any) => {
        const response: any = await signUser(data)
        const userRatingResponse: any = isLogin && await fetchUserRatings(response.data.user._id)

        localStorage.setItem(TOKEN, response.data.accessToken)
        isLogin
            ? setUser({ ...response.data.user, bookRatings: { ...userRatingResponse.data.bookIdToRating } })
            : setUser({ ...response.data.user })

        hidePopup()
    }

    const hidePopup = () => {
        setIsLoginModal(false)
        setIsSignUpModal(false)
        reset()
    }

    return (
        <div onClick={hidePopup} className={isLoginModal || isSignUpModal ? `${s.authorizationModal} ${s.active}` : s.authorizationModal}>
            <div onClick={e => e.stopPropagation()} className={isLoginModal || isSignUpModal ? `${s.authorizationModalContent} ${s.active}` : s.authorizationModalContent}>

                <div className={s.signUpModalContent}>
                    <div className={s.title} >{isSignUpModal && 'SIGN UP'}
                        {isLoginModal && 'LOGIN'}
                    </div>
                    <form>
                        <div className={s.nameWrapper}>
                            {isSignUpModal && <div>
                                <input className={errors.firstName ? `${s.input} ${s.invalidInput}` : s.input} type={TEXT} placeholder={getFirstNameText(language)}
                                    {...register('firstName', { required: true })} />
                                {errors.firstName && <p>{getFirstNameErrorText(language)}</p>}
                            </div>}
                            {isSignUpModal && <div>
                                <input className={errors.lastName ? `${s.input} ${s.invalidInput}` : s.input} type={TEXT} placeholder={getLastNameText(language)}
                                    {...register('lastName', { required: true })} />
                                {errors.lastName && <p>{getLastNameErrorText(language)}</p>}
                            </div>}
                        </div>
                        <input className={errors.email ? `${s.input} ${s.invalidInput}` : s.input} type={EMAIL} placeholder={getEmailText(language)}
                            {...register(EMAIL, { onChange: () => clearErrors(COMMON), required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                        {errors.email && <p>{getEmailErrorText(language)}</p>}
                        <div className={s.passwordWrapper}>
                            <div>
                                <input className={errors.password ? `${s.input} ${s.invalidInput}` : s.input} type={PASSWORD} placeholder={getPasswordText(language)}
                                    {...register(PASSWORD, { onChange: () => clearErrors(COMMON), required: true, minLength: 6 })} />
                                {errors.password && <p>{getPasswordErrorText(language)}</p>}
                            </div>
                            {isSignUpModal && <div>
                                <input className={errors.confirmPassword ? `${s.input} ${s.invalidInput}` : s.input} type={PASSWORD} placeholder={getConfirmPasswordText(language)}
                                    {...register('confirmPassword', { onChange: () => clearErrors(COMMON), required: true })} />
                                {errors.confirmPassword && <p>{getConfirmPasswordErrorText(language)}</p>}
                            </div>}
                        </div>
                        {errors.common && <p>{errors.common.message}</p>}
                    </form>
                </div>

                {isLoginModal && <button onClick={handleSubmit(submitLogin)} type={SUBMIT} className={s.button}>
                    <span className={s.text}>Login</span>
                </button>}
                {isSignUpModal && <button onClick={handleSubmit(submitRegister)} type={SUBMIT} className={s.button}>
                    <span className={s.text}>Register</span>
                </button>}

                <GoogleLogin
                    clientId='208387666655-60v8vkeqm93jk2fh4torolipcnnu96lv.apps.googleusercontent.com'
                    render={renderProps => (
                        <button className={s.googltButton} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <span className={s.googleText}>Login with Google</span>
                            <TiSocialGooglePlus className={s.icon} />
                        </button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'
                />
                {errors.google && <p>{errors.google.message}</p>}
            </div>
        </div>
    )
}

interface Props {
    isLoginModal: boolean
    isSignUpModal: boolean
    setIsLoginModal: any
    setIsSignUpModal: any
}

export default AuthorizationModal