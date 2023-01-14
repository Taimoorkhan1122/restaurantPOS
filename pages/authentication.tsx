import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Lottie, { useLottie } from "lottie-react";
import FastFood from "../components/onboarding.json";

const Authentication = () => {
  const options = {
    animationData: FastFood,
    loop: true,
    autoplay: true,
  };

  const { View, setSpeed } = useLottie(options);
  setSpeed(1.5);
  return (
    <Flex
      bg="brand.main"
      w="100vw"
      maxW="450px"
      h="full"
      direction="column"
      align="center"
    >
      <Flex
        direction="column"
        justify="flex-end"
        p="1rem"
        bg="white"
        w="full"
        flex={7}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          bg="brand.light"
          h="full"
          rounded="20px"
          p="1rem"
          pb="2rem"
          mb="-40px"
          
        >
          {/* animation container */}
          <Flex
            rounded="20px"
            overflow="hidden"
            bg="brand.light"
            w="full"
            h="full"
            m="0 auto"
            align="flex-end"
          >
            {View}
          </Flex>
          <Flex
            m="2rem 0 0"
            gap="1rem"
            justify="center"
            align="flex-start"
            direction="column"
          >
            <Heading size="lg" fontWeight="black">
              Get on board and <br /> start serving!
            </Heading>
            <Text color="brand.gray" fontSize="md">
              Register your restaurant and discover the best customer services
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        w="full"
        h="full"
        flex={2}
      >
        <HStack spacing={8}>
          <Button
            bg={"none"}
            border="1px solid"
            borderColor="brand.white"
            color={"brand.white"}
            _hover={{
              bg: "brand.light",
              color: "brand.dark",
              borderColor: "brand.white",
            }}
            type="submit"
          >
            <Link href="/Signup">Sign Up</Link>
          </Button>
          <Button
            bg={"brand.white"}
            color={"brand.main"}
            _hover={{
              bg: "brand.light",
              color: "brand.dark",
            }}
            type="submit"
          >
            <Link href="/Signin">Sign In</Link>
          </Button>
        </HStack>
      </Box>
    </Flex>
  );
};

Authentication.authPage = true;

export default Authentication;
