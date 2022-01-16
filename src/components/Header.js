import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({ title, onAdd, showAdd, admin }) => {
  const location = useLocation()

  return (
    <header className='header'>
      <h1>{title}</h1>
      {admin ? 
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'New Entity'}
          onClick={() => onAdd()}
        />
        : false
      }
      <Button
        color={'grey'}
        text={'Logout'}
        onClick={() => onAdd()}
      />
      
    </header>
  )
}

Header.defaultProps = {
  title: 'Entity Tracker',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}

// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default Header
