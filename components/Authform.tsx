import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useToast,
    Badge,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import cookie from "cookie-cutter";
import { useRouter } from "next/router";

import { FC, useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { mode as authMode } from "../utils/constansts";

interface IState {
    email: string;
    password: string;
}

const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Authfrom: FC<{ mode: authMode }> = ({ mode }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isDirty },
    } = useForm<IState>({
        mode: "onBlur",
    });

    const router = useRouter();

    const [validationError, setValidationError] = useState<{
        name: string;
        message: { type: string; value: string };
    }>();

    const supabase = useSupabaseClient();

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        setValidationError({ name: "", message: { type: "", value: "" } });
        const [email, password] = getValues(["email", "password"]);
        console.log("mode: ", email, password);
        await authenticate(email, password);
    };

    const authenticate = async (email: string, password: string) => {
        try {
            setLoading(true);
            let data;
            let error;

            if (mode === authMode.SIGNIN) {
                const response = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                data = response.data;
                error = response.error;
            }
            if (mode === authMode.SINGUP) {
                const { data: user, error: userError } = await supabase
                    .from("owner")
                    .select("email")
                    .eq("email", email);
                console.log("user -->", user);

                if (user?.length) {
                    return toast({
                        title: `User already Exist`,
                        status: "info",
                        variant: "subtle",
                        position: "bottom",
                        isClosable: true,
                    });
                }

                const response = await supabase.auth.signUp({
                    email,
                    password,
                });
                data = response.data;
                error = response.error;
            }

            if (error) {
                console.log({ error });
                setValidationError({
                    name: error.name,
                    message: {
                        type: "validation",
                        value: error.message,
                    },
                });
                throw Error(validationError?.name, {
                    cause: error.cause,
                });
            }
            mode === authMode.SINGUP &&
                toast({
                    title: `verification link send to ${data?.user?.email}`,
                    status: "info",
                    variant: "subtle",
                    position: "bottom",
                    isClosable: true,
                });

            const restaurant = await supabase
                .from("restaurant")
                .select("id")
                .eq("id", data?.user?.id);

            if (!restaurant.data?.length) {
                mode === authMode.SIGNIN
                    ? router.push("/RegisterRestaurant")
                    : router.push("/Signin");
            }

            return mode === authMode.SIGNIN ? router.push("/") : router.push("/Signin");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("brand.light", "brand.dark")}
        >
            <Stack align={"center"} spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
                <Stack align={"center"}>
                    {mode === authMode.SIGNIN ? (
                        <>
                            {" "}
                            <Heading fontSize={"2xl"}>Sign in to your account</Heading>
                            <Text fontSize={"lg"} color={"gray.600"}>
                                and start serving ✌️
                            </Text>
                        </>
                    ) : (
                        <>
                            <Heading fontSize={"2xl"}>Register your account</Heading>
                            <Text fontSize={"lg"} color={"gray.600"}>
                                to enjoy all of our services ✌️
                            </Text>
                        </>
                    )}
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("brand.white", "gray.700")}
                    boxShadow={"lg"}
                    width="350px"
                    p={8}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    borderColor="brand.light"
                                    _focusVisible={{
                                        borderColor: "brand.main",
                                        boxShadow: "0 0 0 1px #EC7905",
                                    }}
                                    {...register("email", {
                                        required: true,
                                        pattern: emailRegex,
                                    })}
                                />
                                {isDirty && errors.email?.type === "pattern" && (
                                    <Badge colorScheme="red">invalid email!</Badge>
                                )}
                                {isDirty && errors.email?.type === "required" && (
                                    <Badge colorScheme="red">this field is required!</Badge>
                                )}
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    borderColor="brand.light"
                                    _focusVisible={{
                                        borderColor: "brand.main",
                                        boxShadow: "0 0 0 1px #EC7905",
                                    }}
                                    type="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 6,
                                    })}
                                />
                                {errors.password && (
                                    <Badge colorScheme="red">{errors.password.message}</Badge>
                                )}
                                {isDirty && errors.password?.type === "minLength" && (
                                    <Badge colorScheme="red">
                                        password must be min 6 characters
                                    </Badge>
                                )}
                                {isDirty && errors.password?.type === "required" && (
                                    <Badge colorScheme="red">this field is required!</Badge>
                                )}
                            </FormControl>
                            <Stack spacing={10}>
                                {mode === authMode.SIGNIN && (
                                    <Stack
                                        direction={{ base: "column", sm: "row" }}
                                        align={"start"}
                                        justify={"space-between"}
                                    >
                                        <Checkbox>Remember me</Checkbox>
                                        <Link href="/" color={"blue.400"}>
                                            Forgot password?
                                        </Link>
                                    </Stack>
                                )}
                                <Button
                                    bg={"brand.main"}
                                    color={"white"}
                                    _hover={{
                                        bg: "brand.light",
                                        color: "brand.dark",
                                    }}
                                    isDisabled={loading}
                                    type="submit"
                                >
                                    {mode === authMode.SIGNIN ? "Sign In" : "Sign Up "}
                                </Button>
                            </Stack>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={"center"}>
                                {mode === authMode.SIGNIN ? (
                                    <>
                                        Don&apos;t have an account?{" "}
                                        <Link href="/Signup" color={"blue.400"}>
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        Already a user?{" "}
                                        <Link href="/Signin" color={"blue.400"}>
                                            Login
                                        </Link>
                                    </>
                                )}
                            </Text>
                            {validationError?.name && (
                                // <Text  align={"center"}>{validationError.message.value}</Text>
                                <Alert
                                    status="error"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                    height="full"
                                >
                                    <AlertIcon boxSize="24px" mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize="sm">
                                        Auth Error
                                    </AlertTitle>
                                    <AlertDescription>
                                        {validationError.message.value}
                                    </AlertDescription>
                                </Alert>
                            )}
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Authfrom;
