import { call, takeEvery, put } from "redux-saga/effects";
import {
  addProvincesApi,
  deleteProvincesApi,
  getAllProvinces,
  getDistrictsByProvinces,
  searchProvincesApi,
  updateProvincesApi,
} from "./ProvicesApi";
import {
  addProvinces,
  deleteProvincesReducer,
  getDistrictByProvinceReducer,
  searchProvincesReducer,
  showAllProvinces,
  updateProvinces,
} from "app/redux/reducers/ProvinceReduces";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUCCESS_CODE, typeProvinces } from "app/redux/constants";
toast.configure({
  autoClose: 1500,
  draggable: false,
  limit: 3,
});

function* getAllProvincesSaga() {
  try {
    const response = yield call(getAllProvinces);
    if (response.code === 200) {
      yield put(showAllProvinces(response?.data));
    } else {
      console.error("Error in province saga");
    }
  } catch (error) {
    console.error("Error in province saga:", error);
  }
}
function* addProvincesSaga(action) {
  try {
    const response = yield call(addProvincesApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(addProvinces(response.data));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    console.error("Something Wrong With Saga!", e);
  }
}
function* editProvincesSaga(action) {
  try {
    const response = yield call(
      updateProvincesApi,
      action.payload,
      action.data
    );
    if (response && response.data && response.data.code === SUCCESS_CODE) {
      yield put(updateProvinces(response?.data?.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (e) {
    console.error("Something Wrong With Saga!", e);
  }
}
function* deleteProvincesSaga(action) {
  try {
    const response = yield call(deleteProvincesApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(deleteProvincesReducer(action.payload));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    console.error(e);
  }
}
function* searchProvincesSaga(action) {
  try {
    const response = yield call(searchProvincesApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(searchProvincesReducer(response?.data?.content));
    }
  } catch (e) {
    console.error("Error from Saga");
  }
}
function* getDistrictByProvincesSaga(action) {
  try {
    const response = yield call(getDistrictsByProvinces, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(getDistrictByProvinceReducer(response?.data));
    }
  } catch (e) {
    console.error(e);
  }
}
export default function* provincesSaga() {
  yield takeEvery(typeProvinces.ALL_PROVINCES_REQUEST, getAllProvincesSaga);
  yield takeEvery(typeProvinces.ADD_PROVINCES_REQUEST, addProvincesSaga);
  yield takeEvery(typeProvinces.EDIT_PROVINCES_REQUEST, editProvincesSaga);
  yield takeEvery(typeProvinces.DELETE_PROVINCE_REQUEST, deleteProvincesSaga);
  yield takeEvery(typeProvinces.SEARCH_PROVINCES_REQUEST, searchProvincesSaga);
  yield takeEvery(
    typeProvinces.GET_DISTRICT_BY_PROVINCE_REQUEST,
    getDistrictByProvincesSaga
  );
}
