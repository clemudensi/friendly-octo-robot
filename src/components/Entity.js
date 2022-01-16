import { MdOutlineDeleteForever,MdOutlineModeEdit,MdOutlineModelTraining } from 'react-icons/md'
import State from './State'

const Entity = ({ entity, onDelete, onUpdateState, onLoadFormForUpdate, admin }) => {
  return (
    <div
      className={`task ${entity.reminder && 'reminder'}`}
      onDoubleClick={admin ? () => onLoadFormForUpdate(entity) : ''}
    >
      <h3>
        {entity.name}{' '}
        {admin ? 
        <MdOutlineDeleteForever
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(entity.id)}
        /> : ''}
        {admin ? 
        <MdOutlineModeEdit
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => onLoadFormForUpdate(entity)}
        /> : ''}
        <MdOutlineModelTraining
          style={{ color: 'green', cursor: 'pointer' }}
          onClick={() => onUpdateState(entity.id)}
        />
      </h3>
      <p>{entity.current_state}</p>
      <p>
        {entity.states.map((state, index) => ( 
          <State key={index} state={state} /> 
        ))}
      </p>
    </div>
  )
}

export default Entity
