import UserProfile from '../components/UserProfile/UserProfile'
import { redirect } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {

  return (
    <div style={{margin: "0 auto", maxWidth:"1300px", padding:"30px"}}>
      <h2 style={{fontWeight: "bold"}}>Profile Setting</h2>
      <UserProfile />
    </div>
  )
}

export default Profile

export const verifyAuth = async () =>{
  try {
    const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/user/logged`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": true,      
        "Access-Control-Allow-Headers": true, 
        "Access-Control-Allow-Methods": true 
    }, 
    credentials: 'include',
    withCredentials: true });

    const data = response.data;

    if(data.error || !data){
        return redirect("/");
    }

    return null;
  }catch(error) {
    toast.error("Something went wrong!");
  };
}