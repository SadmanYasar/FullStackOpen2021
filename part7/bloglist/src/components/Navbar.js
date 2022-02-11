import {
  Box,
  Flex,
  Link,
  Heading,
  Spacer,
  useColorMode,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import LogOutButton from './LogOutButton'

const Navbar = ({ user }) => {
  const { toggleColorMode } = useColorMode()
  const color = useColorModeValue('red.300', 'gray.700')
  return(
    <Flex
      bg={color}
      align="center"
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      w="full">
      <Box p={3}>
        <Heading size="lg">
          Blogs
        </Heading>
      </Box>
      <Box p={3}>
        <Link size="lg" as={RouteLink} to='/' >Home</Link>
      </Box>
      <Box p={3}>
        <Link as={RouteLink} to='/users' >Users</Link>
      </Box>
      <Box p={3}>
        {user
          ? <>
            <em>{user.username} logged in</em>
            <LogOutButton />
          </>
          : <Link as={RouteLink} to="/login">Login</Link>
        }
      </Box>
      <Spacer />
      <Box p={2}>
        <Button
          onClick={toggleColorMode}
          variant="outline"
          colorScheme="black">
          H
        </Button>
      </Box>
    </Flex>
  )
}

export default Navbar
