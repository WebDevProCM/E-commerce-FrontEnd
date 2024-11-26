import React, { useEffect, useState } from 'react'
import classes from './UserProfile.module.css'
import { Form, useActionData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth-slice'
import apiClient from '../../utilis/apiClient'

export const UserProfile = () => {
  //state that change visible of passwowrd change field
  const [changePassword, setChangePassword] = useState(false);

  const updatedProfile = useActionData();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  //toggle visible of change password field
  const clickHandler = () =>{
    setChangePassword((prev) => !prev)
  }

  //after user changing details updating users data in the redux store
  useEffect(() =>{
    if(updatedProfile?._id){
      dispatch(authActions.userUpdate({data: updatedProfile}));
    }
  }, [updatedProfile, dispatch]);

  return (
    <div className={classes.userProfile}>
      <div className={classes.pictureContainer}>
        <img className={classes.profileImg} src={user.image.startsWith("https")?`${user.image}` : `/images/${user.image}.png`} alt="profile-pic" />
      </div>
      <Form method='post' encType='multipart/form-data'>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Profile Image</label>
          <input className="form-control" type="file" id="image" name='image'/>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' defaultValue={user.name || ''} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' defaultValue={user.email || ''} disabled/>
          <div id="emailHelp" className="form-text">You cannot change your email.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" name='address' defaultValue={user.address || ''} required/>
        </div>
        <input type="hidden" name='id' defaultValue={user._id || ''} required/>
        
        {changePassword ? 
        <>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">New Password</label>
            <input type="text" className="form-control" name='password' id="password" required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Confirm New Password</label>
            <input type="text" className="form-control" name='confirmPassword' id="password" required/>
          </div>
        </>
          : ''
        }

        <button type="submit" className={`btn btn-primary ${classes.button}`}>Submit</button>
        <button type="button" className={`btn btn-primary ${classes.button}`} onClick={clickHandler}>Change Password</button>
      </Form>
    </div>
  )
}

export default UserProfile;

export const action = async ({request}) =>{
  try{
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    const id = userData.id;
    if(userData.id){
      delete userData.id;
    }
    if(!userData.image.name){
      delete userData.image;
    }
    if(userData.password !== userData.confirmPassword){
      return toast.error("You have entered different passwords!");
    }
    if(userData.password === userData.confirmPassword){
      delete userData.confirmPassword;
    }

    const response = await apiClient.patch("/api/user/${id}", userData);
    const updatedUser = response.data;
    if(updatedUser.error){
      return toast.error(updatedUser.error);
    }
    toast.success("User updated!");
    return (updatedUser);
  }catch(error){
    return error
  }

}
