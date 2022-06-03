import { useContext } from 'react'
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
import AuthorizationInput from './authorizationInput/AuthorizationInput';

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
                            {isSignUpModal && <AuthorizationInput 
                                inputArea='firstName' inputType={TEXT}
                                errors={errors} register={register}
                                placeholder={getFirstNameText(language)}
                                errorText={getFirstNameErrorText(language)}
                                validationObject={{ required: true }}/>
                            }
                            {isSignUpModal && <AuthorizationInput 
                                inputArea='lastName' inputType={TEXT}
                                errors={errors} register={register}
                                placeholder={getLastNameText(language)}
                                errorText={getLastNameErrorText(language)}
                                validationObject={{ required: true }}/>
                            }
                        </div>
                        <AuthorizationInput 
                            inputArea={EMAIL} inputType={EMAIL}
                            errors={errors} register={register}
                            placeholder={getEmailText(language)}
                            errorText={getEmailErrorText(language)}
                            validationObject={{ onChange: () => clearErrors(COMMON), required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ }}/>
                        <div className={s.passwordWrapper}>
                            <AuthorizationInput 
                                inputArea={PASSWORD} inputType={PASSWORD}
                                errors={errors} register={register}
                                placeholder={getPasswordText(language)} 
                                errorText={getPasswordErrorText(language)} 
                                validationObject={{ onChange: () => clearErrors(COMMON), required: true, minLength: 6 }}/>
                            {isSignUpModal && <AuthorizationInput 
                                inputArea='confirmPassword' inputType={PASSWORD} 
                                errors={errors} register={register} 
                                placeholder={getConfirmPasswordText(language)} 
                                errorText={getConfirmPasswordErrorText(language)} 
                                validationObject={{ onChange: () => clearErrors(COMMON), required: true }}/>
                            }
                        </div> 
                        {errors.common && <p className={s.errorText}>{errors.common.message}</p>}
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
                {errors.google && <p className={s.errorText}>{errors.google.message}</p>}
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