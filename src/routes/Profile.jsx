import React from 'react'
import UserProfile from '../components/UserProfile/UserProfile'

const Profile = () => {
  return (
    <div style={{margin: "0 auto", maxWidth:"1300px", padding:"30px"}}>
      <h2 style={{fontWeight: "bold"}}>Profile Setting</h2>
      <UserProfile />
    </div>
  )
}

export default Profile