import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* getBreakers(action){
    try{
        const response = yield axios.get(`/api/breaker/${action.payload}`);
        yield put({type: 'SET_SITE_BREAKERS', payload: response.data})
    }
    catch(error){
        console.log('Error fetching breakers from database:', error);
    }
}

// worker Saga: will be fired on "POST_BREAKER" actions
function* addBreaker(action){
    try {
    //post new breaker to breaker table
    const response = yield axios.post('/api/breaker', action.payload);
    //log the response for testing
   // console.log('back from site POST with', response.data[0].id);
    //call the GET saga to retrieve updated info
    yield put({ type: 'FETCH_SITE_BREAKERS', payload: action.payload.site_id});
    action.payload.id = response.data[0].id;
    yield put({type: 'SET_BREAKER', payload: action.payload});
    } catch (error) {
        console.log('error with breaker post:', error);
    }
}

//will fire on "EDIT_BREAKER" actions
function* editBreaker(action){
    try {
    //put updates to existing site into the site table
    yield axios.put('/api/breaker', action.payload);
     //call the GET saga to retrieve updated info
    yield put({ type: 'FETCH_SITE_BREAKERS', payload: action.payload.site_id})
    yield put({type: 'SET_BREAKER', payload: action.payload});    
    } catch (error) {
        console.log('error with breaker edit:', error);
    }
  }

function* breakerSaga(){
    yield takeLatest('FETCH_SITE_BREAKERS', getBreakers);
    yield takeLatest('POST_BREAKER', addBreaker);
    yield takeLatest('EDIT_BREAKER', editBreaker);
}

export default breakerSaga;