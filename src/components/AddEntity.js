import { useState } from 'react'
import AddState from './AddState'

const AddEntity = ({ name, update, inputList, onNameChange, onAdd, onAddClick, onRemoveClick, onListInputChange, onUpdateEntity }) => {
  return (
    <form className='add-form' onSubmit={update ? onUpdateEntity : onAdd}>
      <div className='form-control'>
        <label>Entity</label>
        <input
          type='text'
          placeholder='Add an entity'
          value={name}
          onChange={(e) => onNameChange(e)}
        />
      </div>
      <h5>Entity States</h5>
      {
        inputList.map((x,i) =>{
          return(
            <div className="form-control">
               <input
                  type="text"
                  name="state"
                  value={x.state}
                  onChange={(e) => onListInputChange(e, i)}
                />
                {/* <AddState key={i} value={x.state} i={i} handleInputChange={ handleInputChange }/> */}
              
              <div className='btn-box'>
                {inputList.length !== 1 && <button className='btn' onClick={() => onRemoveClick(i)}>Remove</button>}
                {inputList.length - 1 === i && <button className='btn' onClick={() => onAddClick(i)}>Add</button>}
              </div>
            </div>
          );
      })}

      <input type='submit' value={update ? 'Update Entity' : 'Save Entity'} className='btn btn-block' />
    </form>
  )
}

export default AddEntity
