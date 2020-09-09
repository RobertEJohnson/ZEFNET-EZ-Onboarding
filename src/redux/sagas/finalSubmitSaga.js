import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_ORGANIZATION" actions
function* mailPackage(action) {
  try {
    //
    console.log('in mailPackage saga with: ', action.payload)
    const response = yield axios.post('/api/package/send/',  action.payload);
    // store organizaiton in organization reducer
    console.log('/api/package/send/', response)
  } catch (error) {
      console.log('Error with organization get:', error);
  }
}


function* submitSaga() {
  yield takeLatest('MAIL_PACKAGE', mailPackage);
}

export default submitSaga;