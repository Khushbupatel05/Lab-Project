import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import { ToastContainer } from 'react-toastify'
import  Header  from './components/Header'
import LabList from './pages/Labs/LabList'
import AddNewLab from './pages/Labs/AddNewLab'
import PcList from './pages/Pcs/PcList'
import AddNewPc from './pages/Pcs/AddNewPc'
import StudentList from './pages/Student/StudentList'
import AddNewStudents from './pages/Student/AddNewStudents'


const App = () => {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<ProtectedRoutes Component={Dashboard} />} />
            <Route path='/login' element={<Login />} />

            <Route path='/labs' element={<LabList />} />
            <Route path="/add-lab" element={<ProtectedRoutes Component={AddNewLab} />} />
            <Route path="/edit-lab/:labId" element={<ProtectedRoutes Component={AddNewLab} />} />

            <Route path="/pcs" element={<ProtectedRoutes Component={PcList} />} />
            <Route path="/add-pc" element={<ProtectedRoutes Component={AddNewPc} />} />
            <Route path="/edit-pc/:pcId" element={<ProtectedRoutes Component={AddNewPc} />} />

            <Route path="/students" element={<ProtectedRoutes Component={StudentList} />} />
            <Route path="/add-student" element={<ProtectedRoutes Component={AddNewStudents} s/>} />
            <Route path="/edit-student/:studentId" element={<ProtectedRoutes Component={AddNewStudents} />} />

          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App