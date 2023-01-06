import { Card } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

const CardContainer: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Card
            shadow="cardShadow"
            align="center"
            w="160px"
            h="130px"
            p="0"
            overflow="hidden"
            borderRadius={20}
            bg="brand.white"
            _hover={{
                boxShadow: "var(--chakra-shadows-cardInnerShadow)"
            }}
        >
            {children}
        </Card>
    );
};

export default CardContainer;
