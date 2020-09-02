import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* addOrganization(action) {
  try {
    const response = yield axios.post("/api/organization", action.payload);
    yield console.log("In addOrganization", response.data.id);
    yield put({ type: "FETCH_ORGANIZATION", payload: response.data.id });
  } catch (error) {
    console.log("Trouble adding organization", error);
  }
}

function* addOrganizationSaga() {
  yield takeLatest("ADD_ORGANIZATION", addOrganization);
}

export default addOrganizationSaga;
