import {
  Box,
  Flex,
  Link,
  Heading,
  Spacer,
  useColorMode,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react'
import React /* { useState } */ from 'react'
import { Link as RouteLink } from 'react-router-dom'
import LogOutButton from './LogOutButton'
import { MdOutlineDarkMode } from 'react-icons/md'
import { MdOutlineLightMode } from 'react-icons/md'

const Navbar = ({ user }) => {
  const { colorMode, toggleColorMode } = useColorMode()
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
          ? <LogOutButton />

          : <Link as={RouteLink} to="/login">Login</Link>
        }
      </Box>
      <Spacer />
      <Box p={2}>
        <IconButton
          onClick={toggleColorMode}
          variant="ghost"
          aria-label='change theme'
          fontSize='30px'
          isRound={true}
          icon={colorMode === 'dark'
            ? <MdOutlineLightMode />
            : <MdOutlineDarkMode />}/>
      </Box>
    </Flex>
  )
}

export default Navbar
