import React, { useState } from "react";
import {
    Progress,
    Box,
    ButtonGroup,
    Button,
    Heading,
    Flex,
    FormControl,
    GridItem,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    InputLeftAddon,
    InputGroup,
    Textarea,
    FormHelperText,
    InputRightElement,
    Avatar,
} from "@chakra-ui/react";

import { useForm, UseFormRegister, FieldValues, SubmitHandler } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@supabase/auth-ui-react/dist/esm/common/theming";
import { useRouter } from "next/router";

const Form1: React.FC<{ register: UseFormRegister<FieldValues> }> = ({ register }) => {
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="24px">
                Onwner Info
            </Heading>
            <Flex gap="4">
                <FormControl mr="5%">
                    <FormLabel htmlFor="firstName" fontWeight={"normal"}>
                        First name
                    </FormLabel>
                    <Input
                        {...register("firstName", {
                            required: true,
                        })}
                        placeholder="First name"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="lastName" fontWeight={"normal"}>
                        Last Name
                    </FormLabel>
                    <Input
                        {...register("lastName", {
                            required: true,
                        })}
                        placeholder="First name"
                    />
                </FormControl>
            </Flex>

            <FormControl>
                <FormLabel htmlFor="profilePicture" fontWeight={"normal"} mt="2%">
                    Profile Picture
                </FormLabel>
                <InputGroup size="md">
                    <Input pr="4.5rem" {...register("profilePicture")} />
                </InputGroup>
            </FormControl>
        </>
    );
};

const Form2: React.FC<{ register: UseFormRegister<FieldValues> }> = ({ register }) => {
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="24px">
                Restaurant Info
            </Heading>
            <Flex direction="column" gap="4">
                <FormControl mr="5%">
                    <FormLabel htmlFor="restaurantName" fontWeight={"normal"}>
                        Restaurant Name
                    </FormLabel>
                    <Input
                        {...register("restaurantName", {
                            required: true,
                        })}
                        placeholder="Restaurant name"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="location" fontWeight={"normal"}>
                        Loctaion
                    </FormLabel>
                    <Input
                        {...register("location", {
                            required: true,
                        })}
                        placeholder="street # 05 plote no 01"
                    />
                </FormControl>
            </Flex>
        </>
    );
};

export default function Multistep() {
    const toast = useToast();
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);
    const router = useRouter();

    const supabase = useSupabaseClient();
    const user = useUser();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isDirty },
    } = useForm({
        mode: "onBlur",
    });

    console.log(errors, getValues());

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await UpdateOwner(data);

        await registerRestaurant(data);
    };

    const UpdateOwner = async (data: FieldValues) => {
        const { firstName, lastName, profilePicture } = data;

        try {
            const res = await supabase
                .from("owner")
                .update({
                    username: `owner_res_${firstName}`,
                    full_name: firstName + " " + lastName,
                    avatar_url: profilePicture,
                })
                .eq("id", user?.id);

            if (res.error) {
                console.log("error in updating user ", res.error);
                throw Error(res.error.message);
            }
        } catch (error) {
            console.log("error in restaurant registration", error);
        }
    };
    const registerRestaurant = async (data: FieldValues) => {
        const { restaurantName, location } = data;

        try {
            const restaurant = await supabase.from("restaurant").select("id").eq("id", user?.id);
            if (restaurant) {
                return toast({
                    title: "restaurant already exist.",
                    description: "One account can have only one restaurant",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
            const { data, error } = await supabase.from("restaurant").insert({
                name: restaurantName,
                location: location,
                owned_by: user?.id,
            });

            if (error) {
                console.log("error in updating user ", error);
                throw Error(error.message);
            }

            toast({
                title: "restaurant created successfully.",
                description: "We've created your restaurant account ",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.log("error in restaurant registration", error);
        }
    };

    return (
        <>
            <Box
                borderWidth="1px"
                maxWidth={450}
                width="100vw"
                height="full"
                p={6}
                m="0 auto"
                as="form"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box>
                    <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
                    {step === 1 ? <Form1 register={register} /> : <Form2 register={register} />}
                </Box>
                <ButtonGroup mb="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
                        <Flex>
                            <Button
                                onClick={() => {
                                    setStep(step - 1);
                                    setProgress(progress - 50);
                                }}
                                isDisabled={step === 1}
                                colorScheme="teal"
                                variant="solid"
                                w="7rem"
                                mr="5%"
                            >
                                Back
                            </Button>
                        </Flex>
                        {step === 1 && (
                            <Button
                                w="7rem"
                                onClick={() => {
                                    setStep(step + 1);
                                    if (step === 1) {
                                        setProgress(100);
                                    }
                                }}
                                colorScheme="teal"
                                variant="outline"
                            >
                                Next
                            </Button>
                        )}
                        {step === 2 ? (
                            <Button
                                bg={"brand.main"}
                                color={"white"}
                                _hover={{
                                    bg: "brand.light",
                                    color: "brand.dark",
                                }}
                                type="submit"
                            >
                                Submit
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}
