import React, { useEffect, useReducer, useState } from "react";
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
import Logo from "../images/logo.png";
import FoodLogo from "../images/food-image.jpg";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LogoWrapper = styled.img`
  margin: 0 1vw;
  height: 12vw;
`;
const ColoredBagIcon = styled(LocalMallIcon)`
  margin: 5vw 2vw;
  color: green;
`;
const FoodsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
const FoodContainer = styled.div`
  display: flex;
  width: 32vw;
  height: 15vw;
  margin: 1.5vw 0;
  border: 0.1vw #c0c0c0 solid;
  cursor: pointer;
`;
const FoodInfoContainer = styled.div`
  width: 14vw;
  height: 15vw;
`;
const FoodDescription = styled.p`
  font-size: 1.5vw;
  margin: 1vw 0;
`;
const FoodImageContainer = styled.img`
  width: 18vw;
  height: 15vw;
`;
const StyledSkeleton = styled(Skeleton)`
  width: 32vw;
  height: 15vw;
`;

export const Foods = () => {
  const { restaurantsId } = useParams();
  const navigate = useNavigate();

  const initModalState = {
    isOpenAddingCartModal: false,
    isOpenReplaceCartModal: false,
    selectedFood: [],
    count: 1,
    newRestaurant: null,
    existingRestaurant: null
  };
  const [modalState, setModalState] = useState(initModalState);

  const [state, dispatch] = useReducer(foodsReducer, initialState);

  const onClickModalOpen = food => {
    setModalState({
      ...modalState,
      isOpenAddingCartModal: true,
      selectedFood: food
    });
  };

  const onCloseAddingCartModal = () => {
    setModalState({ initialState });
  };

  const ConfirmButtonLogic = () => {
    postLineFoods(modalState.selectedFood.id, modalState.count)
      .then(res => {
        res.status === 201
          ? navigate("/orders")
          : setModalState({
              ...modalState,
              isOpenAddingCartModal: false,
              isOpenReplaceCartModal: true,
              newRestaurant: res.data.new_restaurant,
              existingRestaurant: res.data.existing_restaurant
            });
      })
      .catch(e => console.error(e));
  };

  const onClickReplace=()=>{
      putLineFoods(modalState.selectedFood.id, modalState.count)
      .then(()=>{
        navigate("/orders")
      })
      .catch(e=>console.error(e))
  }

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

  return (
    <>
      <Header>
        <Link to="/restaurants">
          <LogoWrapper src={Logo} alt="logo" />
        </Link>
        <Link to="/orders">
          <ColoredBagIcon />
        </Link>
      </Header>
      <FoodsWrapper>
        {state.fetchState === REQUEST_STATE.LOADING
          ? [...Array(12).keys()].map(index => (
              <StyledSkeleton variant="rect" key={index} />
            ))
          : state.foodsList.map((food, index) => (
              <FoodContainer key={index} onClick={() => onClickModalOpen(food)}>
                <FoodInfoContainer>
                  <FoodDescription>{food.name}</FoodDescription>
                  <FoodDescription>{food.description}</FoodDescription>
                  <FoodDescription>¥{food.price}</FoodDescription>
                </FoodInfoContainer>
                <FoodImageContainer src={FoodLogo} />
              </FoodContainer>
            ))}
      </FoodsWrapper>

      {modalState.isOpenAddingCartModal === true && (
        <>
          <AddingCartConfirmModal
            isOpen={modalState.isOpenAddingCartModal}
            onClose={() => onCloseAddingCartModal()}
            name={modalState.selectedFood.name}
            description={modalState.selectedFood.description}
            count={modalState.count}
            price={modalState.selectedFood.price}
            onClickIncreaseCount={() =>
              setModalState({
                ...modalState,
                count: modalState.count + 1
              })
            }
            onClickDecreaseCount={() =>
              setModalState({
                ...modalState,
                count: modalState.count - 1
              })
            }
            onClickConfirmButton={() => ConfirmButtonLogic()}
          />
        </>
      )}

      {modalState.isOpenReplaceCartModal && (
        <ReplaceCartModal
          isOpen={modalState.isOpenReplaceCartModal}
          onClose={() => setModalState(initialState)}
          newRestaurant={modalState.newRestaurant}
          existingRestaurant={modalState.existingRestaurant}
          onClickReplace={()=>onClickReplace()}
        />
      )}
    </>
  );
};
