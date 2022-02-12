import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const byLikes = (firstItem, secondItem) => {
    return secondItem.likes - firstItem.likes
  }
  return(
    <Flex
      width='full'
      justifyContent='center'
      direction='column'>
      {blogs
        .sort(byLikes)
        .map(blog =>
          <Box
            key={blog.id}
            p={5}
            m={3}
            css={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px',
            }}>
            <Link to={`/blogs/${blog.id}`} >
              <Text fontSize='4xl'>{blog.title}</Text>
              <Text fontSize='2xl' >by {blog.author}</Text>
            </Link>
          </Box>
        )}
    </Flex>
  )
}

export default BlogList
