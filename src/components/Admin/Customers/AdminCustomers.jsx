import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { toast } from 'react-toastify'
import classes from "./adminCustomers.module.css"
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { FaRegEdit } from "react-icons/fa";
import apiClient from '../../../utilis/apiClient'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateModal = ({updateModalData, setShowState, showModal}) =>{

  return(
    <>
      <Button variant="btn btn-primary btn-sm" onClick={() => setShowState(true)}>
        <FaRegEdit />
      </Button>
      <Modal show={showModal} onHide={() => setShowState(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Customer Details</Modal.Title>
        </Modal.Header>
        <Form method="post" encType='multipart/form-data'>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowState(false)}>
                Close
              </Button>
              <Button variant="primary" type='submit' onClick={() => setShowState(false)}>
                Save Changes
              </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

function AdminCustomers() {
  //initial table data
  const data = useLoaderData();
  //updated table data
  const changedData = useActionData();
  const [tableData, setTableData] = useState(data);
  //modal state
  const [show, setShow] = useState({});

  const handleShowModal = (id) => {
    setShow((prev) => ({ ...prev, [id]: true }));
  };
  
  const handleCloseModal = (id) => {
    setShow((prev) => ({ ...prev, [id]: false }));
  };

  useEffect(() =>{
    //after admin updating any product, changing data in the state
    if(changedData?._id){
        toast.success("Customer details updated!");
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
        { name: 'Image', selector: row => 
          <LazyLoadImage className={classes.userImage} src={row.image.startsWith("https")?`${row.image}` : `/images/${row.image}.webp`}
            alt="user Profile"
            effect="opacity"
            width="100%"
            height="auto"
          />, sortable: true },
        {                   
          name: 'Actions',
          cell: (row) => (
            <div className="actionBtn">
              <UpdateModal 
                updateModalData={{id: row._id, name: row.name, email: row.email, address: row.address}} 
                showModal={show[row._id] || false} 
                setShowState={(state) => state ? handleShowModal(row._id) : handleCloseModal(row._id)}
              />
            </div>
          ),
        },
    ];

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

      const response = await apiClient.patch(`/api/user/${id}`, dataObject);
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