import { SupabaseClient } from "@supabase/supabase-js";

export const init = async (supabaseClient: SupabaseClient, rest_id: string) => {
  const myMenu: {}[] = [];
  const myFood: {}[] = [];

  const { data, error } = await supabaseClient.rpc("fetch_food_with_menu", {
    rest_id,
  });

  if (error) console.error("function call =>", error);
  else {
    data.map((m) => {
      myMenu.push({ name: m["name"], id: m["id"] });
      myFood.push({ name: m["food_name"], id: m["food_id"], price: m["price"] });
    });
  }

  console.log(myMenu, myFood);

  return {
    menu: [...myMenu] || [],
    food: [...myFood] || [],
  };
};
