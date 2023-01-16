import { RestaurantAction } from "./restaurantContext";

export const actionCreators = {
  init: (payload: any) => ({ type: "INIT", payload }),
  addFood: (payload: any) => ({ type: "ADD_FOOD", payload }),
  addMenu: (payload: any) => ({ type: "ADD_MENU", payload }),
};
