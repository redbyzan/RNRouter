/**
 * Created by roger on 2016. 7. 1..
 */
import { serverUrl, headers, form_headers } from '../config';

export const SET_USERNAME = 'SET_USERNAME';
export const SET_PASSWORD = 'SET_PASSWORD';
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_START = 'USER_LOGIN_START';
export const USER_LOGIN_END = 'USER_LOGIN_END';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';
export const USER_INPUT_LOGIN_DATA = 'USER_INPUT_LOGIN_DATA';

export const setUsername = (username) => ({type : SET_USERNAME, username});
export const setPassword = (password) => ({type : SET_PASSWORD, password});
export const signIn = (username, password) => (dispatch) => _userLogin(dispatch, username, password);
export const loginEnd = (actions) => (dispatch) => _userLoginEnd(dispatch, actions);

const _userLoginEnd = (dispatch, actions) => {

  dispatch(_loginEnd());

//  dispatch(actions.push(Object.assign({}, {
//    name: 'tab1',
//    tabBarName: 'tabBar',
//  })));
};

const _userLogin = (dispatch, username, password) => {
  if (!username || !password)
    return dispatch(_inputLoginData("Input your LogIn Data"));

  dispatch(_loginStart());

  let form = new FormData();
  form.append('username', username);
  form.append('password', password);

  return fetch(`${serverUrl}/login`,
      {
        credentials: 'include', //pass cookies, for authentication
        method: 'POST',
        headers: form_headers,
        body: form
      })
      .then((resp) => {
        console.log('user login response!', resp);
        return resp.json()
      })
      .then((data) => {
        console.log('user login response data!', data);
        dispatch(_loginSuccess(data));
      })
      .catch((err) => {
        console.log('user login response error!', err);
        dispatch(_loginFailed(err));
      });
};
const _loginStart = () => ({type: USER_LOGIN_START});
const _loginEnd = () => ({type: USER_LOGIN_END});
const _loginSuccess = (data) => ({type: USER_LOGIN_SUCCESS, data});
const _loginFailed = (message) => ({type: USER_LOGIN_FAILED, message});
const _inputLoginData = (message) => ({type: USER_INPUT_LOGIN_DATA, message});