import { REQUEST_STATE } from "../api_constants";

export const foodsActionTypes = {
  FETCHING: "FETCHING",
  SUCCESS: "SUCCESS"
};

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: []
};

export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case foodsActionTypes.SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload.foods
      };
    default:
      throw new Error();
  }
};
