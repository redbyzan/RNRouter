/**
 * Created by roger on 2016. 6. 28..
 */
import { serverUrl, headers, form_headers } from '../config';
const youtubeApiKey = 'AIzaSyDjsiZF4nJaH-M3Nm6iSYJas4afR3esD7g';
const youtubeApiBaseUrl = 'https://www.googleapis.com/youtube/v3';

export const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD';
export const SEARCH_STARTED = 'SEARCH_STARTED';
export const SEARCH_RESULT = 'SEARCH_RESULT';
export const SEARCH_FAILED = 'SEARCH_FAILED';
export const MORE_SEARCH_RESULT = 'MORE_SEARCH_RESULT';
export const NEW_SEARCH = 'NEW_SEARCH';
export const CHANGE_SCHEMA = 'CHANGE_SCHEMA';

export const newSearch = () => ({type: NEW_SEARCH});
export const setSearchKeyword = (keyword) => ({type: SET_SEARCH_KEYWORD, keyword});
export const runSearch = (keyword) => (dispatch) => _searchVideos(dispatch, keyword);
export const moreVideos = (keyword, nextPageToken) => (dispatch) => _searchVideos(dispatch, keyword, nextPageToken);
export const changeDefaultSchema = () => ({type: CHANGE_SCHEMA});

const _searchVideos = (dispatch, keyword, nextPageToken = null) => {
  dispatch(_searchStarted(keyword));

  console.log("_searchVideos keyword is ", keyword);

  const encodedKeyword = keyword.replace(' ', '+');
  let url = `${youtubeApiBaseUrl}/search?part=snippet&q=${encodedKeyword}&type=video&maxResults=10&key=${youtubeApiKey}`;

  if (nextPageToken)
    url += `&pageToken=${nextPageToken}`;

  return fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) throw data.error.message || 'Unable to search';
        return data;
      })
      .then((data) => {
        console.log("next data ", data);
        if (nextPageToken)
          dispatch(_moreSearchResultReceived(data));
        else
          dispatch(_searchResultReceived(data));
      })
      .catch((err) => {
        console.log("result error ", err);
        dispatch(_searchFailed(err));
      });
};

const _searchStarted = (keyword) => ({type: SEARCH_STARTED, keyword});
const _searchResultReceived = (data) => ({type: SEARCH_RESULT, data});
const _moreSearchResultReceived = (data) => ({type: MORE_SEARCH_RESULT, data});
const _searchFailed = (message) => ({type: SEARCH_FAILED, message});


