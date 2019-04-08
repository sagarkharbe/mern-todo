import { GET_ITEMS, DELETE_ITEM, ADD_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authAction";
import { returnErrors } from "./errorAction";
export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  console.log(item);
  axios
    .request({
      url: "/api/items",
      method: "post",
      data: item,
      headers: tokenConfig(getState).headers
    })
    .then(res => dispatch({ type: ADD_ITEM, payload: res.data }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
