import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Entities from './components/Entities'
import AddEntity from './components/AddEntity'
import Login from './components/Login'

const App = () => {
  // let navigate = useNavigate()
  // const history = useHistory()
  const [showAddEntity, setShowAddEntity] = useState(false)
  const [entities, setEntities] = useState([])
  const [entityToUpdate, setEntityToUpdate] = useState({})
  const [admin, setAdmin] = useState(false)
  const [name, setName] = useState('')
  const [token, setToken] = useState('')
  const [update, setUpdate] = useState(false)
  const [inputList, setInputList] = useState([{ state: ""}])

  useEffect(() => {
    const getEntities = async () => {
      const entitiesFromServer = await fetchEntities()
      setEntities(entitiesFromServer)
    }

    localStorage.setItem('entities', JSON.stringify(getEntities()))
    getEntities()
  }, [])

  // Fetch Entities
  const fetchEntities = async () => {
    const res = await fetch('http://localhost:5000/entities')
    const data = await res.json()
    return data
  }

  // Add Entity
  const addEntity = async (entity) => {
    const entityStates = entity.inputList.map((input) => input['state'] )
    const newEntity = { name: entity.name, current_state: entityStates[0], states: entityStates }
    const res = await fetch('http://localhost:5000/entities', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newEntity),
    })

    const data = await res.json()

    setEntities([...entities, data])
  }

  // Delete Entity
  const deleteEntity = async (id) => {
    const res = await fetch(`http://localhost:5000/entities/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 204
      ? setEntities(entities.filter((entity) => entity.id !== id))
      : alert('Error Deleting This Task')
  }

  // Update Entity State
  const updateEntityState = async (id) => {
    const res = await fetch(`http://localhost:5000/entities/${id}/next_state`, {
      method: 'POST',
    })
    //We should control the response status to decide if we will change the state or not.
    const data = await res.json()

    setEntities(
      entities.map((entity) =>
        entity.id === id ? { ...entity, current_state: data.current_state } : entity
      )
    )
  }

  const loadFormForUpdate = (entity) => {
    setEntityToUpdate(entity)
    setUpdate(true)
    setShowAddEntity(true)
    setName(entity.name)
    const states = [...entity.states].map((state, i) => {
      return {state: state }
    })
    setInputList(states)
  }
  

  // Update Entity
  const updateEntity = async (e) => {
    e.preventDefault()

    console.log(entityToUpdate)
    entityToUpdate.name = name
    entityToUpdate.states = inputList.map((input) => input['state'] )
    console.log(entityToUpdate)
    const res = await fetch(`http://localhost:5000/entities/${entityToUpdate.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(entityToUpdate),
    })

    const data = await res.json()

    setEntities(
      entities.map((entity) =>
        entity.id === entityToUpdate.id ? { ...entity, name: data.name, states: data.states } : entity
      )
    )
  }

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onListInputChange = (e, index) => {
    const { name, value } = e.target
    const list = [...inputList]
    list[index][name] = value
    setInputList(list)
  }

  const onRemoveClick = index => {
    const list = [...inputList]
    list.splice(index, 1)
    setInputList(list);
  }

  const onAddClick = () => {
    setInputList([...inputList, {state: ""}])
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please add an entity')
      return
    }
    else if (inputList.length < 2) {
      alert('Please add at least two entity states')
      return
    }

    addEntity({ name, inputList })

    setName('')
    setInputList([{state: ""}])
  }

  const onNewClick = () => {
    setShowAddEntity(!showAddEntity)
    setUpdate(false)
    setName('')
    setInputList([{state: ""}])
  }

  const onLoginRequest = async (username, password) => {
    const details = {
      username: username,
      password: password,
    }

    const payload = { user: details }
    const res = await fetch('http://localhost:5000/sessions', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await res.json()

    if (res.status === 201){
      console.log(data)
      setToken(data.token)
      setAdmin(data.admin)
      console.log('******')
      console.log(data.token)
      console.log(data.admin)
      console.log(token)
      console.log(admin)
      console.log('******')
      // navigate("/")
    }else{
      console.log(data)
    }
  }


  return (
    <Router>
      <div className='container'>
        <Header
          token={token}
          onAdd={onNewClick}
          showAdd={showAddEntity}
          admin={admin}
        />
        <Routes>
          <Route exact path='/' element={<Login onLoginRequest={onLoginRequest}/>} />
          <Route
            path='/dashboard'
            element={
              <>
                {showAddEntity && 
                <AddEntity 
                name={name}
                update={update}
                inputList={inputList}
                onAdd={onSubmit} 
                onUpdateEntity={updateEntity}
                onNameChange={onNameChange}
                onAddClick={onAddClick} 
                onRemoveClick={onRemoveClick} 
                onListInputChange={onListInputChange}
                />}
                {entities.length > 0 ? (
                  <Entities
                    admin={admin}
                    entities={entities}
                    onDelete={deleteEntity}
                    onUpdateState={updateEntityState}
                    onLoadFormForUpdate={loadFormForUpdate}
                  />
                ) : (
                  'No Entities To Show'
                )}
              </>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
