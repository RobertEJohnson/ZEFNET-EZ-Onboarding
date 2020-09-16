import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

//saga fires on "ADD_ORGANIZATION ACTIONS", posts a new org and chains to fetch organization saga
function* addOrganization(action) {
  try {
    const response = yield axios.post("/api/organization", action.payload);
    yield put({ type: "FETCH_ORGANIZATION", payload: response.data.id });
  } catch (error) {
    console.log("Trouble adding organization", error);
  }
}

function* addOrganizationSaga() {
  yield takeLatest("ADD_ORGANIZATION", addOrganization);
}

export default addOrganizationSaga;
