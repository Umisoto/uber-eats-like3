const DEFAULT_API_URL = "http://localhost:3000/api";

export const restaurantsIndex = `${DEFAULT_API_URL}/restaurants`;

export const foodsIndex = restaurantId => {
  return `${restaurantsIndex}/${restaurantId}/foods`;
};

export const lineFoods = `${DEFAULT_API_URL}/line_foods`;

export const lineFoodsReplace = `${lineFoods}/replace`;

export const orders = `${DEFAULT_API_URL}/orders`;
