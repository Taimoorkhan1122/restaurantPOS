import { Button, Text, Input, Box, FormControl } from '@chakra-ui/react'
import React from 'react'

const CategoryForm = ({ onClose }) => {
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


      <Box w={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'} >

        <Button _hover={{ bg: 'brand.main' }} bg={'brand.main'} w={'40%'} color={'white'} onClick={onClose} >
          Add Category
        </Button>
      </Box>
    </Box>
  )
}

export default CategoryForm