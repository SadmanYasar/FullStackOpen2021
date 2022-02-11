import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return(
    <Alert id='notification' status={notification.isError
      ? 'error'
      : 'success'}
    >
      {notification.message && <AlertIcon />}
      {notification.message}
    </Alert>
  )
}
export default Notification