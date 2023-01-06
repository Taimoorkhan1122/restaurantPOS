import { Card, Flex, Heading } from "@chakra-ui/react";
import { FC, ReactNode } from "react";



const CardContainer: FC<{ children: ReactNode , title: string }> = ({ children, title }) => {
    return (
        <Card
            shadow="cardShadow"
            align="center"
            w="160px"
            h="130px"
            p="0"
            display={'flex'}
            justifyContent={'space-between'}
            overflow="hidden"
            borderRadius={20}
            bg="brand.white"
            _hover={{
                boxShadow: "var(--chakra-shadows-cardInnerShadow)"
            }}
        >
                {children}

            <Flex
                mt="0px"
                justify="flex-end"
                align="center"
                bg="brand.main"
                h="30px"
                w='full'
            >
                <Heading
                    as="h2"
                    color="brand.white"
                    textAlign="center"
                    fontSize="12px"
                    fontWeight="bold"
                    m="auto"
                >
                    {title}
                </Heading>
            </Flex>
        </Card>
    );
};

export default CardContainer;
