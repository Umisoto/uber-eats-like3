import React, { useEffect, useReducer } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

// reducers
import {
  restaurantsReducer,
  initialState,
  restaurantActionTypes
} from "../reducers/restaurants";

// apis
import { fetchRestaurants } from "../apis/restaurants";

// components
import { HeaderLayout } from "../components/HeaderLayout";

// images
import MainCoverImage from "../images/main-cover-image.png";
import RestaurantImage from "../images/restaurant-image.jpg";

// constants
import { REQUEST_STATE } from "../api_constants";

const MainWrapper = styled.div`
  width: 100vw;
`;
const MainImageCenter = styled.div`
  text-align: center;
`;
const MainImageWrapper = styled.img`
  width: 100vw;
  max-width: 1200px;
  height: 50vw;
  max-height: 600px;
`;
const RestaurantsWrapper = styled.div`
  height: 45vw;
  display: flex;
  justify-content: space-around;
`;
const RestaurantItem = styled.div`
  width: 30vw;
`;
const RestaurantImageWrapper = styled.img`
  width: 30vw;
  cursor: pointer;
`;
const RestaurantName = styled.p`
  font-size: 2.5vw;
  margin: 0.8vw 0;
`;
const RestaurantInfo = styled.p`
  font-size: 2vw;
  margin: 0.8vw 0;
`;

export const Restaurants = () => {
  const [state, dispatch] = useReducer(restaurantsReducer, initialState);
  useEffect(() => {
    dispatch({ type: restaurantActionTypes.FETCHING });
    fetchRestaurants()
      .then(data => {
        dispatch({
          type: restaurantActionTypes.SUCCESS,
          payload: { restaurants: data.restaurants }
        });
      })
      .catch(e => console.error(e));
  }, []);

  return (
    <>
      <HeaderLayout />
      <MainWrapper>
        <MainImageCenter>
          <MainImageWrapper src={MainCoverImage} alt="main cover image" />
        </MainImageCenter>
        <RestaurantsWrapper>
          {state.fetchState === REQUEST_STATE.LOADING ? (
            <>
              <Skeleton variant="rect" width={"30vw"} height={"33vw"} />
              <Skeleton variant="rect" width={"30vw"} height={"33vw"} />
              <Skeleton variant="rect" width={"30vw"} height={"33vw"} />
            </>
          ) : (
            state.restaurantsList.map((res, index) => (
              // mapはreturnが必要なため、=>{return()}とするか=>()とする
              <RestaurantItem key={index}>
                <Link to={`/restaurants/${res.id}/foods`}>
                  <RestaurantImageWrapper
                    src={RestaurantImage}
                    alt="restaurant image"
                  />
                </Link>
                <RestaurantName>{res.name}</RestaurantName>
                <RestaurantInfo>配送時間：{res.time_required}分</RestaurantInfo>
                <RestaurantInfo>配送料：{res.shipping}円</RestaurantInfo>
              </RestaurantItem>
            ))
          )}
        </RestaurantsWrapper>
      </MainWrapper>
    </>
  );
};
