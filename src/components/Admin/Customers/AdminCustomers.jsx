import React, { forwardRef, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import classes from "./adminCustomers.module.css"
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import Modal from '../Modal/Modal'
import apiClient from '../../../utilis/apiClient'

const UpdateModal = forwardRef(({updateModalData}, ref) =>{

  return(
      <Modal ref={ref}>
          <div className="modal-content">
          <div className="modal-header">
              <h1 className="modal-title fs-5">Update Customer Details</h1>
              <button type="button" className="btn-close" onClick={() => ref.current.close()}></button>
          </div>
          <Form method="post" encType='multipart/form-data'>
              <div className="modal-body">
                  <input name='id' type="hidden" className="form-control" id="id" defaultValue={updateModalData.id}/>
                  
                  <div className="row mb-3">
                      <label htmlFor="name" className="form-label">Name</label>
                      <div>
                      <input name='name' type="text" className="form-control" id="name" defaultValue={updateModalData.name} required/>
                      </div>
                  </div>

                  <div className="row mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <div>
                      <input name='email' type="email" className="form-control" id="email" defaultValue={updateModalData.email} disabled/>
                      </div>
                  </div>

                  <div className="row mb-3">
                      <label htmlFor="address" className="form-label">Address</label>
                      <div>
                      <input name='address' type="text" className="form-control" id="address" defaultValue={updateModalData.address} required/>
                      </div>
                  </div>

                  <div className="row mb-3">
                      <label htmlFor="password" className="form-label">New Password</label>
                      <div>
                      <input name='password' type="password" className="form-control" id="password" />
                      </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input className="form-control" type="file" id="image" name='image' />
                  </div>

              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => ref.current.close()}>Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
              </div>
          </Form>
          </div>
      </Modal>
  )
})

function AdminCustomers() {
  const data = useLoaderData();
  const changedData = useActionData();
  const [tableData, setTableData] = useState(data);
  const [updateModalData, setUpdateModalData] = useState({});
  const modalRef = useRef();

  useEffect(() =>{
    //after admin updating any product, changing data in the state
    if(changedData?._id){
        toast.success("Customer details updated!");
        modalRef.current.close();
        //only changing the product updated by the admin
        setTableData((prev) => [...prev.filter((data) => data._id !== changedData._id), changedData]);
    }

    if(changedData?.error){
        toast.error(changedData.error);
    }
}, [changedData]);

    const columns = [
        { name: 'CUS-ID', selector: row => row.cusId, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Email', selector:  row => row.name, sortable: true },
        { name: 'Address', selector: row => row.name, sortable: true },
        { name: 'Image', selector: row => <img className={classes.userImage} src={row.image.startsWith("https")?`${row.image}` : `/images/${row.image}.webp`} alt='user Profile'/>, sortable: true },
        {
          name: 'Actions',
          cell: (row) => (
            <div className="actionBtn">
              <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(row._id, row.name, row.email, row.address)}><FaRegEdit /></button>
              {/* <button className="btn btn-primary btn-sm" onClick={() => showDetailHandler(row.ordId)}><BiDetail /></button> */}
            </div>
          ),
        },
    ];

    //update the modal with user selected row
    const handleUpdate = (id, name, email, address) => {
      setUpdateModalData({id, name, email, address});
      modalRef.current.showModal();
  };

  return (
    <div>
        <section className='titleContainer'>
            <h1>CUSTOMERS</h1>
        </section>
        <DataTable
            defaultSortFieldId={1}
            columns={columns}
            data={tableData}
            pagination
        />

        {updateModalData && <UpdateModal updateModalData={updateModalData} ref={modalRef}/>}
    </div>
  )
}

export async function action({request}){
  try{
      const formData = await request.formData();
      const dataObject = Object.fromEntries(formData);
      const id = dataObject.id
      delete dataObject.id;
    
      if(!dataObject.password){
        delete dataObject.password;
      }

      if(!dataObject.image.name){
        delete dataObject.image;
      }

      const response = await apiClient.patch("/api/user/${id}", dataObject);
      const data = response.data;
  
      return data;

  }catch(error){
    if(error?.response?.data){
      return error.response.data
    }
    return error;
  }
}

export async function loader(){
  try{
      const response = await apiClient.get("/api/users")
      const data = response.data;
      if(data?.error){
          if(data.error === "Not a authorized Admin"){
              return redirect("/admin/login");
          }
          throw new Error(data.error);
      }

      return data;
  }catch(error){
    if(error?.response?.data){
      if(error?.response?.data?.error === "Not a authorized Admin"){
        return redirect("/admin/login");
      }
      throw new Error(error.response.data.error);
    }
    throw new Error(error);
  }
}

export default AdminCustomers