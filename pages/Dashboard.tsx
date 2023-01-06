import {
    Badge,
    Box,
    CardBody,
    CardHeader,
    Flex,
    Grid,
    GridItem,
    Heading,
    Select,
    Stack,
    VStack,
} from "@chakra-ui/react";
import Breadcrump from "../components/Breadcrump";
import CardContainer from "../components/Card";

const Dashboard = () => {
    return (
        <Box mx="20px">
            <VStack gap="20px">
                <Select
                    placeholder="Select Period"
                    size="md"
                    _focusVisible={{
                        outline: "none",
                    }}
                >
                    <option value="option3">This Week</option>
                    <option value="option1">This Month</option>
                    <option value="option2">Previous Month</option>
                    <option value="option2">This Year</option>
                </Select>
                <Grid
                    h="full"
                    templateRows={`repeat(6, 1fr)`}
                    templateColumns="repeat(2, 1fr)"
                    justifyItems="center"
                    gap={4}
                    my="1rem"
                >
                    <GridItem rowSpan={1} colSpan={1}>
                        <CardContainer>
                            <CardHeader w="full" position="relative">
                                <Heading
                                    position="absolute"
                                    top="0"
                                    right="15px"
                                    as="h3"
                                    fontSize="base"
                                    fontWeight="bold"
                                    w="43px"
                                    h="36px"
                                    bg="brand.grayLight"
                                    color="brand.gray"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    roundedBottom="10px"
                                >
                                    40
                                </Heading>
                            </CardHeader>
                            <CardBody
                                display="flex"
                                flexDir="column"
                                justifyContent="space-between"
                                p="0"
                                w="full"
                            >
                                <Stack px="8px" gap="4px" direction="column">
                                    {new Array(3).fill(15, 0, 3).map((i, ind) => (
                                        <Badge
                                            key={i + ind}
                                            variant="subtle"
                                            color="brand.main"
                                            bg="brand.light"
                                            rounded="full"
                                            px="6px"
                                            textAlign="center"
                                            fontSize="10px"
                                            fontWeight="normal"
                                            w="fit-content"
                                        >
                                            Dine In: {i}
                                        </Badge>
                                    ))}
                                </Stack>
                                <Flex
                                    mt="0px"
                                    justify="center"
                                    align="center"
                                    bg="brand.main"
                                    h="30px"
                                >
                                    <Heading
                                        as="h2"
                                        color="brand.white"
                                        textAlign="center"
                                        fontSize="12px"
                                        fontWeight="bold"
                                        m="auto"
                                    >
                                        Total Orders
                                    </Heading>
                                </Flex>
                            </CardBody>
                        </CardContainer>
                    </GridItem>
                    
                    <GridItem rowSpan={1} colSpan={1}>
                        <CardContainer>hello</CardContainer>
                    </GridItem>
                    
                    <GridItem rowSpan={1} colSpan={1}>
                        <CardContainer>hello</CardContainer>
                    </GridItem>
                </Grid>
            </VStack>
        </Box>
    );
};

export default Dashboard;
