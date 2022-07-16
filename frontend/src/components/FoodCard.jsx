import React from "react"
import styled from "styled-components"

// images
import FoodLogo from "../images/food-image.jpg";

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

export const FoodCard=({
    name,
    description,
    price,
    onClickModalOpen,
})=>{

    return(
        <FoodContainer onClick={onClickModalOpen}>
          <FoodInfoContainer>
            <FoodDescription>{name}</FoodDescription>
            <FoodDescription>{description}</FoodDescription>
            <FoodDescription>¥{price}</FoodDescription>
          </FoodInfoContainer>
          <FoodImageContainer src={FoodLogo} />
        </FoodContainer>
    )
}