import {
  Button,
  Text,
  Input,
  Box,
  FormControl,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const FoodForm: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isDirty, isSubmitting },
  } = useForm<{ name: string; status: {}, price: number,details: string, menu_id: string }>();
  const toast = useToast();

  const supabase = useSupabaseClient();
  const user = useUser();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (!data) throw Error("no fields provided");

      const restaurant = await supabase
        .from("restaurant")
        .select("id")
        .eq("owned_by", user?.id);

      if (restaurant.error)
        throw Error(
          "no restaurant found, first register restaurant",
          JSON.parse(JSON.stringify(restaurant.error.message))
        );

      const { data: res, error } = await supabase.from("food").insert({
        ...data,
        restaurant_id: restaurant.data[0].id,
      });

      if (error) {
        toast({
          title: `error in adding food item `,
          status: "error",
          description: error.hint,
          variant: "subtle",
          position: "bottom",
          isClosable: true,
        });
        throw Error(
          "error in adding food item",
          JSON.parse(JSON.stringify(error.message))
        );
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
    <Box mx={5} my={5}>
      <Text color={"brand.main"} fontWeight={"bold"} textAlign={"center"}>
        Food Form
      </Text>
      <FormControl mb={3}>
        <Text as={"label"}>Name</Text>
        <Input {...register('name')} borderColor={"#F5F5F5"} placeholder="Enter Name" />
      </FormControl>

      <FormControl mb={3}>
        <Text as={"label"}>Details</Text>
        <Input {...register('details')} borderColor={"#F5F5F5"} placeholder="Enter Description" />
      </FormControl>

      <FormControl mb={3}>
        <Text as={"label"}>Price</Text>
        <Input {...register('price')} borderColor={"#F5F5F5"} placeholder="Enter Price" />
      </FormControl>

      <FormControl mb={3}>
        <Text as={"label"}>Category</Text>
        <Select
        {...register('menu_id')}
          placeholder="Select category"
          size="md"
          borderColor={"#F5F5F5"}
          _focusVisible={{
            outline: "none",
          }}
        >
          <option value="option3">Food</option>
          <option value="option1">Time</option>
          <option value="option2">Dish</option>
        </Select>
      </FormControl>


      <Box
        w={"full"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          _hover={{ bg: "brand.main" }}
          bg={"brand.main"}
          w={"30%"}
          color={"white"}
          onClick={onClose}
        >
          Text
        </Button>
      </Box>
    </Box>
  );
};

export default FoodForm;
