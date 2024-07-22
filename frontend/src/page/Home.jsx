import React from 'react'
import Internships from '../components/Internships'
import NavBar from '../components/NavBar'

const Home = () => {
  return (
    <div className='flex flex-col flex-wrap'>
      <div className='w-full shadow-xl border mb-3 backdrop-filter backdrop-blur-lg'>
        <NavBar />
      </div>
        <Internships />
    </div>
  )
}

export default Home