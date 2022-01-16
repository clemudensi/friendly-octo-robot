import React from 'react'

const AddState = ({x, handleInputChange, i }) => {
  return (
    <input
    type="text"
    name="state"
    value={x.state}
    onChange={(e) => handleInputChange(e, i)}
  />
  )
}

export default AddState
