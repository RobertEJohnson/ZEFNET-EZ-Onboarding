import axios from "axios";
import { takeLatest } from "redux-saga/effects";

function* addOrganization(action) {
  try {
    const response = yield axios.post("/api/organization", action.payload);
    yield console.log("In addOrganization", response.data, action.payload);
  } catch (error) {
    console.log("Trouble adding organization", error);
  }
}

function* addOrganizationSaga() {
  yield takeLatest("ADD_ORGANIZATION", addOrganization);
}

export default addOrganizationSaga;
