import React from 'react'
import s from './AuthorizationModal.module.css'
import { TiSocialGooglePlus } from 'react-icons/ti'

const AuthorizationModal = ({ isLoginModal, isSignUpModal, setIsLoginModal, setIsSignUpModal }) => {
    return (
        <div onClick={() => { setIsLoginModal(false); setIsSignUpModal(false) }} className={isLoginModal || isSignUpModal ? `${s.authorizationModal} ${s.active}` : s.authorizationModal}>
            <div onClick={e => e.stopPropagation()} className={isLoginModal || isSignUpModal ? `${s.authorizationModalContent} ${s.active}` : s.authorizationModalContent}>

                <div className={s.signUpModalContent}>
                    <div className={s.title} level='h1'>{isSignUpModal && 'SIGN UP'}
                        {isLoginModal && 'LOGIN'}</div>
                    <form>
                        <label className={s.email}>
                            <p>{isSignUpModal && 'Your Email:'}
                                {isLoginModal && 'Email:'}</p>
                            <input type='email' />
                        </label>
                        <label className={s.password}>
                            <p>{isSignUpModal && 'Create a new password:'}
                                {isLoginModal && 'Password:'}</p>
                            <input type='password' />
                        </label>
                    </form>
                </div>

                <button className={s.button}>
                    <span className={s.text}>{isSignUpModal && 'Register'}
                        {isLoginModal && 'Login'}</span>
                </button>
                <button className={s.googltButton}>
                    <span className={s.googleText}>Login with Google</span>
                    <TiSocialGooglePlus className={s.icon} />
                </button>
            </div>
        </div>
    )
}

export default AuthorizationModal