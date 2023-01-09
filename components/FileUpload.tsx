import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import useFileUpload from "react-use-file-upload";

const Upload = () => {
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
        <Box>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                Upload Files
            </Heading>

            <Text fontSize={"base"}>Please use the form to your right to upload any file(s) of your choosing.</Text>

            <div className="form-container">
                {/* Display the files to be uploaded */}
                <div>
                    <ul>
                        {fileNames.map((name) => (
                            <li key={name}>
                                <span>{name}</span>

                                <span onClick={() => removeFile(name)}>
                                    <i className="fa fa-times" />
                                </span>
                            </li>
                        ))}
                    </ul>

                    {files.length > 0 && (
                        <ul>
                            <li>File types found: {fileTypes.join(", ")}</li>
                            <li>Total Size: {totalSize}</li>
                            <li>Total Bytes: {totalSizeInBytes}</li>

                            <li className="clear-all">
                                <button onClick={() => clearAllFiles()}>Clear All</button>
                            </li>
                        </ul>
                    )}
                </div>

                {/* Provide a drop zone and an alternative button inside it to upload files. */}
                <Box
                    onDragEnter={handleDragDropEvent as any}
                    onDragOver={handleDragDropEvent as any}
                    onDrop={(e : any) => {
                        handleDragDropEvent(e);
                        setFiles(e, "a");
                    }}
                >
                    <p>Drag and drop files here</p>

                    <button onClick={() => inputRef.current.click()}>
                        Or select files to upload
                    </button>

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

            <div className="submit">
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </Box>
    );
};
