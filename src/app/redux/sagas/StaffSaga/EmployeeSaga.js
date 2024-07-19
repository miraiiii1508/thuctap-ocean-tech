import { call, put, takeEvery } from "redux-saga/effects";
import {
  addEmployeesApi,
  deleteEmployeesApi,
  getAllEmployeesApi,
  searchEmployeesApi,
  updateEmployeesApi,
} from "./EmployeeApi";
import { SUCCESS_CODE, typeEmployee } from "app/redux/constants";
import {
  addEmployeeReducer,
  deleteEmployeeReducer,
  getAllEmployeesReducer,
  searchEmployeesReducer,
  updateEmployeeReducer,
} from "app/redux/reducers/EmployeesReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure({
  autoClose: 3000,
  draggable: false,
  limit: 3,
});
function* getAllEmployeesSaga() {
  try {
    const response = yield call(getAllEmployeesApi);
    if (response && response.code === SUCCESS_CODE) {
      console.log(response);
      yield put(getAllEmployeesReducer(response?.data));
    }
  } catch (e) {
    console.error(e);
  }
}
function* addEmployeeSaga(action) {
  try {
    const response = yield call(addEmployeesApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(addEmployeeReducer(response?.data));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    console.error(e);
  }
}
function* updateEmployeeSaga(action) {
  try {
    const response = yield call(
      updateEmployeesApi,
      action.payload.id,
      action.payload
    );
    if (response && response.data && response.data.code === SUCCESS_CODE) {
      yield put(updateEmployeeReducer(response?.data?.data));
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  } catch (e) {
    console.error(e);
  }
}
function* deleteEmployeeSage(action) {
  try {
    const response = yield call(deleteEmployeesApi, action.payload);
    if (response && response.code === SUCCESS_CODE) {
      yield put(deleteEmployeeReducer(action.payload));
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  } catch (e) {
    console.error(e);
  }
}
function* searchEmployeesSaga(action) {
  try {
    const response = yield call(searchEmployeesApi, action.payload);
    yield put(searchEmployeesReducer(response.data.data.content));
  } catch (e) {
    console.error(e);
  }
}
export default function* EmployeeSaga() {
  yield takeEvery(typeEmployee.GET_ALL_EMPLOYEE_REQUEST, getAllEmployeesSaga);
  yield takeEvery(typeEmployee.ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
  yield takeEvery(typeEmployee.UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga);
  yield takeEvery(typeEmployee.DELETE_EMPLOYEE_REQUEST, deleteEmployeeSage);
  yield takeEvery(typeEmployee.SEARCH_EMPLOYEE_REQUEST, searchEmployeesSaga);
}
