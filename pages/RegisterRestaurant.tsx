import { Box } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import Multistep from "../components/RestaurantForm";
import { createOrUpdate } from "../utils/constansts";

const RegisterRestaurant = () => {
    const supabase = useSupabaseClient();
    const user = useUser();
    const [restaurant, setRestaurant] = useState<null | any[]>();
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await supabase.from("restaurant").select().eq("owned_by", user?.id);
              
                if (!res.error && res.data) {
                    return setRestaurant(res.data);
                }

                throw Error("error in fetching restaurnat", JSON.parse(JSON.stringify(res.error)));
            } catch (error) {
                console.log("error in fetching restaurnat :", error);
            }
        };
        fetchRestaurant();
        return () => {
            setRestaurant(null);
        };
    }, []);

    return (
        <Box h="100vh">
            <Multistep  />
        </Box>
    );
};

export default RegisterRestaurant;
