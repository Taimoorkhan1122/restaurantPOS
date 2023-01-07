import {
    Box,
    Select,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";

const data = [
    { id: '1215', name: 'Segun Adebayo', desc: 'Segun Adebayo Mark Chandler Lazar ' },
    { id: '0151', name: 'Mark Chandler', desc: 'Segun Adebayo Mark Chandler Lazar ' },
    { id: '4844', name: 'Lazar Nikolov', desc: 'Segun Adebayo Mark Chandler Lazar ' },
    { id: '4848', name: 'Javier Alaves', desc: 'Segun Adebayo Mark Chandler Lazar ' },
    { id: '4844', name: 'Lazar Nikolov', desc: 'Segun Adebayo Mark Chandler Lazar ' },
    { id: '4844', name: 'Javier Alaves', desc: 'Segun Adebayo Mark Chandler Lazar ' },
]


const Categories = () => {
    return (
        <Box mx="20px">
            <VStack gap="20px">
                <Select
                    placeholder="Search category"
                    size="md"
                    _focusVisible={{
                        outline: "none",
                    }}
                >
                    <option value="option3">Food</option>
                    <option value="option1">Time</option>
                    <option value="option2">Dish</option>
                </Select>

            </VStack>

            <Box mx={'10px'} borderRadius={5} boxShadow={'md'} my={10}  >


                <TableContainer >
                    <Table  >
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th >Desciption</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data?.map((item, index) => {
                                return (

                                    <Tr bg={index % 2 ? '' : '#FEF0E1'} key={index} >
                                        <Td>{item.id}</Td>
                                        <Td>{item?.name}</Td>
                                        <Td >{item?.desc}</Td>
                                    </Tr>
                                )
                            })}

                        </Tbody>
                    </Table>
                </TableContainer>

            </Box>




        </Box >
    );
};

export default Categories;
