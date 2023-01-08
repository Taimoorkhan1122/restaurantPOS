import { Button, Text, Input, Box, FormControl, Select } from '@chakra-ui/react'
import React from 'react'

const MenuForm: React.FC<{onClose: React.MouseEventHandler<HTMLButtonElement>}> = ({ onClose }) => {
  return (
    <Box mx={5} my={5} >

      <Text color={'brand.main'} fontWeight={'bold'} textAlign={'center'}  >Menu Form</Text>
      <FormControl mb={3} >
        <Text as={'label'} >Name</Text>
        <Input borderColor={"#F5F5F5"} placeholder='Enter Name' />
      </FormControl>

      <FormControl mb={3} >
        <Text as={'label'} >Name</Text>
        <Input borderColor={"#F5F5F5"} placeholder='Enter Name' />
      </FormControl>

      <FormControl mb={3} >
        <Text as={'label'} >Description</Text>
        <Input borderColor={"#F5F5F5"} placeholder='Enter Description' />
      </FormControl>

      <FormControl mb={3} >
        <Text as={'label'} >Price</Text>
        <Input borderColor={"#F5F5F5"} placeholder='Enter Price' />
      </FormControl>

      <FormControl mb={3} >
        <Text as={'label'} >Category</Text>
        <Select
          placeholder="Select category"
          size="md"
          borderColor={"#F5F5F5"}
          _focusVisible={{
            outline: "none",
          }}
        >
          <option value="option3">Food</option>
          <option value="option1">Time</option>
          <option value="option2">Dish</option>
        </Select>
      </FormControl>


      <FormControl mb={3} >
        <Text as={'label'} >Variant</Text>
        <Select
          borderColor={"#F5F5F5"}
          placeholder="Add Variant"
          size="md"
          _focusVisible={{
            outline: "none",
          }}
        >
          <option value="option3">Food</option>
          <option value="option1">Time</option>
          <option value="option2">Dish</option>
        </Select>
      </FormControl>

      <Box w={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} >

        <Button _hover={{ bg: 'brand.main' }} bg={'brand.main'} w={'30%'} color={'white'} onClick={onClose} >
          Text
        </Button>
      </Box>
    </Box>
  )
}

export default MenuForm