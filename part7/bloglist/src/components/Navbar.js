import { Box, Flex, Link, Heading, Spacer, Text } from '@chakra-ui/react'
import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import LogOutButton from './LogOutButton'

const Navbar = ({ user }) => {
  return(
    <Flex
      bg="#20202380"
      align="center"
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}>
      <Box p={2}>
        <Heading size="lg">
          Blogs
        </Heading>
      </Box>
      <Box>
        <Link as={RouteLink} to='/' >Home</Link>
      </Box>
      <Box>
        <Link as={RouteLink} to='/users' >Users</Link>
      </Box>
      <Box>
        {user
          ? <>
            <em>{user.username} logged in</em>
            <LogOutButton />
          </>
          : <Link as={RouteLink} to="/login">Login</Link>
        }
      </Box>
      <Spacer />
      <Box>
        <Text>Hello</Text>
      </Box>
    </Flex>
  )
}

export default Navbar
