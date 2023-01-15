import React, { createContext, useContext, useReducer } from "react";
import { supabaseClient } from "./dbClient";

interface Props {
  children: React.ReactNode;
}

type Restaurant = {
  restaurantInfo: {};
  food: [];
  menu: [];
  staff: [];
  table: [];
};

type RestaurantAction = { type: any; payload: any };

const restaurantReducer = (
  state: Restaurant,
  action: RestaurantAction
): Restaurant => {
  switch (action.type) {
    case "INIT":
      let menu;
      let food;

      supabaseClient
        .rpc("fetch_food_with_menu", {
          rest_id: action.payload.restaurant,
        })
        .then(({ data, error }) => {
          if (error) console.error('function call =>',error);
          else console.log("function call =>", data);
        });

      // supabaseClient
      //   .from("menu")
      //   .select("*")
      //   .eq("restaurant_id", action.payload.restaurant?.id)
      //   .then(({ data, error }) => {
      //     if (data) {
      //       console.log("response data ", data);
      //       menu = data;
      //     }
      //     if (error) {
      //       console.log("response data ", error);
      //     }
      //   });

      // supabaseClient
      //   .from("food")
      //   .select("*")
      //   .eq("menu_id", menu)
      //   .then(({ data, error }) => {
      //     if (data) {
      //       console.log("response data ", data);
      //       menu = data
      //     }
      //     if (error) {
      //       console.log("response data ", error);
      //     }
      //   });

      return {
        ...state,
        menu: menu || [],
        food: action.payload.food || [],
        restaurantInfo: action.payload.restaurantInfo || {},
      };

    default:
      console.log("default...");
      return state;
  }
};

const defaultState: Restaurant = {
  restaurantInfo: {},
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
  const [restaurant, setRestaurant] = useReducer(
    restaurantReducer,
    defaultState
  );
  return (
    <RestaurantContext.Provider value={{ restaurant, setRestaurant }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurant = () => useContext(RestaurantContext);
