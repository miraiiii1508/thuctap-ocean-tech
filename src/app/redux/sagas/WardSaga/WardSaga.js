import { call, takeEvery, put } from "redux-saga/effects";
import {
  addWardsApi,
  deleteWardsApi,
  getAllWards,
  searchWardsApi,
  updateWardsApi,
} from "./WardApi";
import {
  addWardReducer,
  deleteWardsReducer,
  searchWardReducer,
  showAllWardReducer,
  updateWardReducer,
} from "app/redux/reducers/WardReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUCCESS_CODE, typeWards } from "app/redux/constants";
toast.configure({
  autoClose: 1500,
  draggable: false,
  limit: 3,
});
function* getAllWardSaga() {
  try {
    const response = yield call(getAllWards);
    if (response.code === SUCCESS_CODE) {
      yield put(showAllWardReducer(response?.data));
    } else {
      console.error("Error in ward saga");
    }
  } catch (e) {
    console.error("Error in ward saga", e);
  }
}
function* addWardSaga(action) {
  try {
    const response = yield call(addWardsApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(addWardReducer(action.payload));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    console.error("Error from Ward Saga");
  }
}
function* updateWardSaga(action) {
  try {
    const response = yield call(updateWardsApi, action.id, action.data);
    if (response && response.data && response.data.code === SUCCESS_CODE) {
      yield put(updateWardReducer(response?.data?.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (e) {
    console.error("Error from Ward Saga");
  }
}
function* deleteWardWidthId(action) {
  try {
    const response = yield call(deleteWardsApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(deleteWardsReducer(action.payload));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    console.error("Error from ward Saga", e);
  }
}
function* searchWardsSaga(action) {
  try {
    const response = yield call(searchWardsApi, action.payload);
    if (response.code === SUCCESS_CODE) {
      yield put(searchWardReducer(response?.data?.content));
    } else {
      toast.error(response.message);
    }
  } catch (e) {}
}
export default function* WardSaga() {
  yield takeEvery(typeWards.GET_ALL_WARD_REQUEST, getAllWardSaga);
  yield takeEvery(typeWards.ADD_NEW_WARD_REQUEST, addWardSaga);
  yield takeEvery(typeWards.UPDATE_WARD_REQUEST, updateWardSaga);
  yield takeEvery(typeWards.DELETE_WARD_WITH_ID, deleteWardWidthId);
  yield takeEvery(typeWards.SEARCH_WARD_REQUEST, searchWardsSaga);
}
