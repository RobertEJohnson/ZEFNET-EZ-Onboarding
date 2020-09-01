import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_ORGANIZATION" actions
function* getOrganization(action) {
  try {
    //get organization from database/server
    const response = yield axios.get('/api/organization/' + action.payload);
    // store organizaiton in organization reducer
    console.log('in organizationSaga', response);
    yield put({ type: 'SET_ORGANIZATION', payload: response.data[0] });
  } catch (error) {
      console.log('Error with category get:', error);
  }
}

function* organizationSaga() {
  yield takeLatest('FETCH_ORGANIZATION', getOrganization);
}

export default organizationSaga;