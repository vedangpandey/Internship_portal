import React from 'react'
import { useAuthContext } from '../context/AuthContext';
import useLogout from '../hooks/useLogout';

const NavBar = () => {
  const { authUser }=useAuthContext();
  const { loading,logout } =useLogout();
  const handleLogout= async (e)=>{
    e.preventDefault()
    await logout();
  }
  return (
    <div className='w-full flex p-5 justify-between'>
        <div>
            <div className='bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5'>dashboard</div>
        </div>
        <div>

        {!authUser&&
          <div className='flex'>
            <div className='bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5'>signup</div>
            <div className='bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5'>login</div>
          </div>
        }
        {authUser && <div className='cursor-pointer bg-white shadow-md border rounded-xl border-emerald-700 text-emerald-500 p-5' onClick={handleLogout}>logout</div>}
        </div>
    </div>
  )
}

export default NavBar