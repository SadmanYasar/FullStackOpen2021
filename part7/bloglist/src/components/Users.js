import { Flex, Heading, Table, Thead, Tr, Td, Th, VStack, Tbody, UnorderedList, ListItem, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const User = ({ user }) => {
  if (!user) {
    return null
  }
  return(
    <Flex
      w='full'
      p={10}
      direction='column'
      alignItems='center' >
      <VStack p={3}>
        <Heading size='2xl'>{user.username}</Heading>
        <Heading size='xl'>Added blogs</Heading>
      </VStack>
      <UnorderedList spacing={5}>
        {user.blogs.map(b =>
          <ListItem
            color={useColorModeValue('green.500', 'whatsapp.100')}
            key={b.id}>
            <Heading size='xl'>{b.title}</Heading>
          </ListItem>)}
      </UnorderedList>
    </Flex>
  )
}

const Users = ({ allUsers }) => {

  return(
    <Flex
      w='full'
      justifyContent='center'>
      <VStack
        w={{ base: 'full', md: '50%' }}
        p={10}
        spacing={10}>
        <Heading size='2xl'>Users</Heading>
        <Table size='lg' variant='striped' colorScheme='green'>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th isNumeric>Blogs created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {allUsers.map(u =>
              <Tr key={u.id}>
                <Td><Link to={`/users/${u.id}`}>{u.username}</Link></Td>
                <Td isNumeric>{u.blogs.length}</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </VStack>
    </Flex>
  )
}

export default Users
