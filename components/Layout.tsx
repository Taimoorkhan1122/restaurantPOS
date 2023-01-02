import { Box } from "@chakra-ui/layout";
import React, { FC, ReactNode } from "react";
import Header from "./Header";

const Layout: FC<{children: ReactNode}> = ({ children }) => {
  return (
    <Box width="full" height="100vh">
      <Box position="absolute" width="full" height="70px" top="0">
        <Header />
      </Box>
      <Box marginBottom="10px">
        {children}
      </Box>
      <Box position="absolute" left="0" bottom="0">
        footer
      </Box>
    </Box>
  );
};

export default Layout;
