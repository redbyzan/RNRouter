/**
 * Created by roger on 2016. 6. 28..
 */
import { reducer as router } from 'react-native-router-redux';
import { UserReducer as User } from './UserReducer';


import { combineReducers } from 'redux';
import {
    NavBar,
    TabBar
} from 'react-native-router-redux';
import {
    SET_SEARCH_KEYWORD,
    SEARCH_STARTED,
    SEARCH_RESULT,
    SEARCH_FAILED,
    MORE_SEARCH_RESULT,
    NEW_SEARCH,
    CHANGE_SCHEMA,
} from '../actions';
import update from 'react-addons-update';

const initialSearchState = {
  // searching
  error: '',
  keyword: '',
  isViewingResult: false,
  isSearching: false,

  // search result
  result: {
    items: [],
    prevPageToken: null,
    nextPageToken: null,
    pageInfo: {
      resultPerPage: 0,
      totalResults: 0
    }
  }
};

const search = (state = initialSearchState, action) => {

  switch (action.type) {
    case SET_SEARCH_KEYWORD :
      return Object.assign({}, state, {keyword: action.keyword});

    case SEARCH_STARTED :
      return Object.assign({}, state, {isSearching: true});

    case SEARCH_FAILED :
      return Object.assign({}, state, {
        error: action.message,
        isViewingResult: false,
        isSearching: false,
        result: {
          items: [],
          prevPageToken: null,
          nextPageToken: null,
          pageInfo: {
            resultPerPage: 0,
            totalResult: 0
          }
        }
      });

    case SEARCH_RESULT :
      return Object.assign({}, state, {
        isViewingResult: true,
        isSearching: false,
        result: Object.assign({}, state.result, {
          items: action.data.items,
          prevPageToken: action.data.prevPageToken || null,
          nextPageToken: action.data.nextPageToken || null,
          pageInfo: action.data.pageInfo
        })
      });

    case MORE_SEARCH_RESULT :
      return Object.assign({}, state, {
        isViewingResult: true,
        isSearching: false,
        isViewingVideo: false,
        viewedVideo: false,
        result: Object.assign({}, state, {
          items: [
            ...state.result.items,
            ...action.data.items
          ],
          prevPageToken: action.data.prevPageToken || null,
          nextPageToken: action.data.nextPageToken || null,
          pageInfo: action.data.pageInfo
        })
      });

    case NEW_SEARCH :
      return initialSearchState;

    default :
      return state;
  }
};

const leftButtonConfig = () => {
  console.log('leftButtonConfig onClick!!!');
};

const defaultSchema = {
  navBar: NavBar,
  navLeftHandler : leftButtonConfig,
  navLeftTitle : "dkdid",
  navLeftColor: '#FFF',
  navTint: '#224655',
  navTitleColor: '#FFF',
  navTitleStyle: {
    fontFamily: 'Avenir Next',
    fontSize: 18
  },
  statusStyle: 'light-content',
  tabBar: TabBar
};

const changeSchema = (state = defaultSchema, action) => {

  switch (action.type) {

    case CHANGE_SCHEMA :
      return update( state, {
          navLeftHandler: {$set : () => {
            console.log("change schema!!!!");
          }},
          navLeftTitle: {$set : "change"},
      });

    default :
      return state;
  }
};


export {
    router,
    search,
    User
};
