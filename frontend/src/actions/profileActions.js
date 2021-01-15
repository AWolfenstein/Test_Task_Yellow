import axios from "axios";
import { GET_ERRORS, SET_DATA, DATA_CREATED, DATA_REMOVED ,DATA_UPDATED } from "./types";

export const getData = (id_user) => (dispatch) => {
  axios
    .get(`/api/profile/load_data/${id_user}`)
    .then((res) => {
      const data = res.data;
      dispatch(setData(data));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setData = (data) => {
  return {
    type: SET_DATA,
    payload: data,
  };
};

export const createRace = (userData, id_user) => (dispatch) => {
  axios
    .post("/api/profile/add_data", userData)
    .then((res) => dispatch(createData()))
    .then(() => dispatch(getData(id_user)))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const createData = () => {
  return {
    type: DATA_CREATED,
  };
};

export const removeRace = (data_id, id_user) => (dispatch) => {
  axios
    .post("/api/profile/remove_data", { id_data: data_id })
    .then((res) => dispatch(dataRemoved()))
    .then(() => dispatch(getData(id_user)))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const dataRemoved = () => {
  return {
    type: DATA_REMOVED,
  };
};

export const updateRace = (userData, id_user) => (dispatch) => {
  axios
    .post("/api/profile/update_data", userData)
    .then((res) => dispatch(dataUpdate()))
    .then(() => dispatch(getData(id_user)))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const dataUpdate = () => {
  return {
    type: DATA_UPDATED,
  };
};
