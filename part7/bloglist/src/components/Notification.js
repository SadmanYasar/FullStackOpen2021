import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return(
    <Alert
      display={notification.message ? '' : 'none'}
      status={notification.isError
        ? 'error'
        : 'success'}
    >
      <AlertIcon display="inline-block" /> {notification.message}
    </Alert>
  )
}
export default Notification