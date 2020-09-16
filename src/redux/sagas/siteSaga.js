import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "FETCH_SITE" actions
function* getSite(action) {
  try {
    //get site from database/server
    const response = yield axios.get('/api/site/' + action.payload);
    // store site in site reducer
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
    //add the returned id from the post call to our action payload 
    action.payload.id = response.data[0].id;
     //call the GET saga to retrieve updated info
    yield put({ type: 'FETCH_SITE', payload: action.payload.organization_id})
    yield put({type: 'SET_DEVICE_SITE', payload: action.payload});    
    } catch (error) {
        console.log('error with site post:', error);
    }
}

function* editSite(action){
  try {
  //put updates to existing site into the site table
  yield axios.put('/api/site', action.payload);
   //call the GET saga to retrieve updated info
  yield put({ type: 'FETCH_SITE', payload: action.payload.organization_id})
  yield put({type: 'SET_DEVICE_SITE', payload: action.payload});    
  } catch (error) {
      console.log('error with site post:', error);
  }
}

function* organizationSaga() {
  yield takeLatest('FETCH_SITE', getSite);
  yield takeLatest('POST_SITE', addSite);
  yield takeLatest('EDIT_SITE', editSite);
}

export default organizationSaga;