export const restaurantsIndex = `${process.env.REACT_APP_SERVER_URL}/restaurants`;

export const foodsIndex = restaurantId => {
  return `${restaurantsIndex}/${restaurantId}/foods`;
};

export const lineFoods = `${process.env.REACT_APP_SERVER_URL}/line_foods`;

export const lineFoodsReplace = `${lineFoods}/replace`;

export const orders = `${process.env.REACT_APP_SERVER_URL}/orders`;
