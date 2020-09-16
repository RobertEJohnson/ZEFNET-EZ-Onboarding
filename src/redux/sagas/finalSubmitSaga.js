import {takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_ORGANIZATION" actions
function* mailPackage(action) {
  try {
    const response = yield axios.post('/api/package/send/',  action.payload);
  } catch (error) {
      console.log('Error with organization get:', error);
  }
}


function* submitSaga() {
  yield takeLatest('MAIL_PACKAGE', mailPackage);
}

export default submitSaga;