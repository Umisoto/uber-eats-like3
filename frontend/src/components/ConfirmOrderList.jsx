import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// components
import { LocalMallIcon, QueryBuilderIcon } from "../components/common_logos";
import { ConfirmButton } from "../components/buttons";

const ItemWrapper = styled.div`
  width: 40vw;
  margin: 0 auto;
`;
const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledLocalMallIcon = styled(LocalMallIcon)`
  margin-top: 1.5vw;
  color: black;
`;
const StyledQueryBuilderIcon = styled(QueryBuilderIcon)`
  margin-top: 1.5vw;
`;
const ItemDescription = styled.p`
  margin-top: 1.5vw;
  font-size: 1.5vw;
`;

export const ConfirmOrderList = ({
  restaurantId,
  name,
  timeRequired,
  count,
  amount,
  shipping,
  onClickConfirmOrder,
  buttonMessage
}) => {
  return (
    <>
      <ItemWrapper>
        <ItemRow>
          <Link
            to={`/restaurants/${restaurantId}/foods`}
            style={{ textDecoration: "none" }}
          >
            <StyledLocalMallIcon />
          </Link>
          <ItemDescription>{name}</ItemDescription>
        </ItemRow>
        <ItemRow>
          <StyledQueryBuilderIcon />
          <ItemDescription>{timeRequired}分</ItemDescription>
        </ItemRow>
        <ItemRow>
          <ItemDescription>数量</ItemDescription>
          <ItemDescription>{count}</ItemDescription>
        </ItemRow>
        <ItemRow>
          <ItemDescription>小計</ItemDescription>
          <ItemDescription>¥{amount}</ItemDescription>
        </ItemRow>
        <ItemRow>
          <ItemDescription>送料</ItemDescription>
          <ItemDescription>¥{shipping}</ItemDescription>
        </ItemRow>
        <ItemRow>
          <ItemDescription>合計</ItemDescription>
          <ItemDescription>¥{amount + shipping}</ItemDescription>
        </ItemRow>
        <ConfirmButton onClick={() => onClickConfirmOrder()}>
          {buttonMessage}
        </ConfirmButton>
      </ItemWrapper>
    </>
  );
};
