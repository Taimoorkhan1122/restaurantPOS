import { Button, Text, Input, Box, FormControl, Select, useToast } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { actionCreators } from "../context/actionCreators";
import { useRestaurant } from "../context/restaurantContext";

const FoodForm: React.FC<{
  onClose: () => void;
}> = ({ onClose }) => {
  const toast = useToast();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { restaurant, setRestaurant } = useRestaurant();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isDirty, isSubmitting },
  } = useForm<{
    name: string;
    price: number;
    details: string;
    status: boolean;
    menu_id: string;
  }>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      if (!data) throw Error("no fields provided");

      const { data: res, error } = await supabase
        .from("food")
        .insert({
          ...data,
        })
        .select("name, id, price");

      if (error) {
        toast({
          title: `error in adding food item `,
          status: "error",
          description: error.hint,
          variant: "subtle",
          position: "bottom",
          isClosable: true,
        });
        throw Error("error in adding food item " + JSON.parse(JSON.stringify(error.message)));
      }

      const [{ id, name, price }] = res;

      setRestaurant(
        actionCreators.addFood({
          name,
          id,
          price,
        })
      );

      toast({
        title: `food item added `,
        status: "info",
        variant: "subtle",
        position: "bottom",
        isClosable: true,
      });
    } catch (error) {
      console.log("error in adding food item: ", error);
    } finally {
      onClose();
    }
  };

  return (
    <Box mx={5} my={5} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Text color={"brand.main"} fontWeight={"bold"} textAlign={"center"}>
        Food Form
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
        <Text as={"label"}>Details</Text>
        <Input
          {...register("details", {
            required: true,
          })}
          borderColor={"#F5F5F5"}
          placeholder="Enter Description"
        />
      </FormControl>

      <FormControl mb={3}>
        <Text as={"label"}>Price</Text>
        <Input
          type="number"
          {...register("price", {
            min: 0,
            valueAsNumber: true,
            required: true,
          })}
          borderColor={"#F5F5F5"}
          placeholder="Enter Price"
        />
      </FormControl>

      <FormControl mb={3}>
        <Text as={"label"}>Status</Text>

        <Select
          {...register("status", {
            required: true,
          })}
          placeholder="Select category"
          size="md"
          borderColor={"#F5F5F5"}
          _focusVisible={{
            outline: "none",
          }}
        >
          <option value={1} selected>
            available
          </option>
          <option value={0}>ended</option>
        </Select>
      </FormControl>

      <FormControl mb={3}>
        <Text as={"label"}>Category</Text>
        <Select
          {...register("menu_id", {
            required: true,
          })}
          placeholder="Select category"
          size="md"
          borderColor={"#F5F5F5"}
          _focusVisible={{
            outline: "none",
          }}
        >
          {restaurant.menu.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </Select>
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
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default FoodForm;
