import { Button, Text, Input, Box, FormControl, useToast } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const MenuForm: React.FC<{ onClose: () => void }> = ({
    onClose,
}) => {
    const {
        register,
        handleSubmit,
        formState: { isValid, errors, isDirty, isSubmitting },
    } = useForm<{ name: string; details: string }>();
    const toast = useToast();

    const supabase = useSupabaseClient();
    const user = useUser();

    console.log(isValid);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            if (!data) throw Error("no fields provided");

            const restaurant = await supabase
                .from("restaurant")
                .select("id")
                .eq("owned_by", user?.id);

            if (restaurant.error)
                throw Error(
                    "no fields provided",
                    JSON.parse(JSON.stringify(restaurant.error.message)),
                );

            const { data: res, error } = await supabase.from("menu").insert({
                ...data,
                restaurant_id: restaurant.data[0].id,
            });

            if (error) {
                toast({
                    title: `error in adding menu `,
                    status: "info",
                    description: error.hint,
                    variant: "subtle",
                    position: "bottom",
                    isClosable: true,
                });
                throw Error("error in adding menu", JSON.parse(JSON.stringify(error.message)));
            }

            toast({
                title: `Menu added `,
                status: "info",
                variant: "subtle",
                position: "bottom",
                isClosable: true,
            });
        } catch (error) {
            console.log("error in adding menu: ", error);
        } finally {
          onClose();
        }
    };

    return (
        <Box mx={5} my={5} as="form" onSubmit={handleSubmit(onSubmit)}>
            <Text color={"brand.main"} fontWeight={"bold"} textAlign={"center"}>
                Menu Form
            </Text>

            <FormControl mb={3}>
                <Text as={"label"}>Name</Text>
                <Input
                    {...register("name", {
                        required: true,
                    })}
                    borderColor={"#F5F5F5"}
                    placeholder="Enter Name"
                />
            </FormControl>

            <FormControl mb={3}>
                <Text as={"label"}>Detail</Text>
                <Input
                    {...register("details", {
                        required: true,
                    })}
                    borderColor={"#F5F5F5"}
                    placeholder="Enter details about menu"
                />
            </FormControl>

            <Box w={"full"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Button
                    _hover={{ bg: "brand.main" }}
                    bg={"brand.main"}
                    w={"40%"}
                    color={"white"}
                    disabled={!isValid || isSubmitting}
                    type="submit"
                >
                    Add Category
                </Button>
            </Box>
        </Box>
    );
};

export default MenuForm;
