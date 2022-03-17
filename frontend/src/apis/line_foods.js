import axios from "axios";
import { lineFoods, lineFoodsReplace } from "../urls/index";

export const postLineFoods = (foodId, count) => {
  return axios
    .post(lineFoods, { food_id: foodId, count: count })
    .then(res => {
      return res;
    })
    .catch(e => {
      return e.response;
      // error時はエラーメッセージが返ってくるが、e.responseでエラー時のデータを取得可能(コンポーネント側ではthenに入る)
      // {throw e}とするとコンポーネント側ではcatchに入る
    });
};

export const putLineFoods = (foodId, count) => {
  return axios
    .put(lineFoodsReplace, { food_id: foodId, count: count })
    .then(res => {
      return res.data;
    })
    .catch(e => console.error(e));
};

export const fetchLineFoods = () => {
  return axios
    .get(lineFoods)
    .then(res => {
      return res.data;
    })
    .catch(e => console.error(e));
};
