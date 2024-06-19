/**
 *  /signin [POST] - запрос bearer токена по id и паролю;
● /signin/new_token [POST] - обновление bearer токена по refresh токену
● /signup [POST] - регистрация нового пользователя;
 При удачной регистрации вернуть пару bearer токен и refresh токен;
● /info [GET] - возвращает id пользователя;
● /logout [GET] - выйти из системы;
 */

export const signIn = () => {};
export const signInTokenUpdate = () => {};
export const signUp = () => {};
export const userInfo = () => {};
export const userLogout = () => {};