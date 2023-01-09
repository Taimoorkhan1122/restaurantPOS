import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Badge,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Multistep from "./RestaurantForm";

export default function EditForm({
    isOpen = false,
    onClose,
    title,
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
}) {
    const OverlayOne = () => (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(0deg)" />
    );

    const [overlay, setOverlay] = useState(<OverlayOne />);

    return (
        <>
            <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent w="95vw" >
                    <ModalCloseButton />
                    <ModalBody display="flex" alignItems="flex-end" >
                        <Multistep closeModal={onclose}/>
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
}

const Form = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isDirty, isSubmitting },
    } = useForm({
        mode: "onBlur",
    });

    const [validationError, setValidationError] = useState<{
        name: string;
        message: { type: string; value: string };
    }>();

    const onSubmit: SubmitHandler<FieldValues> = async () => {
        setValidationError({ name: "", message: { type: "", value: "" } });
        const [email, password] = getValues(["email", "password"]);
        console.log("mode: ", email, password);
    };

    <Flex minH={"100vh"} align={"center"} justify={"center"} bg="brand.light">
        <Stack align={"center"} spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Box rounded={"lg"} bg="brand.white" boxShadow={"lg"} width="350px" p={8}>
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
                                {...register("email")}
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
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={"brand.main"}
                                color={"white"}
                                _hover={{
                                    bg: "brand.light",
                                    color: "brand.dark",
                                }}
                                isDisabled={isSubmitting}
                                type="submit"
                            >
                                Update
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack pt={6}>
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
                                <AlertDescription>{validationError.message.value}</AlertDescription>
                            </Alert>
                        )}
                    </Stack>
                </form>
            </Box>
        </Stack>
    </Flex>;
};
