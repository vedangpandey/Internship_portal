import React from 'react'
import useData from '../hooks/useData';

const Internshps = ({data,setData}) => {
    const url='api/opportunities'
    const internships_id = useData(url).internship_ids
    console.log(internships_id);
  return (
    <div>
       Holla
    </div>
  )
}

export default Internshps