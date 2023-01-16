import { Box } from "@chakra-ui/layout";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import Signin from "../pages/Signin";
import Breadcrump from "./Breadcrump";
import Header from "./Header";
import MobileNav from "./MobileNav";
import SidebarWithAvatar from "./SidebarWithAvatar";
import { useEffect, useCallback } from "react";
import { useRestaurant } from "../context/restaurantContext";
import { actionCreators } from "../context/actionCreators";
import { init } from "../api/init";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useRouter();
  const paths = ["/", "/signin", "/signup"];
  const showBreadCrumps = paths.includes(pathname);
  const session = useSession();
  const supabase = useSupabaseClient();
  const { setRestaurant } = useRestaurant();

  const setRestaurantInfo = useCallback(
    async (id: string) => {
      const { food, menu } = await init(supabase, id);

      if (food.length && menu.length) {
        setRestaurant(
          actionCreators.init({
            type: "INIT",
            payload: {
              menu,
              food,
              restaurantInfo: {
                user: session?.user?.id,
                restaurant: id,
              },
            },
          })
        );
      }
    },
    [setRestaurant, supabase, session?.user?.id]
  );

  useEffect(() => {
    const restaurantId = localStorage.getItem("restaurant_id");

    if (restaurantId?.length) {
      setRestaurantInfo(restaurantId);
    }
  }, []);

  return (
    <Box width="full" height="full">
      {/* <Box
                position="absolute"
                display="flex"
                alignItems="center"
                width="full"
                height="50px"
                top="0"
                left="0"
            >
               
            </Box> */}
      <Box
        paddingBottom="20px"
        width="100vw"
        maxWidth="full"
        height="calc(100% - 56px)"
        overflowY="auto"
      >
        <SidebarWithAvatar user={session && session?.user}>
          {!showBreadCrumps && <Breadcrump location={pathname} />}
          {children}
        </SidebarWithAvatar>
      </Box>
      <Box
        position="absolute"
        left="0"
        bottom="0"
        display="flex"
        alignItems="center"
        borderTopRadius="20px"
        width="full"
        height="56px"
        bg="brand.main"
      >
        <MobileNav showCreate={pathname !== "/Dashboard"} />
      </Box>
    </Box>
  );
};

export default Layout;
