import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'
import { Header } from './components/Header'
import Labs from './pages/Labs'

const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<ProtectedRoutes Component={Dashboard}/>} />
            {/* <Route path='/' element={<Dashboard />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/labs' element={<Labs />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App