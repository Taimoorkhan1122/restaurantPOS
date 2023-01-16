import { SupabaseClient } from "@supabase/supabase-js";

export const init = async (supabaseClient: SupabaseClient, rest_id: string) => {
  let myMenu: { name: string; id: string }[] = [];
  const myFood: { name: string; id: string; price: number }[] = [];

  const { data, error } = await supabaseClient.rpc("fetch_food_with_menu3", {
    rest_id,
  });

  const { data: menuData, error: menuError } = await supabaseClient
    .from("menu")
    .select("id, name")
    .eq("restaurant_id", rest_id);

  if (error || menuError) console.error("function call =>", error || menuError);

  else {
    myMenu = [...menuData]
    data.map((m) => {
      myFood.push({ name: m["food_name"], id: m["food_id"], price: m["price"] });
    });
  }

  console.log("init function call ", { myMenu, myFood, menuData });

  return {
    menu: [...myMenu] || [],
    food: [...myFood] || [],
  };
};
