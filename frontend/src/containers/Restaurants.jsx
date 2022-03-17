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
import {HeaderComponent} from "../components/Header";

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
  height: 50vw;
  margin: 1vw;
`;
const RestaurantsWrapper = styled.div`
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
const SkeletonStyled = styled(Skeleton)`
  width: 30vw;
  height: 40vw;
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
      <HeaderComponent />
      <MainWrapper>
        <MainImageCenter>
          <MainImageWrapper src={MainCoverImage} alt="main cover image" />
        </MainImageCenter>
        <RestaurantsWrapper>
          {state.fetchState === REQUEST_STATE.LOADING ? (
            <>
              <SkeletonStyled variant="rect" />
              <SkeletonStyled variant="rect" />
              <SkeletonStyled variant="rect" />
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
