import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';

function* addDevice(action) {
  try {
    const response = yield axios.post("/api/device", action.payload);
    console.log('back from server with', response)
    yield put({ type: 'GET_ALL_DEVICE', payload: action.payload.org_id });
  } catch (error) {
    console.log("Trouble adding device", error);
  }
}

function* getDevice(action) {
    try {
      const response = yield axios.get("/api/device/" + action.payload);
      //console.log('back from server with', response)
      yield put({ type: 'SET_ALL_DEVICE', payload: response.data });
    } catch (error) {
      console.log("Trouble getting devices", error);
    }
  }

function* putDevice(action) {
    try {
      yield axios.put("/api/device/" + action.payload.id, action.payload);
      //console.log('back from server with', response)
      yield put({ type: 'GET_ALL_DEVICE', payload: action.payload.org_id });
    } catch (error) {
      console.log("Trouble updating device", error);
    }
  }

function* deviceSaga() {
  yield takeLatest("ADD_DEVICE", addDevice);
  yield takeLatest("GET_ALL_DEVICE", getDevice);
  yield takeLatest("UPDATE_DEVICE", putDevice);
}

export default deviceSaga;
