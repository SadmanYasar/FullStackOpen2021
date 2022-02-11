import {
  Box,
  Flex,
  Link,
  Text,
  Spacer,
  useColorMode,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { Link as RouteLink } from 'react-router-dom'
import LogOutButton from './LogOutButton'
import { MdOutlineDarkMode } from 'react-icons/md'
import { MdOutlineLightMode } from 'react-icons/md'

const Navbar = ({ user }) => {
  const { toggleColorMode } = useColorMode()
  return(
    <Flex
      align="center"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      w="full">
      <Box p={3}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}>
          <Text
            fontSize="3xl"
            userSelect="none"
            bgGradient='linear(to-r, teal.500, green.500)'
            bgClip='text'
            fontWeight='extrabold'
          >
          Blogs
          </Text>
        </motion.div>
      </Box>
      <Box p={3}>
        <Link size="lg" as={RouteLink} to='/' >Home</Link>
      </Box>
      <Box p={3}>
        <Link as={RouteLink} to='/users' >Users</Link>
      </Box>
      <Box p={2}>
        {user
          ? <LogOutButton />

          : <Link as={RouteLink} to="/login">Login</Link>
        }
      </Box>
      <Spacer />
      <Box p={2}>
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.div
            style={{ display: 'inline-block' }}
            key={useColorModeValue('light', 'dark')}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <IconButton
              onClick={toggleColorMode}
              variant="ghost"
              aria-label='change theme'
              fontSize='30px'
              isRound={true}
              icon={useColorModeValue(<MdOutlineLightMode />, <MdOutlineDarkMode />)}
            />
          </motion.div>
        </AnimatePresence>
      </Box>
    </Flex>
  )
}

export default Navbar
