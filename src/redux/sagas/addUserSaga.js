import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addUser(action) {
  try {
      console.log( "====> In addUser Saga", action.payload)
    yield axios.post("/api/add-user", action.payload);
    yield put ({ type: 'FETCH_ZEFUSER', payload: action.payload.orgId})
  } catch (error) {
    console.log("Trouble adding User", error);
  }
}

function* fetchZefUser(action) {
    try {
        console.log( "====> in fetchZefUser Saga", action.payload)
      const response = yield axios.get(`/api/add-user/${action.payload}`);
      console.log('back from get /api/add-user with:', response)
      yield put ({ type: 'SET_ZEFUSER', payload: response.data})
    } catch (error) {
      console.log("Trouble getting users", error);
    }
  }

function* addUserSaga() {
  yield takeLatest("ADD_USER", addUser);
  yield takeLatest("FETCH_ZEFUSER", fetchZefUser)
}

export default addUserSaga;