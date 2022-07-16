import { REQUEST_STATE } from "../api_constants";

export const restaurantActionTypes = {
  FETCHING: "FETCHING",
  SUCCESS: "SUCCESS"
};

export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  restaurantsList: []
};

export const restaurantsReducer = (state, action) => {
  switch (action.type) {
    case restaurantActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING
      };
    case restaurantActionTypes.SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        restaurantsList: action.payload.restaurants
      };
    default:
      throw new Error();
  }
};
