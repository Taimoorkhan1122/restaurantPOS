import { Box } from "@chakra-ui/layout";
import React, { FC, ReactNode } from "react";
import Header from "./Header";
import MobileNav from "./MobileNav";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box width="full" height="100vh">
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
            <Box marginBottom="10px">{children}</Box>
            <Box
                position="absolute"
                display="flex"
                alignItems="center"
                left="0"
                bottom="0"
                width="full"
                borderTopRadius="20px"
                height="56px"
                bg="brand.main"
            >
                <MobileNav />
            </Box>
        </Box>
    );
};

export default Layout;
