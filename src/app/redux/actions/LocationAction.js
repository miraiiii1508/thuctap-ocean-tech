const { typeProvinces, typeDistricts, typeWards } = require("../constants");
//provinces
export const getAllProvincesAction = () => {
  return {
    type: typeProvinces.ALL_PROVINCES_REQUEST,
  };
};
export const addProvinceAction = (data) => {
  return {
    type: typeProvinces.ADD_PROVINCES_REQUEST,
    payload: data,
  };
};
export const updateProvinceAction = (id, data) => {
  return {
    type: typeProvinces.EDIT_PROVINCES_REQUEST,
    payload: id,
    data: data,
  };
};
export const deleteProvinceAction = (data) => {
  return {
    type: typeProvinces.DELETE_PROVINCE_REQUEST,
    payload: data,
  };
};
export const searchProvincesAction = (data) => {
  return {
    type: typeProvinces.SEARCH_PROVINCES_REQUEST,
    payload: data,
  };
};
export const getDistrictByProvinces = (data) => {
  return {
    type: typeProvinces.GET_DISTRICT_BY_PROVINCE_REQUEST,
    payload: data,
  };
};
//district
export const getDistrictsAction = () => {
  return {
    type: typeDistricts.GET_ALL_DISTRICT_SAGA_REQUEST,
  };
};
export const addDistrictAction = (data) => {
  return {
    type: typeDistricts.ADD_DISTRICT_REQUEST,
    payload: data,
  };
};
export const updateDistrictAction = (id, data) => {
  return {
    type: typeDistricts.UPDATE_DISTRICT_REQUEST,
    id: id,
    data: data,
  };
};
export const deleteDistrictAction = (data) => {
  return {
    type: typeDistricts.DELETE_DISTRICT_REQUEST,
    payload: data,
  };
};
export const searchDistrictsAction = (data) => {
  return {
    type: typeDistricts.SEARCH_DISTRICT_REQUEST,
    payload: data,
  };
};
//ward
export const getWardsAction = () => {
  return {
    type: typeWards.GET_ALL_WARD_REQUEST,
  };
};
export const addWardAction = (data) => {
  return {
    type: typeWards.ADD_NEW_WARD_REQUEST,
    payload: data,
  };
};
export const updateWardAction = (id, data) => {
  return {
    type: typeWards.UPDATE_WARD_REQUEST,
    id: id,
    data: data,
  };
};
export const deleteWardAction = (data) => {
  return {
    type: typeWards.DELETE_WARD_WITH_ID,
    payload: data,
  };
};
export const searchWardsAction = (data) => {
  return {
    type: typeWards.SEARCH_WARD_REQUEST,
    payload: data,
  };
};
