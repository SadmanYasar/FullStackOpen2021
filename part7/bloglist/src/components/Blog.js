import {
  Flex,
  Heading,
  Text,
  ListItem,
  VStack,
  Link,
  IconButton,
  Button,
  FormControl,
  Input,
  UnorderedList,
  useColorModeValue
} from '@chakra-ui/react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { FcLike } from 'react-icons/fc'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { like, deleteBlog, commentBlog } from '../reducers/blogReducer'
import { motion } from 'framer-motion'

const Blog = ({ blog, own }) => {
  const [comment, setcomment] = useState('')

  if (!blog) {
    return null
  }

  const history = useHistory()

  const dispatch = useDispatch()

  const updateLikes = () => {
    dispatch(like(blog))
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog))
    history.push('/')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!comment) {
      return null
    }
    dispatch(commentBlog(blog, comment))
    setcomment('')
  }

  const handleComment = ({ target }) => setcomment(target.value)

  return(
    <Flex
      width='full'
      p={10}
      justifyContent='center'
      alignItems='center'
      direction='column'>
      <VStack w='full' spacing={10}>
        <Heading size='xl'>{blog.title} - {blog.author} </Heading>
        <Link href={`${blog.url}`} isExternal>
          <FaExternalLinkAlt size='40px' />
        </Link>
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 0.9 }}>
          <Text fontSize='3xl'>
            <IconButton
              aria-label='close blog form'
              fontSize='40px'
              variant='ghost'
              icon={<FcLike />}
              onClick={updateLikes} />  {blog.likes}
          </Text>
        </motion.div>

        {own && <Button
          w={{ base: 'full', md: '50%' }}
          onClick={removeBlog}
          size="lg"
          bgGradient='linear(to-r, teal.500, green.500)'
          _hover={{
            bgGradient: 'linear(to-r, red.500, yellow.500)',
          }}
          _active={{
            bgGradient: 'linear(to-r, red.500, yellow.500)',
          }}>
           Delete
        </Button>}
        <Heading size='xl'>Comments</Heading>
        <FormControl w={{ base: 'full', md: '50%' }}>
          <Input type='text' value={comment} onChange={handleComment} />
          <Button
            bgGradient='linear(to-r, teal.500, green.500)'
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
            _active={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
            onClick={handleSubmit}>
              Add comment
          </Button>
        </FormControl>
        <UnorderedList spacing={5}>
          {blog.comments.map((c, i) =>
            <ListItem
              color={useColorModeValue('green.500', 'whatsapp.100')}
              key={i}
            >
              <Heading size='xl'>{c}</Heading>
            </ListItem>)}
        </UnorderedList>
      </VStack>
    </Flex>
  )}

export default Blog