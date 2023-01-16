import {
  Box,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import CardContainer from "../components/Card";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { useRestaurant } from "../context/restaurantContext";

const box1 = [1];

const Food = () => {
  const {
    restaurant: { food },
  } = useRestaurant();

  console.log(food);



  if(!food?.length){

    return <Box>loading...</Box>
  }

  return (
    <VStack gap="20px" mx="1rem">
      {/* <Select
        placeholder="Search dish"
        size="md"
        _focusVisible={{
          outline: "none",
        }}
      >
        <option value="option3">Biryani</option>
        <option value="option1">Karahi</option>
        <option value="option2">Korma</option>
      </Select> */}
      <Grid
        h="full"
        // templateRows={`repeat(6, 1fr)`}
        templateColumns="repeat(2, 1fr)"
        justifyItems="center"
        gap={2}
        my="1rem"
        width="full"
      >
        {food.map((item: any) => {
          return (
            <GridItem key={`menu_${item?.id}`} rowSpan={1} colSpan={1}>
              <CardContainer height="230px">
                <CardBody display="flex" flexDir="column" justifyContent="space-between" p="0" w="full">
                  <Stack px="8px" gap="4px" h={"full"} direction="column">
                    <Flex h={"full"} direction={"column"} justifyContent={"space-around"} alignItems={"center"}>
                      <Box>
                        <Image src="/img/menuImg.png" alt="me" width="70" height="70" />
                      </Box>
                      <Box>
                        <Text fontWeight={"bold"}>{item?.name}</Text>
                      </Box>
                      <Box>
                        <Text color={"brand.main"} fontWeight={"bold"}>
                         Rs: {item?.price}
                        </Text>
                      </Box>
                      <Box>
                        <Text fontSize={"12px"}>
                          Some more details
                          <Text as={"span"} color={"rgba(0,0,0,0.3)"} pl={1}>
                            Available
                          </Text>
                        </Text>
                      </Box>
                      <Flex alignItems={"center"}>
                        <IconButton
                          aria-label="Settings"
                          icon={<FiEdit size="24px" />}
                          color="rgba(0,0,0,0.3)"
                          variant="ghost"
                        />
                        <Text color="rgba(0,0,0,0.3)">edit Dish</Text>
                      </Flex>
                    </Flex>
                    
                  </Stack>
                </CardBody>
              </CardContainer>
            </GridItem>
          );
        })}
      </Grid>
    </VStack>
  );
};

export default Food;
