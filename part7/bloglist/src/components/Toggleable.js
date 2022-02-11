import React, { useState, useImperativeHandle } from 'react'
import { Box, IconButton } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setvisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setvisible(!visible)
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        toggleVisibility
      }
    }
  )

  return(
    <Box textAlign="center">
      <Box style={hideWhenVisible} p={4}>
        <motion.div
          whileTap={{ scale: 0.9 }}>
          <IconButton
            onClick={toggleVisibility}
            fontSize="30px"
            icon={props.buttonlabel}
            bgGradient='linear(to-r, teal.500, green.500)'
            _hover={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}
            _active={{
              bgGradient: 'linear(to-r, red.500, yellow.500)',
            }}/>
        </motion.div>
      </Box>
      <Box style={showWhenVisible}>
        {props.children}
        {props.cancel && <button onClick={toggleVisibility}>
            props.cancel
        </button>}
      </Box>
    </Box>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable