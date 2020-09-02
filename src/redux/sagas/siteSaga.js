import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_SITE" actions
function* getSite(action) {
  try {
    //get site from database/server
    const response = yield axios.get('/api/site/' + action.payload);
    // store site in site reducer
    //console.log('in siteSaga', response);
    yield put({ type: 'SET_SITE', payload: response.data });
  } catch (error) {
      console.log('Error with site get:', error);
  }
}

function* organizationSaga() {
  yield takeLatest('FETCH_SITE', getSite);
}

export default organizationSaga;