import React, { forwardRef, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from '../Modal/Modal'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import axios from 'axios'
import "./adminReviews.css"

const UpdateModal = forwardRef(({updateModalData}, ref) =>{

    return(
        <Modal ref={ref}>
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Update Review Details</h1>
                <button type="button" className="btn-close" onClick={() => ref.current.close()}></button>
            </div>
            <Form method="post" encType='multipart/form-data'>
                <div className="modal-body">
                    <input name='id' type="hidden" className="form-control" id="id" defaultValue={updateModalData.id}/>
                    
                    <div className="row mb-3">
                        <label htmlFor="name" className="form-label">Stars</label>
                        <div>
                        <input name='stars' type="number" max={5} min={1} className="form-control" id="stars" defaultValue={updateModalData.stars} required/>
                        </div>
                    </div>
  
                    <div className="row mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <div>
                        <textarea name='description' type="text" className="form-control" id="description" defaultValue={updateModalData.description} required/>
                        </div>
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

const DeleteModal = forwardRef(({deleteModalData ,deleteHandler}, ref) =>{

    return(
        <Modal ref={ref}>
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Are sure you want to remove this?</h1>
                <button type="button" className="btn-close" onClick={() => ref.current.close()}></button>
            </div>
            <div className="modal-body">
                <RiErrorWarningLine size={90} className='sign'/>
            </div>
            <form onSubmit={(event) => {deleteHandler(event, deleteModalData)}}>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => ref.current.close()}>No</button>
                    <button type="submit" className="btn btn-primary">Yes</button>
                </div>
            </form>
            </div>
        </Modal>
    )
})

function AdminReviews() {
    const data = useLoaderData();
    const changedData = useActionData();
    const [tableData, setTableData] = useState(data);
    const [updateModalData, setUpdateModalData] = useState({});
    const [deleteeModalData, setDeleteModalData] = useState([]);
    const modalRef = useRef();
    const deleteModalRef = useRef();
  
    useEffect(() =>{
      if(changedData?._id){
          toast.success("Review details updated!");
          modalRef.current.close();
          setTableData((prev) => {return [...prev.filter((data) => data._id !== changedData._id), changedData] })
      }
  
      if(changedData?.error){
          toast.error(changedData.error);
      }
    }, [changedData]);
  
    const columns = [
        { name: 'PRODUCT', selector: row => row.product.name, sortable: true },
        { name: 'USER', selector: row => row.user.name, sortable: true },
        { name: 'STARS', selector:  row => row.stars, sortable: true },
        { name: 'DESCRIPTION', selector: row => row.description, sortable: true },
        {
        name: 'ACTIONS',
        cell: (row) => (
            <div className="actionBtn">
            <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(row._id, row.stars, row.description)}><FaRegEdit /></button>
            <button className="btn btn-danger btn-sm" onClick={() => initiateDeleteHandler(row._id)}><MdDelete /></button>
            </div>
        ),
        },
    ];
  
    const handleUpdate = (id, stars, description) => {
        setUpdateModalData({id, stars, description});
        modalRef.current.showModal();
    };

    const deleteHandler = async (event, id) =>{
        event.preventDefault();

        try{
            const response = await axios.delete(`${process.env.REACT_APP_DOMAIN}/api/review/${id}`, {
                headers: {"Content-Type": "apllication/json"},
                withCredentials: true
            })
            const data = response.data;
            if(data.error){
                if(data.error === "Not a authorized Admin" || data.error === "You are not a authorized user!"){
                    return redirect("/admin");
                }

                return toast.error(data.error);
            }

            toast.success("Review removed!");
            setTableData((prev) => prev.filter((data) => data._id !== id));
            deleteModalRef.current.close();

        }catch(error){
            return {error: "something went wrong"} 
        }
    }

    const initiateDeleteHandler = (id) =>{
        setDeleteModalData(id);
        deleteModalRef.current.showModal();
    }

  return (
    <div>
        <section className='titleContainer'>
            <h1>REVIEWS</h1>
        </section>
        <DataTable
            defaultSortFieldId={1}
            columns={columns}
            data={tableData}
            pagination
        />

        {updateModalData && <UpdateModal updateModalData={updateModalData} ref={modalRef}/>}
        {deleteeModalData && <DeleteModal deleteModalData={deleteeModalData} deleteHandler={deleteHandler} ref={deleteModalRef}/>}
    </div>
  )
}

export async function action({request}){
    try{
        const formData = await request.formData();
        const dataObject = Object.fromEntries(formData);
        const id = dataObject.id
        delete dataObject.id;

  
        const response = await axios.patch(`${process.env.REACT_APP_DOMAIN}/api/review/${id}`, dataObject,{
            withCredentials: true
        })
        const data = response.data;
    
        return data;
  
    }catch(error){
        console.log(error);
        return {error: "something went wrong"}
    }
  }
  
export async function loader(){
try{
    const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/review`, {
        headers: {"Content-Type": "apllication/json"},
        withCredentials: true
    })
    const data = response.data;
    if(data.error){
        if(data.error === "Not a authorized Admin" || data.error === "You are not a authorized user!"){
            return redirect("/admin/login");
        }
    }

    return data;
}catch(error){
    return {error: "something went wrong"}
}
}

export default AdminReviews