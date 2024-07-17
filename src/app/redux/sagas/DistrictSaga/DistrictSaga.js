import { call, takeEvery, put } from "redux-saga/effects";
import {
  addDistrictsApi,
  deleteDistrictsApi,
  getAllDistrictApi,
  getWardsByDistrictApi,
  searchDistrictsApi,
  updateDistrictsApi,
} from "./DistrictApi";
import {
  addDistrictReducer,
  deleteDistrictsReducer,
  getAllDistrictReducer,
  getWardsByDistrictReducer,
  searchDistrictReducer,
  updateDistrictReducer,
} from "app/redux/reducers/DistrictReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUCCESS_CODE, typeDistricts } from "app/redux/constants";
toast.configure({
  autoClose: 1500,
  draggable: false,
  limit: 3,
});

function* getAllDistrictSaga() {
  try {
    const response = yield call(getAllDistrictApi);
    if (response.code === SUCCESS_CODE) {
      yield put(getAllDistrictReducer(response?.data));
    } else {
      console.error("Error in provinces saga");
    }
  } catch (error) {
    console.error("Error in provinces saga:", error);
  }
}
function* addDistrictsSaga(action) {
  try {
    const response = yield call(addDistrictsApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(addDistrictReducer(response?.data));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    console.error("Something Wrong With Saga", e);
  }
}
function* updateDistrictSaga(action) {
  try {
    const response = yield call(updateDistrictsApi, action.id, action.data);
    console.log(response);
    if (response && response.data && response.data.code === SUCCESS_CODE) {
      yield put(updateDistrictReducer(response?.data?.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (e) {
    console.error(e);
  }
}
function* deleteDistrictSaga(action) {
  try {
    const response = yield call(deleteDistrictsApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(deleteDistrictsReducer(action.payload));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    console.error(e);
  }
}
function* searchDistrictSaga(action) {
  try {
    const response = yield call(searchDistrictsApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(searchDistrictReducer(response?.data?.content));
    }
  } catch (e) {
    console.error("Error from Saga!");
  }
}
function* getWardsByDistrictSaga(action) {
  try {
    const response = yield call(getWardsByDistrictApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(getWardsByDistrictReducer(response?.data));
    }
  } catch (e) {
    console.error(e);
  }
}
export default function* districtSaga() {
  yield takeEvery(
    typeDistricts.GET_ALL_DISTRICT_SAGA_REQUEST,
    getAllDistrictSaga
  );
  yield takeEvery(typeDistricts.ADD_DISTRICT_REQUEST, addDistrictsSaga);
  yield takeEvery(typeDistricts.UPDATE_DISTRICT_REQUEST, updateDistrictSaga);
  yield takeEvery(typeDistricts.DELETE_DISTRICT_REQUEST, deleteDistrictSaga);
  yield takeEvery(typeDistricts.SEARCH_DISTRICT_REQUEST, searchDistrictSaga);
  yield takeEvery("TEST", getWardsByDistrictSaga);
}
