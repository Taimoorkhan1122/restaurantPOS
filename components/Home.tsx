import { Box, CardBody, Container, Flex, Grid, GridItem, Heading, Icon } from "@chakra-ui/react";

import { MdDashboardCustomize } from "react-icons/md";
import { FaCashRegister, FaUserFriends } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { MdMenuBook } from "react-icons/md";
import {BsPersonBoundingBox } from 'react-icons/bs'

import CardContainer from "./Card";

const HomeView = () => {
    const homeButtons = [
        { name: "dashboard", icon: MdDashboardCustomize },
        { name: "orders", icon: FaCashRegister },
        { name: "categories", icon: MdFastfood },
        { name: "menu", icon: MdMenuBook },
        { name: "customers", icon: FaUserFriends },
        { name: "staff", icon: BsPersonBoundingBox },
    ];
    return (
        <Box>
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
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
};

export default HomeView;
