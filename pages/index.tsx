import {
    Heading,
    Box,
    Container,
    CardBody,
    Icon,
    Flex,
    Grid,
    GridItem,
    LinkOverlay,
} from "@chakra-ui/react";

import CardContainer from "../components/Card";
import { MdDashboardCustomize } from "react-icons/md";

import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

import { FaCashRegister, FaUserFriends } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import { BsPersonBoundingBox } from "react-icons/bs";
import Link from "next/link";

const Home = () => {
    const session = useSession();
    const supabase = useSupabaseClient();
    // supabase.auth.signOut()

    const homeButtons = [
        { name: "dashboard", route: "/Dashboard", icon: MdDashboardCustomize },
        { name: "orders", route: "/Orders", icon: FaCashRegister },
        { name: "menu", route: "/Menu", icon: MdFastfood },
        { name: "food", route: "/Food", icon: MdMenuBook },
        { name: "customers", route: "/Customeers", icon: FaUserFriends },
        { name: "staff", route: "/Staff", icon: BsPersonBoundingBox },
    ];
    return (
        <>
            {/* header section */}
            <Container
                shadow="innerShadow"
                display="flex"
                width="full"
                height="270px"
                bg="white"
            ></Container>

            {/* menu section */}

            <Grid
                h="full"
                templateRows={`repeat(${Math.ceil(homeButtons.length / 2)}, 1fr)`}
                templateColumns="repeat(2, 1fr)"
                justifyItems="center"
                gap={4}
                my="1rem"
            >
                {homeButtons.map((button) => (
                    <GridItem key={`button_${button.name}`} rowSpan={1} colSpan={1}>
                        <Link href={button.route} passHref>
                            <CardContainer>
                                <CardBody
                                    display="flex"
                                    flexDir="column"
                                    justifyContent="center"
                                    alignItems="center"
                                    gridGap="16px"
                                >
                                    <Icon boxSize="24px" color="brand.main" as={button.icon} />
                                    <Box>
                                        <Heading size="xs" textTransform="uppercase">
                                            {button.name}
                                        </Heading>
                                    </Box>
                                </CardBody>
                            </CardContainer>
                        </Link>
                    </GridItem>
                ))}
            </Grid>
        </>
    );
};

export default Home;
