import { Box } from "@chakra-ui/layout";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import Signin from "../pages/Signin";
import Breadcrump from "./Breadcrump";
import Header from "./Header";
import MobileNav from "./MobileNav";
import SidebarWithAvatar from "./SidebarWithAvatar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    const { pathname } = useRouter();
    const paths = ["/", "/signin", "/signup"];
    const showBreadCrumps = paths.includes(pathname);
    const session = useSession();

    return (
        <Box width="full" height="full">
            {/* <Box
                position="absolute"
                display="flex"
                alignItems="center"
                width="full"
                height="50px"
                top="0"
                left="0"
            >
               
            </Box> */}
            <Box
                paddingBottom="20px"
                width="100vw"
                maxWidth="full"
                height="calc(100% - 56px)"
                overflowY="auto"
            >
                <SidebarWithAvatar user={session && session?.user}>
                    {!showBreadCrumps && <Breadcrump location={pathname} />}
                    {children}
                </SidebarWithAvatar>
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
