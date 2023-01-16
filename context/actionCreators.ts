import { RestaurantAction } from "./restaurantContext";

export const actionCreators = {
  init: (action: RestaurantAction) => ({ ...action }),
  addFood: ( action : RestaurantAction) => ({ ...action }),
};
