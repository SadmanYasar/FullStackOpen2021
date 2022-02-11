import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { history } from '../index'
import { login } from '../reducers/userReducer'
import {
  Flex,
  Heading,
  VStack,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  IconButton,
  Link
} from '@chakra-ui/react'

import { GoMarkGithub } from 'react-icons/go'

const LoginForm = ( ) => {
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')

  const HandleUserName = ({ target }) => setusername(target.value)

  const HandlePassword = ({ target }) => setpassword(target.value)

  const dispatch = useDispatch()

  const loginUser = (event) => {
    event.preventDefault()

    if (!username || !password) {
      return null
    }

    dispatch(login({
      username, password
    })).then(() => history.push('/'))

    setusername('')
    setpassword('')

  }

  const colSpan = 2

  return(
    <Flex
      h="100vh"
      py={[5, 10, 20]}
      direction={{ base: 'column', md: 'row' }}
      justifyContent="center"
    >
      <VStack
        w={{ base: 'full', md: '50%' }}
        h="full"
        p={10}
        spacing={10}>

        <Heading size="lg">Login to continue</Heading>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                type="text"
                name="Username"
                value={username}
                onChange={HandleUserName} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                name="Password"
                value={password}
                onChange={HandlePassword} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button
              size="lg"
              w="full"
              id='login-button'
              type="submit"
              onClick={loginUser}>
                Login
            </Button>
          </GridItem>
        </SimpleGrid>
        <Link
          href='https://github.com/SadmanYasar/FullStackOpen2021/tree/main/part7/bloglist'
          isExternal>
          <IconButton
            aria-label='github link to source code'
            fontSize='30px'
            isRound={true}
            icon={<GoMarkGithub />}
          />
        </Link>
      </VStack>
    </Flex>
  )
}

export default LoginForm