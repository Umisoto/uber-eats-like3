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
import { HeaderLayout } from "../components/HeaderLayout";

const CenteredCircularProgress = styled.div`
  text-align: center;
`;
const Message = styled.p`
  text-align: center;
  font-size: 1.5vw;
`;

export const Orders = () => {
  const [state, dispatch] = useReducer(lineFoodsReducer, initialState);

  const onClickConfirmOrder = () => {
    dispatch({ type: lineFoodsActionTypes.POSTING });
    postOrder(state.lineFoodsList.line_food_ids)
      .then(status => {
        dispatch({ type: lineFoodsActionTypes.POST_SUCCESS });
        status === 204 && (window.location.href = "/orders");
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    dispatch({ type: lineFoodsActionTypes.FETCHING });
    fetchLineFoods().then(data => {
      dispatch({ type: lineFoodsActionTypes.FETCH_SUCCESS, payload: data });
    });
  }, []);

  const buttonMessageLogic = () => {
    switch (state.postState) {
      case REQUEST_STATE.LOADING:
        return "注文中...";
      case REQUEST_STATE.OK:
        return "Thank you!";
      default:
        return "注文を確定する";
    }
  };

  return (
    <>
      <HeaderLayout />
      {state.fetchState === REQUEST_STATE.LOADING && (
        <CenteredCircularProgress>
          <CircularProgress />
        </CenteredCircularProgress>
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
            onClickConfirmOrder={onClickConfirmOrder}
            buttonMessage={buttonMessageLogic()}
          />
        ) : (
          <Message>カートに商品が入っていません。</Message>
        ))}
    </>
  );
};
