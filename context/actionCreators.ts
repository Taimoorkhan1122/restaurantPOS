import { RestaurantAction } from "./restaurantContext";

export const actionCreators = {
  init: ({ type, payload }: RestaurantAction) => ({ type, payload }),
};
