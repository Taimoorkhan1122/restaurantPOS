import React, { useEffect, useState } from "react";
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
    SkeletonCircle,
    SkeletonText,
} from "@chakra-ui/react";

import { useForm, UseFormRegister, FieldValues, SubmitHandler } from "react-hook-form";
import { useToast } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

const Form1: React.FC<{ register: UseFormRegister<FieldValues>; isRequired: boolean }> = ({
    register,
    isRequired,
}) => {
    return (
        <>
            <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="24px">
                Onwner Info
            </Heading>
            <Flex gap="4" mb="4">
                <FormControl mr="5%">
                    <FormLabel htmlFor="firstName" fontWeight={"normal"}>
                        First name
                    </FormLabel>
                    <Input
                        {...register("firstName", {
                            required: isRequired,
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
                            required: isRequired,
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
                    <Input {...register("profilePicture")} />
                </InputGroup>
            </FormControl>
        </>
    );
};

const Form2: React.FC<{ register: UseFormRegister<FieldValues>; isRequired: boolean }> = ({
    register,
    isRequired,
}) => {
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
                            required: isRequired,
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
                            required: isRequired,
                        })}
                        placeholder="street # 05 plote no 01"
                    />
                </FormControl>
            </Flex>
        </>
    );
};

export default function Multistep({ closeModal }: { closeModal?: () => any }) {
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(50);
    const [restaurant, setRestaurant] = useState<null | any[]>(null);

    const toast = useToast();
    const router = useRouter();
    const supabase = useSupabaseClient();
    const user = useUser();
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        await UpdateOwner(data);
        if (restaurant?.length) {
            await UpdateRestaurant(data);
            closeModal && closeModal();
        } else {
            await registerRestaurant(data);
            router.push("/Profile");
        }
    };

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await supabase.from("restaurant").select().eq("owned_by", user?.id);

                if (!res.error && res.data) {
                    return setRestaurant(res.data);
                }

                throw Error(
                    "error in fetching restaurnat",
                    JSON.parse(JSON.stringify(res.error.message)),
                );
            } catch (error) {
                console.log("error in fetching restaurnat :", error);
            }
        };
        fetchRestaurant();
        return () => {
            setRestaurant(null);
        };
    }, [supabase, user?.id]);

    // if (restaurant === null || !restaurant.length)
    //     return (
    //         <Box padding="6" boxShadow="lg" bg="white">
    //             <SkeletonCircle size="10" />
    //             <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
    //         </Box>
    //     );

    const UpdateOwner = async (data: FieldValues) => {
        const { firstName, lastName, profilePicture } = data;

        try {
            const res = await supabase
                .from("owner")
                .update({
                    username: firstName`owner_res_${firstName}`,
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
            const { data: resData } = await supabase
                .from("restaurant")
                .select("id")
                .eq("name", restaurantName);
            if (resData?.length) {
                return toast({
                    title: "restaurant name already taken",
                    description: "please select a different name",
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
                toast({
                    title: "error in restaurant registration",
                    description: error.message ?? "something happened",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                throw Error(error.message);
            }

            toast({
                title: "restaurant created successfully.",
                description: "We've created your restaurant account ",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            console.log("error in restaurant registration", error);
        }
    };

    const UpdateRestaurant = async (data: FieldValues) => {
        const { restaurantName, location } = data;

        try {
            const { data, error } = await supabase
                .from("restaurant")
                .update({
                    name: restaurantName,
                    location: location,
                })
                .eq("owned_by", user?.id);

            if (error) {
                toast({
                    title: "error in updating restaurant",
                    description: error.message ?? "something happened",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                throw Error(error.message);
            }

            toast({
                title: "restaurant data updated successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
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
                minHeight="400px"
                p={restaurant?.length ? 4 : 6}
                m="1.5rem 0 auto"
                as="form"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box height="full">
                    <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated></Progress>
                    {step === 1 ? (
                        <Form1 register={register} isRequired={!!restaurant?.length} />
                    ) : (
                        <Form2 register={register} isRequired={!!restaurant?.length} />
                    )}
                </Box>
                <ButtonGroup mb="5%" w="100%">
                    <Flex w="100%" justifyContent="space-between">
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
                                disabled={isSubmitting}
                            >
                                {!restaurant?.length ? "Submit" : "Update"}
                            </Button>
                        ) : null}
                    </Flex>
                </ButtonGroup>
            </Box>
        </>
    );
}
