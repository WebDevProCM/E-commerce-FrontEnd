import React, { forwardRef, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import axios from 'axios'
import classes from "./adminReviews.module.css"
import apiClient from '../../../utilis/apiClient'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UpdateModal =({updateModalData, setShowState, showModal}) =>{

    return(
        <>
        <Button variant="btn btn-primary btn-sm" onClick={() => setShowState(true)}>
            <FaRegEdit />
        </Button>
      <Modal show={showModal} onHide={() => setShowState(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Review Details</Modal.Title>
        </Modal.Header>
        <Form method="post" encType='multipart/form-data'>
            <Modal.Body>
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

// const DeleteModal = forwardRef(({deleteModalData ,deleteHandler}, ref) =>{

//     return(
//         <Modal ref={ref}>
//             <div className="modal-content">
//             <div className="modal-header">
//                 <h1 className="modal-title fs-5">Are sure you want to remove this?</h1>
//                 <button type="button" className="btn-close" onClick={() => ref.current.close()}></button>
//             </div>
//             <div className="modal-body">
//                 <RiErrorWarningLine size={90} className='sign'/>
//             </div>
//             <form onSubmit={(event) => {deleteHandler(event, deleteModalData)}}>
//                 <div className={`${classes["modal-footer"]} modal-footer`}>
//                     <button type="button" className="btn btn-secondary" onClick={() => ref.current.close()}>No</button>
//                     <button type="submit" className="btn btn-primary">Yes</button>
//                 </div>
//             </form>
//             </div>
//         </Modal>
//     )
// })

function AdminReviews() {
    const data = useLoaderData();
    const changedData = useActionData();
    const [tableData, setTableData] = useState(data);

    const [updateModalState, setUpdateModalState] = useState({});
    // const [deleteeModalData, setDeleteModalData] = useState([]);
  
    const handleShowUpdateModal = (id) => {
        setUpdateModalState((prev) => ({ ...prev, [id]: true }));
    };
      
    const handleCloseUpdateModal = (id) => {
        setUpdateModalState((prev) => ({ ...prev, [id]: false }));
    };

    useEffect(() =>{
      if(changedData?._id){
          toast.success("Review details updated!");
          setTableData((prev) =>[...prev.filter((data) => data._id !== changedData._id), changedData])
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
            <div className={classes.actionBtn}>
            <UpdateModal updateModalData={{id:row._id, stars:row.stars, description:row.description}} 
                showModal={updateModalState[row._id] || false} 
                setShowState={(state) => state ? handleShowUpdateModal(row._id) : handleCloseUpdateModal(row._id)}
            />
            {/* <button className="btn btn-danger btn-sm" onClick={() => initiateDeleteHandler(row._id)}><MdDelete /></button> */}
            </div>
        ),
        },
    ];

    // const deleteHandler = async (event, id) =>{
    //     event.preventDefault();

    //     try{
    //         const response = await apiClient.delete(`/api/review/${id}`)
    //         const data = response.data;
    //         if(data.error){
    //             if(data.error === "Not a authorized Admin" || data.error === "You are not a authorized user!"){
    //                 return redirect("/admin");
    //             }

    //             return toast.error(data.error);
    //         }

    //         toast.success("Review removed!");
    //         setTableData((prev) => prev.filter((data) => data._id !== id));
    //         deleteModalRef.current.close();

    //     }catch(error){
    //         if(error?.response?.data){
    //             if(error?.response?.data.error === "Not a authorized Admin" || error?.response?.data.error === "You are not a authorized user!"){
    //                 return redirect("/admin");
    //             }
    //             return error.response.data
    //         }
    //         return {error: "something went wrong"} 
    //     }
    // }

    // const initiateDeleteHandler = (id) =>{
    //     setDeleteModalData(id);
    //     deleteModalRef.current.showModal();
    // }

  return (
    <div>
        <section className={classes.titleContainer}>
            <h1>REVIEWS</h1>
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

  
        const response = await apiClient.patch(`/api/review/${id}`, dataObject);
        const data = response.data;
    
        return data;
  
    }catch(error){
        if(error?.response?.data){
            return error.response.data
        }
        return {error: "something went wrong"}
    }
  }
  
export async function loader(){
    try{
        const response = await apiClient.get("/api/review")
        const data = response.data;
        if(data.error){
            if(data.error === "Not a authorized Admin" || data.error === "You are not a authorized user!"){
                return redirect("/admin/login");
            }
        }

        return data;
    }catch(error){
        if(error?.response?.data){
            if(error?.response?.data.error === "Not a authorized Admin" || error?.response?.data.error === "You are not a authorized user!"){
                return redirect("/admin/login");
            }
            return error.response.data
        }
        return {error: "something went wrong"}
    }
}

export default AdminReviews