import React, { useState } from 'react'
import s from './AuthorizationModal.module.css'
import { TiSocialGooglePlus } from 'react-icons/ti'
import { GoogleLogin } from 'react-google-login'
import { authorizeGoogle, signIn, signUp } from '../../utility/AxiosService'

const AuthorizationModal = ({ isLoginModal, isSignUpModal, setIsLoginModal, setIsSignUpModal, setIsAuth }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')

    const login = async () => {
        try {
            const response = await signIn(email, password)
            console.log(response) //
            localStorage.setItem('token', response.data.accessToken)
            setIsAuth(true)
            setIsLoginModal(false)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
    const register = async () => {
        try {
            const response = await signUp(email, password, confirmPassword, name, lastname)
            console.log(response) //
            localStorage.setItem('token', response.data.accessToken)
            setIsAuth(true)
            setIsSignUpModal(false)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    const googleSuccess = async res => {
        const response = await authorizeGoogle(res?.tokenId)
        console.log(response) //
        localStorage.setItem('profile', JSON.stringify({ ...res?.profileObj }))
        localStorage.setItem('token', response.data.accessToken)
        setIsAuth(true)
        setIsSignUpModal(false)
        setIsLoginModal(false)
    }
    const googleFailure = error => {
        console.log('Google Sign in was unseccessful. Try again later' + JSON.stringify(error))
    }

    return (
        <div onClick={() => { setIsLoginModal(false); setIsSignUpModal(false) }} className={isLoginModal || isSignUpModal ? `${s.authorizationModal} ${s.active}` : s.authorizationModal}>
            <div onClick={e => e.stopPropagation()} className={isLoginModal || isSignUpModal ? `${s.authorizationModalContent} ${s.active}` : s.authorizationModalContent}>

                <div className={s.signUpModalContent}>
                    <div className={s.title} level='h1'>{isSignUpModal && 'SIGN UP'}
                        {isLoginModal && 'LOGIN'}
                    </div>
                    <form>
                        {isSignUpModal &&
                            <label className={s.name}>
                                <p>Name:</p>
                                <input onChange={e => setName(e.target.value)} value={name} type='text' placeholder='Serob' />
                            </label>}
                        {isSignUpModal &&
                            <label className={s.lastname}>
                                <p>Lastname:</p>
                                <input onChange={e => setLastname(e.target.value)} value={lastname} type='text' placeholder='Mataryan' />
                            </label>}
                        <label className={s.email}>
                            <p>{isSignUpModal && 'Your Email:'}
                                {isLoginModal && 'Email:'}</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} type='email' placeholder='example@some.com'
                            />
                        </label>
                        <label className={s.password}>
                            <p>{isSignUpModal && 'Create a new password:'}
                                {isLoginModal && 'Password:'}</p>
                            <input onChange={e => setPassword(e.target.value)} value={password} type='password' placeholder='*' />
                        </label>
                        {isSignUpModal && <label className={s.password}>
                            <p>{isSignUpModal && 'Confirm password:'}
                                {isLoginModal && 'Password:'}</p>
                            <input onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword} type='password' placeholder='*' />
                        </label>}
                    </form>
                </div>

                {isLoginModal && <button onClick={login} type='submit' className={s.button}>
                    <span className={s.text}>Login</span>
                </button>}
                {isSignUpModal && <button onClick={register} type='submit' className={s.button}>
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

            </div>
        </div>
    )
}

export default AuthorizationModal