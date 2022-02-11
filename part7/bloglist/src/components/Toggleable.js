import React, { useState, useImperativeHandle } from 'react'

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
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        {props.cancel && <button onClick={toggleVisibility}>
            props.cancel
        </button>}
      </div>
    </>
  )
})

Toggleable.displayName = 'Toggleable'

export default Toggleable