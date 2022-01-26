const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        case 'REMOVE_NOTIFICATION':
            return action.message
        default:
            return state
    }
}

let timeOutId
export const setNotification = (message, timeInSeconds) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_NOTIFICATION',
            message
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
