import React, { useContext } from 'react'
import s from './AuthorizationModal.module.css'
import { TiSocialGooglePlus } from 'react-icons/ti'
import { GoogleLogin } from 'react-google-login'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { toast } from 'react-toastify'
import { fetchUserRatings, postGoogleAccount, postSignIn, postSignUp } from './AuthorizationService';
import { setClientSideError, setServerSideError } from '../../utility/ErrorHelper';

const AuthorizationModal = ({ isLoginModal, isSignUpModal, setIsLoginModal, setIsSignUpModal }) => {
    const { setUser } = useContext(UserContext)
    const {
        register,
        handleSubmit,
        reset,
        clearErrors,
        setError,
        formState: { errors }
    } = useForm()

    const submitLogin = async data => {
        try {
            clearErrors('common')

            const response = await postSignIn(data)
            const userIdToRating = await fetchUserRatings(response.data.user._id)

            localStorage.setItem('token', response.data.accessToken)
            setUser({ ...response.data.user, bookRatings: { ...userIdToRating.data.bookIdToRating } })

            setIsLoginModal(false)
        } catch (error) {
            setServerSideError(setError, error.response?.data?.message[0]?.msg || error.response?.data?.message)
        }
    }
    const submitRegister = async data => {
        try {
            if (data.password !== data.confirmPassword) return setClientSideError(setError, 'Passwords do not match')

            const response = await postSignUp(data)

            localStorage.setItem('token', response.data.accessToken)
            setUser({ ...response.data.user })

            setIsSignUpModal(false)
        } catch (error) {
            setServerSideError(setError, error.response?.data?.message[0]?.msg || error.response?.data?.message)
        }
    }

    const googleSuccess = async data => {
        const response = await postGoogleAccount(data)
        const userIdToRating = await fetchUserRatings(response.data.user._id)

        localStorage.setItem('token', response.data.accessToken)
        setUser({ ...response.data.user, bookRatings: { ...userIdToRating.data.bookIdToRating } })

        setIsSignUpModal(false)
        setIsLoginModal(false)
    }
    const googleFailure = error => {
        console.log(error)
        if (error?.error === 'popup_closed_by_user') return
        toast.error(`Authorization has failed. Error: ${error?.error}`)
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
                    <div className={s.title} level='h1'>{isSignUpModal && 'SIGN UP'}
                        {isLoginModal && 'LOGIN'}
                    </div>
                    <form>
                        <div className={s.nameWrapper}>
                            {isSignUpModal && <div>
                                <input className={errors.firstName ? `${s.input} ${s.invalidInput}` : s.input} type='text' placeholder='First Name'
                                    {...register('firstName', { required: true })} />
                                {errors.firstName && <p>First name is required.</p>}
                            </div>}
                            {isSignUpModal && <div>
                                <input className={errors.lastName ? `${s.input} ${s.invalidInput}` : s.input} type='text' placeholder='Last Name'
                                    {...register('lastName', { required: true })} />
                                {errors.lastName && <p>Last name is required.</p>}
                            </div>}
                        </div>
                        <input className={errors.email ? `${s.input} ${s.invalidInput}` : s.input} type='email' placeholder='Email'
                            {...register('email', { onChange: () => clearErrors('common'), required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                        {errors.email && <p>Email is not valid</p>}
                        <div className={s.passwordWrapper}>
                            <div>
                                <input className={errors.password ? `${s.input} ${s.invalidInput}` : s.input} type='password' placeholder='Password'
                                    {...register('password', { onChange: () => clearErrors('common'), required: true, minLength: 6 })} />
                                {errors.password && <p>Password is required.</p>}
                            </div>
                            {isSignUpModal && <div>
                                <input className={errors.confirmPassword ? `${s.input} ${s.invalidInput}` : s.input} type='password' placeholder='Confirm password'
                                    {...register('confirmPassword', { onChange: () => clearErrors('common'), required: true })} />
                                {errors.confirmPassword && <p>Passwordd confirmation is required.</p>}
                            </div>}
                        </div>
                        {errors.common && <p>{errors.common.message}</p>}
                    </form>
                </div>

                {isLoginModal && <button onClick={handleSubmit(submitLogin)} type='submit' className={s.button}>
                    <span className={s.text}>Login</span>
                </button>}
                {isSignUpModal && <button onClick={handleSubmit(submitRegister)} type='submit' className={s.button}>
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

export default AuthorizationModal