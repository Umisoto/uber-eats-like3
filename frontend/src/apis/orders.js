import axios from "axios";
import { orders } from "../urls/index";

export const postOrder = lineFoodIds => {
  return axios
    .post(orders, { line_food_ids: lineFoodIds })
    .then(res => {
      return res.status;
    })
    .catch(e => {
      throw e;
    });
};
