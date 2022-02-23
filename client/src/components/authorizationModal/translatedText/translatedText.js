import { EN, RU } from "../../../utility/Constants";

export const getFirstNameText = language => language === EN
    ? 'First Name'
    : language === RU
        ? 'Имя'
        : 'Անուն'

export const getLastNameText = language => language === EN
    ? 'Last Name'
    : language === RU
        ? 'Фамилия'
        : 'Ազգանուննուն'

export const getEmailText = language => language === EN
    ? 'Email'
    : language === RU
        ? 'Эл. адрес'
        : 'Էլեկտրոնային հասցե'

export const getPasswordText = language => language === EN
    ? 'Password'
    : language === RU
        ? 'Пароль'
        : 'Գաղտնաբառ'

export const getConfirmPasswordText = language => language === EN
    ? 'Confirm Password'
    : language === RU
        ? 'Подтвердить пароль'
        : 'Հաստատել գաղտնաբառը'

export const getFirstNameErrorText = language => language === EN
    ? 'First Name is required'
    : language === RU
        ? 'Имя обязательна для заполнения'
        : 'Անունը պարտադիր է լրացման համար'

export const getLastNameErrorText = language => language === EN
    ? 'Last Name is required'
    : language === RU
        ? 'Фамилия обязательна для заполнения'
        : 'Ազգանունը պարտադիր է լրացման համար'

export const getEmailErrorText = language => language === EN
    ? 'Email is not valid'
    : language === RU
        ? 'Адрес электронной почты невалидный'
        : 'Էլեկտրոնային հասցեն անվավեր է'

export const getPasswordErrorText = language => language === EN
    ? 'Password must contain at least 6 characters'
    : language === RU
        ? 'Пароль должен содержать не менее 6 символов'
        : 'Գաղտնաբառը պետք է պարունակի առնվազն 6 նիշ'

export const getConfirmPasswordErrorText = language => language === EN
    ? 'The confirmation password must match the password'
    : language === RU
        ? 'Пароль для подтверждения должен совпадать с паролем'
        : 'Հաստատման գաղտնաբառը պետք է համընկնի գաղտնաբառի հետ'

export const getAuthorizationText = language => language === EN
    ? 'Authorization'
    : language === RU
        ? 'Авторизация'
        : 'Թույլտվության'