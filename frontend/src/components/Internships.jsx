import React, { useEffect, useState } from 'react'
import useData from '../hooks/useData';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Internships = ({data,setData}) => {
    const url='api/opportunities'
    const internships = useData(url)
    const { authUser }=useAuthContext(); 
    const navigate=useNavigate()
    // const internships_meta= internships.internships_meta
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



    const internship_ids=internships.internship_ids
    console.log(internship_ids);
    
    
    
  return (
    <div className='flex flex-wrap gap-4 h-full w-full'>
       {internship_ids&& internship_ids.map((item)=>{
        const profile=internships.internships_meta[item]
        const isApplied =Array.isArray(appliedOppurtunities) && appliedOppurtunities.some(item=>item.id === profile.id)
        return (
                  <div className='profile-card bg-white shadow-md'>
                  <h2>{profile.profile_name}</h2>
                  <p><strong>Company Name:</strong>{profile.company_name}</p>
                  <p><strong>Stipend:</strong> {profile.stipend.salary}</p>
                  <p><strong>Location:</strong> {profile.location_names[0]?profile.location_names[0]:"Work From Home"}</p>
                  <p><strong>Duration:</strong> {profile.duration}</p>
                  <p><strong>Start Date:</strong>{profile.start_date}</p>
                  <button className='bg-white border rounded-xl border-emerald-700 text-emerald-500 shadow-lg p-5' onClick={()=>applyForOppurtunity(profile,authUser,navigate)}>{isApplied?"Applied":"Apply"}</button>
              </div>

        )
       })}
    </div>
  )
}
const applyForOppurtunity= (oppurtunity,authUser,navigate)=>{
  try {
    if(authUser){
     axios.post(`/api/apply`,{oppurtunity}).then((res)=>{
      console.log(res)
     })
     navigate("/")
    }
     else navigate('/login')

  } catch (error) {
    console.log("That apply error");
    console.log(error)
  }
}
export default Internships