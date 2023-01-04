import { Box, Flex, HStack } from '@chakra-ui/react'
import {AiOutlineMenu} from 'react-icons/ai'
import {RxAvatar} from 'react-icons/rx'

const Header = () => {
  return (
        <Flex width="full" justifyContent='space-between' margin="20px" border="1px">
            <Box>
                <AiOutlineMenu size="24px" />
            </Box>
            <Box>
            <RxAvatar size="24px"/>
            </Box>
        </Flex>
  )
}

export default Header