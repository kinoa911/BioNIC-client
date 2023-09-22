import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages'

function App() {

  return (
    <div className='d-flex align-items-center py-4 bg-body-dark'>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='*' element={<div>Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
