import { Box, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import useFileUpload from "react-use-file-upload";
import { AiOutlineCloseSquare } from "react-icons/ai";

const FileUpload = () => {
    const {
        files,
        fileNames,
        fileTypes,
        totalSize,
        totalSizeInBytes,
        handleDragDropEvent,
        clearAllFiles,
        createFormData,
        setFiles,
        removeFile,
    } = useFileUpload();

    const inputRef = useRef<any>();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const formData = createFormData();
        console.log("upload file ", formData);

        try {
        } catch (error) {
            console.error("Failed to submit files.");
        }
    };

    return (
        <Flex w='full' direction="column" justify="center" align="center">
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                Upload Files
            </Heading>

            <Text fontSize={"base"}>
                Please use the form to your right to upload any file(s) of your choosing.
            </Text>

            <div className="form-container">
                {/* Display the files to be uploaded */}
                <div>
                    <ul>
                        {fileNames.map((name) => (
                            <li key={name}>
                                <span>{name}</span>

                                <span onClick={() => removeFile(name)}>
                                    <IconButton
                                        aria-label="Orders"
                                        color="black"
                                        bg="none"
                                        variant="ghost"
                                        icon={<AiOutlineCloseSquare />}
                                    />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Provide a drop zone and an alternative button inside it to upload files. */}
                <Box
                    onDragEnter={handleDragDropEvent as any}
                    onDragOver={handleDragDropEvent as any}
                    onDrop={(e: any) => {
                        handleDragDropEvent(e);
                        setFiles(e);
                    }}
                    display="flex"
                    justifyContent='center'
                >
                    <Button
                        size="xs"
                        bg="brand.dark"
                        color="brand.white"
                        disabled={files.length > 0}
                        _hover={{
                            color: "brand.main",
                            bg: "brand.light",
                        }}
                        p="0"
                        onClick={() => inputRef.current.click()}
                    >
                        select files to upload
                    </Button>

                    {/* Hide the crappy looking default HTML input */}
                    <input
                        ref={inputRef}
                        type="file"
                        multiple
                        style={{ display: "none" }}
                        onChange={(e: any) => {
                            setFiles(e);
                            inputRef.current.value = null;
                        }}
                    />
                </Box>
            </div>

            <Box my="1rem">
                <Button
                    size="sm"
                    bg="brand.main"
                    color="brand.white"
                    _hover={{
                        color: "brand.main",
                        bg: "brand.light",
                    }}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </Box>
        </Flex>
    );
};

export default FileUpload;
