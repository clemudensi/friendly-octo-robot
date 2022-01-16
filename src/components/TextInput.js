import React from 'react'

const TextInput = ({type, value, onChange, placeholder, label}) => {
  return (
    <div className='form-control'>
      <label>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}

export default TextInput
