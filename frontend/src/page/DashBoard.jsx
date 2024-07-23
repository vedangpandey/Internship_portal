import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';
const DashBoard = () => {
    const { authUser }=useAuthContext(); 
    const [appliedOppurtunities,setAppliedOppurtunities] =  useState([])
    useEffect(()=>{
        if(authUser)
        fetchAppliedOppurtunities()
      },[])
      const fetchAppliedOppurtunities=async()=>{
        try {
          const response =await axios.get(`/api/applied-oppurtunities`)
          console.log("response",response)
        setAppliedOppurtunities(response.data)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className='flex flex-wrap gap-4  w-full'>
      {appliedOppurtunities!==undefined&&
        appliedOppurtunities.length !==0 && appliedOppurtunities.map((profile)=>{
          console.log("profile",profile);
          const {profile_name, stipend, company_name, location_names, duration}= profile;
          console.log(`${profile_name} ${stipend} ${company_name} ${location_names} ${duration}`);
          return (
            <div className='profile-card  bg-white shadow-md'>
            <h2>{profile_name}</h2>
            <p><strong>Company Name:</strong>{company_name}</p>
            <p><strong>Stipend:</strong> {stipend}</p>
            {/* <p><strong>Location:</strong> {location_names[0]?profile.location_names[0]:"Work From Home"}</p> */}
            <p><strong>Duration:</strong> {duration}</p>
            <button className='bg-white border rounded-xl border-emerald-700 text-emerald-500 shadow-lg p-5'>{"Applied"}</button>
        </div>)
        })
      }
      {appliedOppurtunities.length ===0 && <div className='profile-card  bg-white shadow-md p-5'>
        
        You have Not applied for any job.
        </div>}
      </div>
  )
}

export default DashBoard