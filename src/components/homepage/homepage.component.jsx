import React, { useEffect, useState } from 'react';
import {firestore, getDashboards } from '../../firebase/firebase.utils';
import Dashboard from '../dashboard/dashboard.component';

const Homepage = () => {
  const [ dashboards, setdashboards ] = useState(null);
  let newArray;
  useEffect(()=>{
    const dashboardsRef = firestore.collection(`dashboards`);
    dashboardsRef.get().then(async snapshot => {
      setdashboards(()=>getDashboards(snapshot)) ;
    })
  },[])
  console.log(dashboards)


    return (
        <div className='homepage py-20 flex flex-col justify-center text-center  ' >
          <p className='text-5xl py-6' > Welcome to Jeero </p>
          <p className=' text-xl py-4' >Please select a dashboard</p>
         { dashboards
         ?
          <div className='dashboard-container flex flex-row items-center justify-center ' >
          {
            dashboards.map(dashboard => <Dashboard key={dashboard.id} id={dashboard.id} name={dashboard.name}  />  )
          }
          </div>
          :
          null
          }
        </div>
    )
}

export default Homepage;