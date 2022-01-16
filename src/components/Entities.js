import Entity from './Entity'

const Entities = ({ entities, onDelete, onLoadFormForUpdate, onUpdateState, admin }) => {
  return (
    <>
      {entities.map((entity, index) => (
        <Entity 
          key={index} 
          entity={entity} 
          onDelete={onDelete} 
          onUpdateState={onUpdateState} 
          onLoadFormForUpdate={onLoadFormForUpdate} 
          admin={admin} />
      ))}
    </>
  )
}

export default Entities
