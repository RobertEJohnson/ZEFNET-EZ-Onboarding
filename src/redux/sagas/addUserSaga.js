import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addUser(action) {
  try {
    yield axios.post("/api/add-user", action.payload);
    yield put ({ type: 'FETCH_ZEFUSER', payload: action.payload.organization_id})
  } catch (error) {
    console.log("Trouble adding User", error);
  }
}

function* fetchZefUser(action) {
    try {
      const response = yield axios.get(`/api/add-user/${action.payload}`);
      yield put ({ type: 'SET_ZEFUSER', payload: response.data})
    } catch (error) {
      console.log("Trouble getting users", error);
    }
  }

  function* deleteZefUser(action) {
    try {
      yield axios.delete(`/api/add-user/${action.payload.id}`);
      yield put ({ type: 'FETCH_ZEFUSER', payload: action.payload.organization_id})
    } catch (error) {
      console.log("Trouble deleting users", error);
    }
  }

  function* updateZefUser(action) {
    try {
      yield axios.put(`/api/add-user/${action.payload.id}`, action.payload);
      yield put ({ type: 'FETCH_ZEFUSER', payload: action.payload.organization_id})
    } catch (error) {
      console.log("Trouble updating users", error);
    }
  }

function* addUserSaga() {
  yield takeLatest("ADD_USER", addUser);
  yield takeLatest("FETCH_ZEFUSER", fetchZefUser);
  yield takeLatest("DELETE_ZEFUSER", deleteZefUser);
  yield takeLatest("UPDATE_ZEFUSER", updateZefUser);
}

export default addUserSaga;