import axios from "axios";
import { foodsIndex } from "../urls/index";

export const fetchFoods = restaurantsId => {
  return axios
    .get(foodsIndex(restaurantsId))
    .then(res => {
      return res.data;
    })
    .catch(e => console.error(e));
};
