import React from 'react'

const Notification = ({message}) => {
    if (!message) {
      return null
    }
  
    return(
      <div id="notification" notificationtype={message.type}>
        <p>{message.message}</p>
      </div>
    )
  }
export default Notification