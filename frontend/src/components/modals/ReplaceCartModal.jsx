import React from "react";
import styled from "styled-components";
import {Dialog, DialogTitle, DialogContent, DialogActions} from "@material-ui/core";

// components
import {ConfirmButton} from "../buttons";

const TitleMessage=styled.h4`
    font-size: 2vw;
`
const ReplaceMessage=styled.p`
    font-size: 1.5vw;
`

export const ReplaceCartModal=({isOpen, onClose, newRestaurant, existingRestaurant, onClickReplace})=>{
    return(
        <Dialog open={isOpen} >
            <DialogTitle>
                <TitleMessage>新規注文を開始しますか？</TitleMessage>
            </DialogTitle>
            <DialogContent>
                <ReplaceMessage>ご注文に「{newRestaurant}」の商品が含まれています。</ReplaceMessage>
                <ReplaceMessage>新規の注文を開始して、「{existingRestaurant}」の商品を追加してください。</ReplaceMessage>
            </DialogContent>
            <DialogActions>
                <ConfirmButton onClose={()=>onClose()} onClick={()=>onClickReplace()} >Replace a Cart</ConfirmButton>
            </DialogActions>
        </Dialog>
    )
}