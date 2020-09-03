import {put, takeLatest} from 'redux-saga/effects';
import axios from 'axios';

function* getBreakers(action){
    try{
        const response = yield axios.get(`/api/breaker/${action.payload}`);

        yield console.log('response data', response.data);
        yield put({type: 'SET_SITE_BREAKERS', payload: response.data})
    }
    catch(error){
        console.log('Error fetching breakers from database:', error);
    }
}

function* breakerSaga(){
    yield takeLatest('FETCH_SITE_BREAKERS', getBreakers)
}

export default breakerSaga;