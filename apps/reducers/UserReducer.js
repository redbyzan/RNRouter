/**
 * Created by roger on 2016. 7. 1..
 */
import update from 'react-addons-update';
import {
    SET_USERNAME,
    SET_PASSWORD,
    USER_LOGIN,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILED,
    USER_INPUT_LOGIN_DATA,
    USER_LOGIN_START,
    USER_LOGIN_END,
} from '../actions/UserAction';

const initialSearchState = {

  userData : {},
  login: {
    username : '',
    password : '',
    isLoggingIn: false,
    isLoggedIn: false,
    error: ''
  }
};

const UserReducer = (state = initialSearchState, action) => {
  switch (action.type) {

    case USER_LOGIN_START :
      return update(state, {
        login : {
          isLoggingIn : {$set : true}
        }
      });
    case USER_LOGIN_END :
      return update(state, {
        login : {
          isLoggedIn : {$set : false}
        }
      });

    case SET_USERNAME :
      return update(state, {
        login : {
          username : {$set : action.username}
        }
      });
    case SET_PASSWORD :
      return update(state, {
        login : {
          password : {$set : action.password}
        }
      });

    case USER_LOGIN_SUCCESS :
      return update(state, {
        login: {
          isLoggingIn: {$set: false},
          isLoggedIn: {$set: true},
          error: {$set: ''}
        },
        userData : {$set : action.data}
      });

    case USER_LOGIN_FAILED :
      return update(state, {
        login : {
          isLoggingIn : {$set : false},
          error : {$set : action.message}
        }
      });

    case USER_INPUT_LOGIN_DATA :
      return update(state, {
        login : {
          isLoggingIn : {$set : false},
          error : {$set :action.message}
        }
      });

    default :
      return state;
  }
};

export {
    UserReducer
};