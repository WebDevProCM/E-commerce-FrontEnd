import UserProfile from '../components/UserProfile/UserProfile'
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../utilis/apiClient';

const Profile = () => {

  return (
    <div style={{margin: "0 auto", maxWidth:"1300px", padding:"30px"}}>
      <h2 style={{fontWeight: "bold"}}>Profile Setting</h2>
      <UserProfile />
    </div>
  )
}

export default Profile

//checking user authenticated status
export const verifyAuth = async () =>{
  try {
    const response = await apiClient.get("/user/logged");

    const data = response.data;

    if(data.error || !data){
        return redirect("/");
    }

    return null;
  }catch(error) {
    toast.error("Something went wrong!");
  };
}