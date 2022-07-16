import React, { useEffect, useReducer, useState, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import styled from "styled-components";
import Skeleton from "@material-ui/lab/Skeleton";

// apis
import { fetchFoods } from "../apis/foods";
import { postLineFoods, putLineFoods } from "../apis/line_foods";

// reducers
import {
  foodsActionTypes,
  initialState,
  foodsReducer
} from "../reducers/foods";

// components
import { LocalMallIcon } from "../components/common_logos";
import { AddingCartConfirmModal } from "../components/modals/AddingCartConfirmModal";
import { ReplaceCartModal } from "../components/modals/ReplaceCartModal";

// constants
import { REQUEST_STATE } from "../api_constants";

// images
import { HeaderLayout } from "../components/HeaderLayout";
import { FoodCard } from "../components/FoodCard";

const ColoredBagIcon = styled(LocalMallIcon)`
  color: green;
  margin-right: 1vw;
`;
const FoodsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const StyledSkeleton = styled(Skeleton)`
  margin: 1.6vw 0;
`;

export const Foods = () => {
  const { restaurantsId } = useParams();
  const navigate = useNavigate();

  const initRestaurant={
    newRestaurant: null,
    existingRestaurant: null
  }
  const [selectedFood, setSelectedFood]=useState([])
  const [count, setCount]=useState(1);
  const [amount, setAmount]=useState(500);
  const [isOpenAddingCartModal, setIsOpenAddingCartModal]=useState(false)
  const [isOpenReplaceCartModal, setIsOpenReplaceCartModal]=useState(false)
  const [restaurant, setRestaurant]=useState(initRestaurant)
  const [state, dispatch] = useReducer(foodsReducer, initialState);

  const onClickModalOpen = food => {
    setIsOpenAddingCartModal(true)
    setSelectedFood(food)
    setCount(1)
    setAmount(500)
  };

  const onClickIncreaseCount = () => {
    setCount(count+1)
    setAmount((count+1)*selectedFood.price)
  }

  const onClickDecreaseCount = () => {
    setCount(count-1)
    setAmount((count-1)*selectedFood.price)
  }

  const onClickConfirmButton = () => {
    postLineFoods(selectedFood.id, count)
      .then(res => {
        res.status === 201
          ? navigate("/orders")
          : 
            setIsOpenAddingCartModal(false)
            setIsOpenReplaceCartModal(true)
            setRestaurant({
              newRestaurant: res.data.new_restaurant,
              existingRestaurant: res.data.existing_restaurant
            })
      })
  };

  const onClickReplace = () => {
      putLineFoods(selectedFood.id, count)
      .then(()=>{
        navigate("/orders")
      })
      .catch(e => console.error(e));
  };

  useEffect(() => {
    dispatch({ type: foodsActionTypes.FETCHING });
    fetchFoods(restaurantsId)
      .then(data => {
        dispatch({
          type: foodsActionTypes.SUCCESS,
          payload: { foods: data.foods }
        });
      })
      .catch(e => console.error(e));
  }, []);

  const children=useMemo(()=>(
    <HeaderLayout >
      <Link to="/orders">
        <ColoredBagIcon />
      </Link>
    </HeaderLayout>
  ), [])

  return (
    <>
      {children}
      <FoodsWrapper>
        {state.fetchState === REQUEST_STATE.LOADING
          ? [...Array(12).keys()].map(index => (
              <StyledSkeleton variant="rect" width={"32vw"} height={"15vw"} key={index} />
            ))
          : state.foodsList.map((food, index) => (
              <div key={index} >
                <FoodCard name={food.name} description={food.description} price={food.price} onClickModalOpen={()=>onClickModalOpen(food)} />
              </div>
            ))}
      </FoodsWrapper>

      {isOpenAddingCartModal === true && (
          <AddingCartConfirmModal
            isOpen={isOpenAddingCartModal}
            onClose={()=>setIsOpenAddingCartModal(false)}
            name={selectedFood.name}
            description={selectedFood.description}
            count={count}
            buttonMessage={`${count}点をカートに追加する`}
            amount={`¥${amount}`}
            onClickIncreaseCount={onClickIncreaseCount}
            onClickDecreaseCount={onClickDecreaseCount}
            onClickConfirmButton={onClickConfirmButton}
          />
      )}

      {isOpenReplaceCartModal && (
        <ReplaceCartModal
          isOpen={isOpenReplaceCartModal}
          onClose={()=>setIsOpenReplaceCartModal(false)}
          newRestaurant={restaurant.newRestaurant}
          existingRestaurant={restaurant.existingRestaurant}
          onClickReplace={onClickReplace}
        />
      )}
    </>
  );
};
