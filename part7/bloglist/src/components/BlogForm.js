import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import {
  Flex,
  Heading,
  VStack,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Button, } from '@chakra-ui/react'

import { motion } from 'framer-motion'

import { MdOutlineCancel } from 'react-icons/md'

const BlogForm = ({ blogFormRef }) => {
  const [title, settitle] = useState('')
  const [author, setauthor] = useState('')
  const [url, seturl] = useState('')

  const HandleTitle = ({ target }) => settitle(target.value)
  const HandleAuthor = ({ target }) => setauthor(target.value)
  const HandleURL = ({ target }) => seturl(target.value)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const Add = (event) => {
    event.preventDefault()

    if (!title || !author || !url) {
      return null
    }

    const newBlog = {
      title, author, url
    }

    dispatch(addBlog(newBlog, user))
    blogFormRef.current.toggleVisibility()

    settitle('')
    setauthor('')
    seturl('')
  }

  const closeForm = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
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

        <Heading size="lg">Add a blog</Heading>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={HandleTitle} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Author</FormLabel>
              <Input
                id="author"
                type="text"
                name="author"
                value={author}
                onChange={HandleAuthor} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>URL</FormLabel>
              <Input
                id="url"
                type="text"
                name="url"
                value={url}
                onChange={HandleURL} />
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <motion.div
              whileTap={{ scale: 0.9 }}>
              <Button
                size="lg"
                w="full"
                id='login-button'
                type="submit"
                onClick={Add}
                bgGradient='linear(to-r, teal.500, green.500)'
                _hover={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}
                _active={{
                  bgGradient: 'linear(to-r, red.500, yellow.500)',
                }}>
                Add
              </Button>
            </motion.div>
          </GridItem>
          <GridItem colSpan={2} align="center">
            <IconButton
              aria-label='close blog form'
              fontSize='30px'
              icon={<MdOutlineCancel />}
              onClick={closeForm}
              bgGradient='linear(to-r, teal.500, green.500)'
              _hover={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
              }}
              _active={{
                bgGradient: 'linear(to-r, red.500, yellow.500)',
                transform: 'scale(0.9)'
              }}/>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </Flex>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object.isRequired
}
export default BlogForm
