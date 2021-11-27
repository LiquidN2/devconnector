import storage, { firebase } from '../firebase/firebase'; 
// import firebase from 'firebase/app';
// import * as storage from 'firebase/storage';

import {
  FILE_SINGLE_UPLOAD_REQUEST,
  FILE_SINGLE_UPLOAD_ERRORS,
  FILE_SINGLE_UPLOAD_SUCCESS,

  FILE_GET_DOWNLOAD_URL_REQUEST,
  FILE_GET_DOWNLOAD_URL_ERRORS,
  FILE_GET_DOWNLOAD_URL_SUCCESS
} from '../constants/fileActionTypes';


const fileSingleUploadRequest = () => ({
  type: FILE_SINGLE_UPLOAD_REQUEST
});

const fileSingleUploadErrors = errors => ({
  type: FILE_SINGLE_UPLOAD_ERRORS,
  errors
});

const fileSingleUploadSuccess = downloadURL => ({
  type: FILE_SINGLE_UPLOAD_SUCCESS,
  downloadURL
});

const metadata = {
  contentType: 'image/jpeg'
};

const storageRef = storage.ref();

export const fileSingleUploadAsync = file => {
  return dispatch => {
    dispatch(fileSingleUploadRequest());

    // Upload file and metadata to the object 'images/mountains.jpg'
    const uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
    
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            console.log('Upload in process');
        }
      }, error => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            dispatch(fileSingleUploadErrors({ fileUpload: "User doesn't have permission to access the object" }));
            break;

          case 'storage/canceled':
            // User canceled the upload
            dispatch(fileSingleUploadErrors({ fileUpload: "User canceled upload" }));
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            dispatch(fileSingleUploadErrors({ fileUpload: "Unknown error" }));
            break;

          default:
            dispatch(fileSingleUploadErrors({ fileUpload: "Unknown error" }));
            break;
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => {
            console.log('File available at', downloadURL);
            dispatch(fileSingleUploadSuccess(downloadURL));
          });
      }
    );
  }
}


const fileGetDownloadUrlRequest = () => ({
  type: FILE_GET_DOWNLOAD_URL_REQUEST
});

const fileGetDownloadUrlErrors = errors => ({
  type: FILE_GET_DOWNLOAD_URL_ERRORS,
  errors
});

const fileGetDownloadUrlSuccess = (postId, downloadUrl) => ({
  type: FILE_GET_DOWNLOAD_URL_SUCCESS,
  postId,
  downloadUrl
});

export const fileGetDownloadUrlAsync = (userId, postId, fileName) => dispatch => {
  dispatch(fileGetDownloadUrlRequest());

  const storageRef = storage.ref(`resized-images/${userId}/resized-${fileName}`);
  storageRef.getDownloadURL()
    .then(function(downloadUrl) {
      dispatch(fileGetDownloadUrlSuccess(postId, downloadUrl));
    })
    .catch(err => {
      dispatch(fileGetDownloadUrlErrors(err));
    });
}