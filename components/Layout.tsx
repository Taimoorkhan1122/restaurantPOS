import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import Breadcrump from "./Breadcrump";
import Header from "./Header";
import MobileNav from "./MobileNav";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    const { pathname } = useRouter();
    return (
        <Box width="full" height="full">
            <Box
                position="absolute"
                display="flex"
                alignItems="center"
                width="full"
                height="50px"
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
                {pathname !== "/" && (<Breadcrump location={pathname} />)}
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
                <MobileNav showCreate={pathname !== "/Dashboard"} />
            </Box>
        </Box>
    );
};

export default Layout;
