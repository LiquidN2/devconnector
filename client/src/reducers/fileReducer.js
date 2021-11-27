import { USER_LOGOUT } from '../constants/authActionTypes';  

import {
  FILE_SINGLE_UPLOAD_REQUEST,
  FILE_SINGLE_UPLOAD_ERRORS,
  FILE_SINGLE_UPLOAD_SUCCESS,

  FILE_GET_DOWNLOAD_URL_REQUEST,
  FILE_GET_DOWNLOAD_URL_ERRORS,
  FILE_GET_DOWNLOAD_URL_SUCCESS
} from '../constants/fileActionTypes';

const initialState = {
  isUploading: false,
  uploadProgress: 0,
  isFetchingFiles: false,
  downloadUrls: []
};

const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILE_SINGLE_UPLOAD_REQUEST:
      return {
        ...state,
        isUploading: true
      }
    
    case FILE_SINGLE_UPLOAD_ERRORS:
      return {
        ...state,
        isUploading: false
      }

    case FILE_SINGLE_UPLOAD_SUCCESS:
      return {
        ...state,
        isUploading: false,
        downloadURLs: [
          ...state.downloadUrls, 
          action.downloadUrl
        ]
      }

    case FILE_GET_DOWNLOAD_URL_REQUEST:
      return {
        ...state,
        isFetchingFiles: true
      }
    
    case FILE_GET_DOWNLOAD_URL_ERRORS:
      return {
        ...state,
        isFetchingFiles: false
      }
    
    case FILE_GET_DOWNLOAD_URL_SUCCESS:
      return {
        ...state,
        isFetchingFiles: false,
        downloadUrls: [
          ...state.downloadUrls,
          {
            postId: action.postId,
            downloadUrl: action.downloadUrl
          }
        ]
      }

    case USER_LOGOUT:
      return { ...initialState }

    default:
      return state
  }
}

export default fileReducer;