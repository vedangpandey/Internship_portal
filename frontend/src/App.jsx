
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Login from './page/login/Login'
import SignUp from './page/signup/SignUp'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'

function App() {
  const { authUser }=useAuthContext();
  return (
    <div>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} ></Route>
          </Routes>
          <div className='p-4 h-screen flex items-center justify-center'>
            <Routes>
            <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />}></Route>
            <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />}></Route>
            
            </Routes>
          </div>
          <Toaster />
      <div>

      </div>
    </div>
  )
}

export default App
