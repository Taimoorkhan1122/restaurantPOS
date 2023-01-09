import {
    AspectRatio,
    Box,
    BoxProps,
    Button,
    Container,
    Flex,
    forwardRef,
    Heading,
    IconButton,
    Input,
    Stack,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
    return (
        <Box
            bg="white"
            top="0"
            height="100%"
            width="100%"
            position="absolute"
            borderWidth="1px"
            borderStyle="solid"
            rounded="sm"
            borderColor="gray.400"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundImage={`url("https://image.shutterstock.com/image-photo/paella-traditional-classic-spanish-seafood-600w-1662253543.jpg")`}
            {...props}
            ref={ref}
        />
    );
});

const FileUpload: FC<{ onClose: () => void }> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const supabase = useSupabaseClient();
    const user = useUser();

    const toast = useToast();
    const [preview, setPreview] = useState("");
    const onSubmit = async (e: any) => {
        console.log("upload file ", e?.picture.length);

        if (!e?.picture.length) {
            return toast({
                title: `no file selected`,
                status: "error",
                variant: "subtle",
                position: "bottom",
                isClosable: true,
            });
        }

        try {
            const avatarFile = e?.picture[0];
            const { data, error } = await supabase.storage
                .from("test")
                .upload(`${user?.id}/restaurant-log.png`, avatarFile, {
                    upsert: true,
                });

            if (error) {
                 toast({
                    title: error.message,
                    status: "error",
                    variant: "subtle",
                    position: "bottom",
                    isClosable: true,
                });
                throw Error(JSON.parse(JSON.stringify(error.message)))
            };
            toast({
                title: 'image updated successfully',
                status: "success",
                variant: "subtle",
                position: "bottom",
                isClosable: true,
            });
            console.log("submitted data -> ", data);
        } catch (error) {
            console.error("Failed to submit files.", error);
        } finally {
            onClose();
        }
    };

    return (
        <Container my="12">
            <AspectRatio width="full" ratio={1}>
                <Box
                    flexDirection="column"
                    display="flex"
                    as="form"
                    p="1rem"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Box
                        shadow="sm"
                        rounded="md"
                        transition="all 150ms ease-in-out"
                        _hover={{
                            shadow: "md",
                        }}
                        role="group"
                        borderColor="gray.300"
                        borderStyle="dashed"
                        borderWidth="2px"
                        position="relative"
                        height="100%"
                        width="100%"
                    >
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            height="100%"
                            width="100%"
                            display="flex"
                            flexDirection="column"
                        >
                            <Stack
                                height="100%"
                                width="100%"
                                display="flex"
                                alignItems="center"
                                justify="center"
                                spacing="4"
                            >
                                <Box m="2" height="240px" width="95%" position="relative">
                                    <PreviewImage
                                        backgroundImage={
                                            preview.length
                                                ? preview
                                                : `url("https://images.unsplash.com/photo-1563612116625-3012372fccce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2480&q=80")`
                                        }
                                    />
                                </Box>
                                <Stack
                                    px="8"
                                    mt="0 !important"
                                    py="2"
                                    textAlign="center"
                                    spacing="1"
                                >
                                    <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                                        Drop images here
                                    </Heading>
                                    <Text fontWeight="light">or click to upload</Text>
                                </Stack>
                            </Stack>
                        </Box>

                        <Input
                            type="file"
                            height="100%"
                            width="100%"
                            position="absolute"
                            top="0"
                            left="0"
                            opacity="0"
                            aria-hidden="true"
                            accept="image/*"
                            {...register("picture", {
                                onChange(event) {
                                    const input = event.target;
                                    const fReader = new FileReader();
                                    fReader.readAsDataURL(input.files[0]);
                                    fReader.onloadend = function (event) {
                                        console.log("here ->", event?.target?.result);

                                        // img.src = event.target.result;
                                        setPreview(event?.target?.result as string);
                                    };
                                },
                            })}
                        />
                    </Box>
                    <Flex justify="center" align="center">
                        <Button mt="10px" size="sm" type="submit">
                            submit
                        </Button>
                    </Flex>
                </Box>
            </AspectRatio>
        </Container>
    );

    //     return (
    //         <Flex w="full" direction="column" justify="center" align="center">
    //             <Flex my='1rem' w="full" direction="column" justify="center" align="center">
    //                 <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
    //                     Upload Files
    //                 </Heading>

    //                 <Text textAlign="center" fontSize={"base"}>
    //                     Please use the form to your right to upload any file(s) of your choosing.
    //                 </Text>
    //             </Flex>

    //             <div className="form-container">
    //                 {/* Display the files to be uploaded */}
    //                 <div>
    //                     <ul>
    //                         {fileNames.map((name) => (
    //                             <li key={name}>
    //                                 <span>{name}</span>

    //                                 <span onClick={() => removeFile(name)}>
    //                                     <IconButton
    //                                         aria-label="Orders"
    //                                         color="black"
    //                                         bg="none"
    //                                         variant="ghost"
    //                                         icon={<AiOutlineCloseSquare />}
    //                                     />
    //                                 </span>
    //                             </li>
    //                         ))}
    //                     </ul>
    //                 </div>

    //                 {/* Provide a drop zone and an alternative button inside it to upload files. */}
    //                 <Box
    //                     onDragEnter={handleDragDropEvent as any}
    //                     onDragOver={handleDragDropEvent as any}
    //                     onDrop={(e: any) => {
    //                         handleDragDropEvent(e);
    //                         setFiles(e, 'a');
    //                     }}
    //                     display="flex"
    //                     justifyContent="center"
    //                 >
    //                     <Button
    //                         size="xs"
    //                         bg="brand.dark"
    //                         color="brand.white"
    //                         disabled={files.length > 0}
    //                         _hover={{
    //                             color: "brand.main",
    //                             bg: "brand.light",
    //                         }}
    //                         p="4"
    //                         onClick={() => inputRef.current.click()}
    //                     >
    //                         select files to upload
    //                     </Button>

    //                     {/* Hide the crappy looking default HTML input */}
    //                     <input
    //                         ref={inputRef}
    //                         type="file"
    //                         style={{ display: "none" }}
    //                         accept="image/png, image/jpeg"
    //                         onChange={(e: any) => {
    //                             console.log(e);
    //                             // setFiles(e, 'a');
    //                             // inputRef.current.value = null;
    //                         }}
    //                     />
    //                 </Box>
    //             </div>

    //             <Box my="1rem">
    //                 <Button
    //                     size="sm"
    //                     bg="brand.main"
    //                     color="brand.white"
    //                     _hover={{
    //                         color: "brand.main",
    //                         bg: "brand.light",
    //                     }}
    //                     onClick={handleSubmit}
    //                 >
    //                     Submit
    //                 </Button>
    //             </Box>
    //         </Flex>
    //     );
};
export default FileUpload;
