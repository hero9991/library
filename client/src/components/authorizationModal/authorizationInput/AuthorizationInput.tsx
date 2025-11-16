import s from '../AuthorizationModal.module.css'

const AuthorizationInput = ({ inputArea, inputType, errors, register, placeholder, errorText, validationObject }: Props) => {
    return (
        <div>
            <input className={errors[inputArea] ? `${s.input} ${s.invalidInput}` : s.input} 
                type={inputType} 
                placeholder={placeholder}
                {...register(inputArea, validationObject)} />
            {errors[inputArea] && <p className={s.errorText}>{errorText}</p>}
        </div>
    )
}

interface Props {
    inputArea: string
    inputType: string
    errors: any
    register: any
    placeholder: string
    errorText: string
    validationObject: any
}

export default AuthorizationInput