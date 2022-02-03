const notificationReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return { message: action.message, isError: action.isError }
  case 'REMOVE_NOTIFICATION':
    return { message: action.message, isError: false }
  default:
    return state
  }
}

let timeOutId
export const setNotification = (message, timeInSeconds, isError) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
      isError
    })

    clearTimeout(timeOutId)

    timeOutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeInSeconds * 1000)
  }

}

export const removeNotification = () => {
  return({
    type: 'REMOVE_NOTIFICATION',
    message: ''
  })
}

export default notificationReducer
