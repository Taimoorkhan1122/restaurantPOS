import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    SkeletonCircle,
    SkeletonText,
    useDisclosure,
    Modal,
    ModalCloseButton,
    ModalBody,
    ModalContent,
    AvatarBadge,
    IconButton,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EditForm from "../components/EditeForm";
import FileUpload from "../components/FileUpload";
import { AiFillEdit } from "react-icons/ai";

export default function Profile() {
    const user = useUser();
    const supabase = useSupabaseClient();
    const router = useRouter();
    const [restaurant, setRestaurant] = useState<null | any[]>(null);
    const [avatarUrl, setAvatar] = useState<string>(
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
    );
    let { isOpen, onOpen, onClose } = useDisclosure();
    let { isOpen: fileOpen, onOpen: onFileOpen, onClose: fileClose } = useDisclosure();

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const res = await supabase.from("restaurant").select().eq("owned_by", user?.id);

                if (!res.error && res.data) {
                    if (!res.error && res.data) {
                        setRestaurant(res.data);
                        const { data } = await supabase.storage
                            .from("test")
                            .createSignedUrl(`${user?.id}/restaurant-log.png`, 60 * 60 * 24 * 7);
                        if (!data) {
                            throw Error("error in fetching avatar");
                        }
                        console.log("public url", data);

                        setRestaurant(res.data);
                        setAvatar(data.signedUrl);
                        return;
                    }
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
    }, [supabase, user?.id]);

    if (restaurant === null || !restaurant.length)
        return (
            <Box padding="6" boxShadow="lg" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
            </Box>
        );

    return (
        <Center py={6}>
            <Box
                maxW={"270px"}
                w={"full"}
                bg="white"
                boxShadow={"2xl"}
                rounded={"md"}
                overflow={"hidden"}
            >
                <Image
                    alt="restaurant-logo"
                    h={"120px"}
                    w={"full"}
                    src={
                        "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                    }
                    objectFit={"cover"}
                />
                <Flex justify={"center"} mt={-12}>
                    <Avatar
                        bg="white"
                        loading="eager"
                        size={"xl"}
                        src={avatarUrl}
                        css={{
                            border: "2px solid white",
                        }}
                    >
                        <IconButton
                            // as={AvatarBadge}
                            position="absolute"
                            bottom={0}
                            right={-1}
                            rounded="full"
                            bg="brand.light"
                            aria-label="Orders"
                            color="brand.main"
                            variant="outlined"
                            minW="24px"
                            h="24px"
                            icon={<AiFillEdit size="14px" />}
                            onClick={onFileOpen}
                        />
                    </Avatar>
                </Flex>

                <Box p={6}>
                    <Stack spacing={0} align={"center"} mb={5}>
                        <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                            {restaurant[0]?.name}
                        </Heading>
                        <Text color={"gray.500"}> {restaurant[0]?.location}</Text>
                    </Stack>

                    <Stack direction={"row"} justify={"center"} spacing={6}>
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>23k</Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Followers
                            </Text>
                        </Stack>
                        <Stack spacing={0} align={"center"}>
                            <Text fontWeight={600}>23k</Text>
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Followers
                            </Text>
                        </Stack>
                    </Stack>

                    <Button
                        w={"full"}
                        mt={8}
                        bg="brand.main"
                        color={"white"}
                        rounded={"md"}
                        onClick={onOpen}
                        _hover={{
                            transform: "translateY(-2px)",
                            boxShadow: "lg",
                            bg: "brand.light",
                            color: "brand.dark",
                        }}
                    >
                        Edit Profile
                    </Button>
                </Box>
            </Box>
            <EditForm title="Edit Profile" isOpen={isOpen} onClose={onClose} />
            <Modal closeOnOverlayClick={false} isCentered isOpen={fileOpen} onClose={fileClose}>
                <ModalContent w="90vw">
                    <ModalCloseButton />
                    <ModalBody display="flex" alignItems="flex-end">
                        <FileUpload onClose={fileClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Center>
    );
}
