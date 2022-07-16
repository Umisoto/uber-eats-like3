import React from "react";
import styled from "styled-components";
import {
  DialogContent,
  Dialog,
  DialogTitle,
  DialogActions
} from "@material-ui/core";

// components
import { ConfirmButton, RoundButton } from "../../components/buttons";

// images
import OrderHeaderLogo from "../../images/order-header.png";

const OrderHeader = styled.img`
  width: 40vw;
`;
const FoodName = styled.p`
  font-size: 2vw;
  padding: 0;
`;
const ImageArrangement = styled.div`
  text-align: center;
`;
const FoodDescription = styled.p`
  font-size: 1.5vw;
  padding: 0 1vw;
`;
const ButtonMessage=styled.span`
  font-size: 1.5vw;
  margin:0vw;
`
const PriceMessage=styled.span`
  font-size: 1.5vw;
  margin-right: 1vw;
  float: right;
`

export const AddingCartConfirmModal = ({
  isOpen,
  onClose,
  name,
  description,
  count,
  buttonMessage,
  amount,
  onClickIncreaseCount,
  onClickDecreaseCount,
  onClickConfirmButton
}) => {

  return (
      <Dialog open={isOpen} onClose={onClose} maxWidth={"xl"} >
        <ImageArrangement>
          <OrderHeader src={OrderHeaderLogo} />
        </ImageArrangement>
        <DialogTitle>
          <FoodName>{name}</FoodName>
        </DialogTitle>
        <DialogContent>
          <FoodDescription>{description}</FoodDescription>
        </DialogContent>
        <DialogActions>
          <RoundButton
            disabled={count <= 1}
            onClick={onClickDecreaseCount}
          >
            -
          </RoundButton>
          <FoodDescription>{count}</FoodDescription>
          <RoundButton
            disabled={count >= 9}
            onClick={onClickIncreaseCount}
          >
            +
          </RoundButton>
          <ConfirmButton onClick={onClickConfirmButton}>
            <ButtonMessage>
            {buttonMessage}
            </ButtonMessage>
            <PriceMessage>{amount}</PriceMessage>
          </ConfirmButton>
        </DialogActions>
      </Dialog>
  );
};
