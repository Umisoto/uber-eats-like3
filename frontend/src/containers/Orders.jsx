import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";

// reducers
import {
  lineFoodsReducer,
  initialState,
  lineFoodsActionTypes
} from "../reducers/line_foods";

// apis
import { fetchLineFoods } from "../apis/line_foods";
import { postOrder } from "../apis/orders";

// components
import { REQUEST_STATE } from "../api_constants";
import { ConfirmOrderList } from "../components/ConfirmOrderList";
import { HeaderComponent } from "../components/Header";

const CenteredCirclarProgress = styled.div`
  text-align: center;
`;
const Message = styled.p`
  text-align: center;
  font-size: 1.5vw;
`;

export const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);
  useEffect(() => {
    dispatch({ type: lineFoodsActionTypes.FETCHING });
    fetchLineFoods().then(data => {
      dispatch({ type: lineFoodsActionTypes.FETCH_SUCCESS, payload: data });
    });
  }, []);

  const onClickConfirmOrder = () => {
    dispatch({ type: lineFoodsActionTypes.POSTING });
    postOrder(state.lineFoodsList.line_food_ids)
      .then(status => {
        dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
        status === 204 && (window.location.href = "/orders");
      })
      .catch(e => console.error(e));
  };

  const buttonMessageLogic = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return "Ordering...";
      case REQUEST_STATE.OK:
        return "Thank you!";
      default:
        return "Confirm Order";
    }
  };

  return (
    <>
      <HeaderComponent />
      {state.fetchState === REQUEST_STATE.LOADING && (
        <CenteredCirclarProgress>
          <CircularProgress />
        </CenteredCirclarProgress>
      )}
      {state.fetchState === REQUEST_STATE.OK &&
        (state.lineFoodsList ? (
          <ConfirmOrderList
            restaurantId={state.lineFoodsList.restaurant.id}
            name={state.lineFoodsList.restaurant.name}
            timeRequired={state.lineFoodsList.restaurant.time_required}
            count={state.lineFoodsList.count}
            amount={state.lineFoodsList.total_amount}
            shipping={state.lineFoodsList.restaurant.shipping}
            onClickConfirmOrder={() => onClickConfirmOrder()}
            buttonMessage={buttonMessageLogic()}
          />
        ) : (
          <Message>There is no items in your cart.</Message>
        ))}
    </>
  );
};
