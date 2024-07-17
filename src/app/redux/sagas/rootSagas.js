import { all } from "redux-saga/effects";
import provincesSaga from "./ProvincesSaga/ProvinceSaga";
import districtSaga from "./DistrictSaga/DistrictSaga";
import WardSaga from "./WardSaga/WardSaga";
import EmployeeSaga from "./StaffSaga/EmployeeSaga";

export default function* rootSaga() {
  yield all([provincesSaga(), districtSaga(), WardSaga(),EmployeeSaga()]);
}
