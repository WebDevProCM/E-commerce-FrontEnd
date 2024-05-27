import React from 'react'
import UserProfile from '../components/UserProfile/UserProfile'

const Profile = () => {
  return (
    <div style={{padding: "50px 50px"}}>
      <h2 style={{fontWeight: "bold"}}>Profile Setting</h2>
      <UserProfile />
    </div>
  )
}

export default Profile