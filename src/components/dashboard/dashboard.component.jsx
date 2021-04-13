import React from 'react';
import { Link } from 'react-router-dom';
 
const Dashboard = ({name,id}) => {
    return (
        <div className='dashboard shadow-lg rounded px-36 py-16 m-3  ' >
           <Link to={`dashboards/${id}`} ><p className=' text-5xl capitalize ' >{name}</p></Link> 
        </div>
    )
}

export default Dashboard;