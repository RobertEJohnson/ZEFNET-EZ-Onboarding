import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

function* editOrganization(action) {
  try {
    const response = yield axios.put("/api/organization", action.payload);
    yield console.log("In editOrganization", response.data, action.payload);
    yield put({ type: "FETCH_ORGANIZATION", payload: action.payload.id });
  } catch (error) {
    console.log("Trouble editing organization", error);
  }
}

function* editOrganizationSaga() {
  yield takeLatest("EDIT_ORGANIZATION", editOrganization);
}

export default editOrganizationSaga;
