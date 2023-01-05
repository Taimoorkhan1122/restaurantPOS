import { Box } from "@chakra-ui/layout";
import React, { FC, ReactNode } from "react";
import Header from "./Header";
import MobileNav from "./MobileNav";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box width="full" height="full">
            <Box
                position="absolute"
                display="flex"
                alignItems="center"
                width="full"
                height="70px"
                top="0"
                left="0"
            >
                <Header />
            </Box>
            <Box
            paddingBottom="20px"
                width="100vw"
                maxWidth="450px"
                height="calc(100% - 56px)"
                overflowY="auto"
            >
                {children}
            </Box>
            <Box
                position="absolute"
                left="0"
                bottom="0"
                display="flex"
                alignItems="center"
                borderTopRadius="20px"
                width="full"
                height="56px"
                bg="brand.main"
            >
                <MobileNav />
            </Box>
        </Box>
    );
};

export default Layout;
