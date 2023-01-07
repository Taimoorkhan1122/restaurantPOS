import { Box, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { AiFillSetting, AiFillHome, AiOutlinePlus } from "react-icons/ai";
import { MdMenuBook } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa";
import Link from "next/link";
import FormModal from "./FormModal";

const MobileNav = ({ showCreate }: { showCreate: boolean }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex as="nav" mx="20px" color="white" width="full" justifyContent="space-between">
            <Link href="/" passHref>
                <IconButton
                    aria-label="Home"
                    icon={<AiFillHome size="24px" />}
                    color="white"
                    variant="ghost"
                // _hover={{
                //     background: "none"
                // }}
                />
            </Link>
            <Link href="Orders" passHref>
                <IconButton
                    aria-label="Orders"
                    icon={<FaCashRegister size="24px" />}
                    color="white"
                    variant="ghost"
                />
            </Link>

            {/* create button */}
            {showCreate && (
                <Box
                    mt="-26px"
                    display="flex"
                    h="60px"
                    w="60px"
                    justifyContent="center"
                    alignItems="center"
                    bg="brand.white"
                    shadow="boxShadow"
                    borderRadius="100px"
                >
                    <IconButton
                        isRound
                        aria-label="Create"
                        icon={<AiOutlinePlus size="20px" />}
                        color="brand.dark"
                        _hover={{ background: "blue", outline: "none" }}
                        variant="ghost"
                        borderRadius="100px"
                        onClick={onOpen}
                    />
                </Box>
            )}

            <Link href="/Menu" passHref>
                <IconButton
                    aria-label="Menu"
                    icon={<MdMenuBook size="24px" />}
                    color="white"
                    variant="ghost"
                />
            </Link>
            <Link href="/Settings" passHref>
                <IconButton
                    aria-label="Settings"
                    icon={<AiFillSetting size="24px" />}
                    color="white"
                    variant="ghost"
                />
            </Link>
            <FormModal isOpen={isOpen}  onClose={onClose} />
        </Flex>
    );
};

export default MobileNav;
