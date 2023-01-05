import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { AiFillSetting, AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { MdMenuBook } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa";

const MobileNav = () => (
    <Flex
        as="nav"
        mx="20px"
        color="white"
        width="full"
        justifyContent="space-between"
    >
        <Box>
            <IconButton aria-label="Home" icon={<AiFillHome size="24px" />} color="white" variant="ghost" />
        </Box>
        <Box>
            <IconButton
                aria-label="Orders"
                icon={<FaCashRegister  size="24px" />}
                color="white"
                variant="ghost"
            />
        </Box>

        {/* create button */}
        <Box mt="-40px" bg="brand.white" shadow="boxShadow" borderRadius="100px" padding="20px">
            <IconButton
                aria-label="Create"
                icon={<AiOutlinePlus size="20px" />}
                color="brand.dark"
                _hover={{ background: "blue", outline: "none" }}
                variant="ghost"
                borderRadius="100px"
            />
        </Box>

        <Box>
            <IconButton aria-label="Menu" icon={<MdMenuBook size="24px" />} color="white" variant="ghost" />
        </Box>
        <Box>
            <IconButton
                aria-label="Settings"
                icon={<AiFillSetting size="24px" />}
                color="white"
                variant="ghost"
            />
        </Box>
    </Flex>
);

export default MobileNav;
