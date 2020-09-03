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
// worker Saga: will be fired on "POST_SITE" actions
function* addSite(action){
    try {
    //post new site to site table
    const response = yield axios.post('/api/site', action.payload);
    //log the response for testing
    console.log('back from site POST with', response);
    //call the GET saga to retrieve updated info
    yield put({ type: 'FETCH_SITE', payload: action.payload.organization_id})
    } catch (error) {
        console.log('error with site post:', error);
    }
}

function* organizationSaga() {
  yield takeLatest('FETCH_SITE', getSite);
  yield takeLatest('POST_SITE', addSite)
}

export default organizationSaga;