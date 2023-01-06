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
    Text,
    VStack,
} from "@chakra-ui/react";
import { Line } from 'react-chartjs-2';
import Breadcrump from "../components/Breadcrump";
import CardContainer from "../components/Card";
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
Chart.register(CategoryScale);


const box1 = [
    {
        id: 0,
        title: 'Din in',
        value: 15
    },
    {
        id: 1,
        title: 'Take away',
        value: 15
    },
    {
        id: 2,
        title: 'Delivery ',
        value: 15
    },
]
const box2 = [
    {
        id: 0,
        title: 'Pending',
        value: 6
    },
    {
        id: 1,
        title: 'Late',
        value: 1
    },
    {
        id: 2,
        title: 'Waiting ',
        value: 3
    },
]
const box3 = [
    {
        id: 0,
        title: 'Reserved',
        value: 10
    },
    {
        id: 1,
        title: 'Occupied',
        value: 12
    },
    {
        id: 2,
        title: 'Empty',
        value: 8
    },
]
const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July'],
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    },
    datasets: [
        {
            // label: 'My First dataset',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 20,
            data: [65, 59, 50, 81, 56, 55, 40]
        },

    ]
};
const options = {
    plugins: {
        legend: {
            display: false,
        },
    },
};

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
                    // templateRows={`repeat(6, 1fr)`}
                    templateColumns="repeat(2, 1fr)"
                    justifyItems="center"
                    gap={10}
                    my="1rem"
                >
                    <GridItem rowSpan={1} colSpan={1}>
                        <CardContainer title={"total Order"}>
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
                                    {box1.map((i, ind) => (
                                        <Badge
                                            key={ind}
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
                                            {i.title}: {i.value}
                                        </Badge>
                                    ))}
                                </Stack>
                                {/* <Flex
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
                                </Flex> */}
                            </CardBody>
                        </CardContainer>
                    </GridItem>

                    <GridItem rowSpan={1} colSpan={1}>
                        <CardContainer title="Total Sales" >
                            <Flex h={'full'} w={'full'} justify={'center'} alignItems={'center'} >
                                <Text>Rs. 15,0000</Text>
                            </Flex>
                        </CardContainer>
                    </GridItem>

                    <GridItem rowSpan={1} colSpan={1}>
                        <CardContainer title="Pending Orders" >

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
                                    {box1.map((i, ind) => (
                                        <Badge
                                            key={ind}
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
                                            {i.title}: {i.value}
                                        </Badge>
                                    ))}
                                </Stack>
                            </CardBody>

                        </CardContainer>
                    </GridItem>


                    <GridItem rowSpan={1} colSpan={1}>
                        <CardContainer title="Bookings" >
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
                                    {box2.map((i, ind) => (
                                        <Badge
                                            key={ind}
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
                                            {i.title}:{i.value < 10 && 0}{i.value}
                                        </Badge>
                                    ))}
                                </Stack>
                            </CardBody>

                        </CardContainer>
                    </GridItem>

                    <GridItem rowSpan={1} colSpan={1}>
                        <CardContainer title="Tables" >
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
                                    {box3.map((i, ind) => (
                                        <Badge
                                            key={ind}
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
                                            {i.title}: {i.value < 10 && 0}{i.value}
                                        </Badge>
                                    ))}
                                </Stack>
                            </CardBody>
                        </CardContainer>
                    </GridItem>

                </Grid>
                <Box w={'full'}>
                    <Heading m={0} w={'full'} >Sales</Heading>
                    <Box boxShadow={'md'} w={'full'} >

                        <Line
                            style={{ width: '100%' }}
                            options={options}
                            data={data}
                        />
                    </Box>
                </Box>

            </VStack>
        </Box>
    );
};

export default Dashboard;
