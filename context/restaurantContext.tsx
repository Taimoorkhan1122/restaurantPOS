import React, { createContext, useContext, useReducer } from "react";

interface Props {
  children: React.ReactNode;
}

type Restaurant = {
  restaurantInfo: {
    user: string;
    restaurant: string;
  };
  food: { name: string; id: string; price: number }[];
  menu: { name: string; id: string }[];
  staff: {}[];
  table: {}[];
};

export type RestaurantAction = { type: any; payload: any };

const restaurantReducer = (state: Restaurant, action: RestaurantAction): Restaurant => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        ...action.payload,
      };

    case "ADD_FOOD":
      return {
        ...state,
        food: [...state.food, action.payload],
      };
    case "ADD_MENU":
      return {
        ...state,
        menu: [...state.menu, action.payload],
      };

    default:
      console.log("default...");
      return state;
  }
};

const defaultState: Restaurant = {
  restaurantInfo: {
    restaurant: "",
    user: "",
  },
  food: [],
  menu: [],
  staff: [],
  table: [],
};

const myRestaurant = {
  restaurant: defaultState,
  setRestaurant: (action: RestaurantAction): void => {},
};

export const RestaurantContext = createContext<{
  restaurant: Restaurant;
  setRestaurant: React.Dispatch<RestaurantAction>;
}>(myRestaurant);

export const RestaurantProvider: React.FC<Props> = ({ children }) => {
  const [restaurant, setRestaurant] = useReducer(restaurantReducer, defaultState);
  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
