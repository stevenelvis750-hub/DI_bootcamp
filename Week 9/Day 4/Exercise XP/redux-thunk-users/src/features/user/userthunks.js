import {
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} from "./userslice";

export const fetchUser = (id = 1) => async (dispatch) => {
  dispatch(fetchUserRequest());
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    dispatch(fetchUserSuccess(data));
  } catch (error) {
    dispatch(fetchUserFailure(error.message));
  }
};