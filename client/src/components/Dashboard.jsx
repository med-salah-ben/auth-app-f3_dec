import React from 'react'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const user = useSelector(state=>state.authReducer.user)

  return (
    <div>
        {!user ? (<></>):(
            <>
            <h1>Dashboard</h1>
            <h3>User Name : {user.name}</h3>
            <h3>User Last Name : {user.lastName}</h3>
            <h3>User email : {user.email}</h3>
            </>
        )}
    </div>
  )
}

export default Dashboard