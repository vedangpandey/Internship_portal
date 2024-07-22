import React from 'react'
import useData from '../hooks/useData';

const Internships = ({data,setData}) => {
    const url='api/opportunities'
    const internships = useData(url)
    // const internships_meta= internships.internships_meta
    const internship_ids=internships.internship_ids
    console.log(internship_ids);
  return (
    <div>
      holla
       {internship_ids&& internship_ids.map((item)=>{
        const profile=internships.internships_meta[item]
        return (
                  <div>
                  <h2>Profile Name</h2>
                  <p><strong>Company Name:</strong>{profile.company_name}</p>
                  <p><strong>Stipend:</strong> {profile.stipend.salary}</p>
                  <p><strong>Location:</strong> New York, USA</p>
                  <p><strong>Duration:</strong> 6 months</p>
                  <p><strong>Start Date:</strong> 1st August 2024</p>
              </div>

        )
       })}
    </div>
  )
}

export default Internships