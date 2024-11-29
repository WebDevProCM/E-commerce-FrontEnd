import React, { forwardRef, useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import Modal from '../Modal/Modal'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import { RiErrorWarningLine } from "react-icons/ri";
import classes from "./adminProducts.module.css";
import apiClient from '../../../utilis/apiClient'

const CreateModal = forwardRef((props, ref) =>{
    return(
        <Modal ref={ref.createModalRef}>
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Create Product</h1>
                <button type="button" className="btn-close" onClick={() => ref.createModalRef.current.close()}></button>
            </div>
            <Form method='post' encType='multipart/form-data' ref={ref.createModalForm}>
                <div className="modal-body">
                    <div className="row mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <div>
                        <input name='name' type="text" className="form-control" id="name" required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <div>
                        <input name='quantity' type="number" max={50} min={1} className="form-control" id="quantity" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <div>
                        <input name='price' type="number" min={1} step={0.05} className="form-control" id="price" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="oldPrice" className="form-label">Old Price</label>
                        <div>
                        <input name='oldPrice' type="number" min={0} className="form-control" id="oldPrice" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select name='status' className="form-select" id="status">
                            <option value={1}>Available</option>
                            <option value={0}>Not Available</option>
                        </select>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select name='category' className="form-select" id="category">
                            <option value="Unisex">Unisex</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select name='type' className="form-select" id="type">
                            <option value="eau de cologne">Eau de Cologne</option>
                            <option value="parfum">Parfum</option>
                            <option value="eau de toilette">Eau de Toilette</option>
                            <option value="eau fraiche">Eau Fraiche</option>
                        </select>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="ml" className="form-label">ML</label>
                        <div>
                        <input name='ml' type="number" max={500} min={50} className="form-control" id="ml" required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <div>
                        <textarea name='description' className="form-control" id="description" required/>
                        </div>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input className="form-control" type="file" id="image" name='image' required/>
                    </div>
  
                </div>
                <div className={`${classes["modal-footer"]} modal-footer`}>
                    <button type="button" className="btn btn-secondary" onClick={() => ref.createModalRef.current.close()}>Close</button>
                    <button type="submit" className="btn btn-primary" name='intent' value="create">Save changes</button>
                </div>
            </Form>
            </div>
        </Modal>
    )
})

const UpdateModal = forwardRef(({updateModalData}, ref) =>{
    return(
        <Modal ref={ref}>
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Update Product Details</h1>
                <button type="button" className="btn-close" onClick={() => ref.current.close()}></button>
            </div>
            <Form method="post" encType='multipart/form-data'>
                <div className="modal-body">
                    <input name='id' type="hidden" className="form-control" id="id" defaultValue={updateModalData.prodId}/>
                    
                    <div className="row mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <div>
                        <input name='name' type="text" className="form-control" id="name" defaultValue={updateModalData.name} required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <div>
                        <input name='quantity' type="number" max={50} min={1} className="form-control" id="quantity" defaultValue={updateModalData.quantity} required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <div>
                        <input name='price' type="number" min={1} step={0.05} className="form-control" id="price" defaultValue={updateModalData.price} required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="oldPrice" className="form-label">Old Price</label>
                        <div>
                        <input name='oldPrice' type="number" min={0} className="form-control" id="oldPrice" defaultValue={updateModalData.oldPrice} required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select defaultValue={updateModalData.status} name='status' className="form-select" id="status">
                            <option value={1}>Available</option>
                            <option value={0}>Not Available</option>
                        </select>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select defaultValue={updateModalData.category} name='category' className="form-select" id="category">
                            <option value="Unisex">Unisex</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="type" className="form-label">Type</label>
                        <select defaultValue={updateModalData.type} name='type' className="form-select" id="type">
                            <option value="eau de cologne">Eau de Cologne</option>
                            <option value="parfum">Parfum</option>
                            <option value="eau de toilette">Eau de Toilette</option>
                            <option value="eau fraiche">Eau Fraiche</option>
                        </select>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="ml" className="form-label">ML</label>
                        <div>
                        <input name='ml' type="number" max={500} min={50} className="form-control" id="ml" defaultValue={updateModalData.ml} required/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <div>
                        <textarea name='description' className="form-control" id="description" defaultValue={updateModalData.description} required/>
                        </div>
                    </div>

                    <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input className="form-control" type="file" id="image" name='image'/>
                    </div>
  
                </div>
                <div className={`${classes["modal-footer"]} modal-footer`}>
                    <button type="button" className="btn btn-secondary" onClick={() => ref.current.close()}>Close</button>
                    <button type="submit" className="btn btn-primary" name='intent' value="update">Save changes</button>
                </div>
            </Form>
            </div>
        </Modal>
    )
})

const DetailsModal = forwardRef(({modalData}, ref) =>{
    return(
        <Modal ref={ref}>
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Product Details</h1>
                <button type="button" className="btn-close" onClick={() => ref.current.close()}></button>
            </div>

            <section className={classes.detailsBody}>
                <div className={classes.detailsBodyText}>
                    <p>PRODUCT ID: </p>
                    <p>{modalData[0]?.prodId}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>NAME: </p>
                    <p>{modalData[0]?.name}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>QUANTITY: </p>
                    <p>{modalData[0]?.quantity}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>PRICE: </p>
                    <p>${modalData[0]?.price}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>OLD PRICE: </p>
                    <p>${modalData[0]?.oldPrice}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>STATUS: </p>
                    <p>{modalData[0]?.status}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>CATEGORY: </p>
                    <p>{modalData[0]?.category}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>TYPE: </p>
                    <p>{modalData[0]?.type}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>ML: </p>
                    <p>{modalData[0]?.ml}ml</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>DESCRIPTION: </p>
                    <p>{modalData[0]?.description}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>IMAGE: </p>
                    {modalData[0]?.image.startsWith("https") ?
                        <img src={modalData[0]?.image} alt='product'/> :
                        <img src={`/images/${modalData[0]?.image}.jpg`} alt='product'/>
                    }
                </div>
            </section>
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
                <div className={`${classes["modal-footer"]} modal-footer`}>
                    <button type="button" className="btn btn-secondary" onClick={() => ref.current.close()}>No</button>
                    <button type="submit" className="btn btn-primary">Yes</button>
                </div>
            </form>
            </div>
        </Modal>
    )
})

function AdminProducts() {
    const data = useLoaderData();
    const changedData = useActionData();
    const [tableData, setTableData] = useState(data);
    //managing state for each modal
    const [updateModalData, setUpdateModalData] = useState({});
    const [deleteeModalData, setDeleteModalData] = useState([]);
    const [productData, setProductData] = useState([]);

    const modalRef = useRef();
    const DetailsmodalRef = useRef();
    const deleteModalRef = useRef();
    const createModalRef = useRef();
    const createModalForm = useRef();
    
    //updating state after admin updating product details
    useEffect(() =>{
      if(changedData?.prodId){
          toast.success("Product details updated!");
          modalRef.current.close();
          setTableData((prev) => [...prev.filter((data) => data.prodId !== changedData.prodId), changedData])
      }
  
      if(changedData?.error){
          toast.error(changedData.error);
      }
    }, [changedData]);
  
    const columns = [
        { name: 'PROD-ID', selector: row => row.prodId, sortable: true },
        { name: 'NAME', selector: row => row.name},
        { name: 'QUANTITY', selector:  row => row.quantity, sortable: true },
        { name: 'PRICE', selector: row => <p>${row.price}</p>, sortable: true },
        {
        name: 'Actions',
        cell: (row) => (
            <div className={classes.actionBtn}>
            <button className="btn btn-primary btn-sm" onClick={() => handleViewDetails(row.prodId)}><GrView /></button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleUpdate(row)}><FaRegEdit /></button>
            <button className="btn btn-danger btn-sm" onClick={() => initiateDeleteHandler(row.prodId)}><MdDelete /></button>
            </div>
        ),
        },
    ];

    //updating relevant modal state with relevant product details
    const handleViewDetails = (id) =>{
        const details = tableData.filter((data) => data.prodId === id);
        setProductData(() => details);
        DetailsmodalRef.current.showModal();
    }
  
    const handleUpdate = (row) => {
        setUpdateModalData(row);
        modalRef.current.showModal();
    };

    const initiateDeleteHandler = (id) =>{
        setDeleteModalData(id);
        deleteModalRef.current.showModal();
    }

    const deleteHandler = async (event, id) =>{
        event.preventDefault();

        try{
            const response = await apiClient.delete("/api/product/${id}")
            const data = response.data;
            if(data.error){
                if(data.error === "Not a authorized Admin" || data.error === "You are not a authorized user!"){
                    return redirect("/admin");
                }

                return toast.error(data.error);
            }

            toast.success("Review removed!");
            setTableData((prev) => prev.filter((data) => data.prodId !== id));
            deleteModalRef.current.close();

        }catch(error){
            if(error?.response?.data){
                return error.response.data
              }
            return error;
        }
    }

    const initiateCreateHandler = () =>{
        createModalForm.current.reset();
        createModalRef.current.showModal();
    }

  return (
    <div>
        <section className={classes.titleContainer}>
            <h1>PRODUCTs DETAILS</h1>
            <button className="btn btn-success" onClick={initiateCreateHandler}>Create</button>
        </section>
        <DataTable
            defaultSortFieldId={1}
            columns={columns}
            data={tableData}
            pagination
        />
        
        {tableData && <DetailsModal modalData={productData} ref={DetailsmodalRef}/>}
        {<CreateModal ref={{createModalRef, createModalForm}}/>}
        {updateModalData && <UpdateModal updateModalData={updateModalData} ref={modalRef}/>}
        {deleteeModalData && <DeleteModal deleteModalData={deleteeModalData} deleteHandler={deleteHandler} ref={deleteModalRef}/>}
    </div>
  )
}

export async function action({request}){
    try{
        const formData = await request.formData();
        const dataObject = Object.fromEntries(formData);
        const intent = dataObject.intent;
        let id = "";
        let response = "";

        delete dataObject.intent;

        if(intent === "update"){
            id = dataObject.id
            delete dataObject.id;
    
            if(!dataObject.image.name){
                delete dataObject.image;
            }
        }

  
        if(intent === "update"){
            response = await apiClient.patch("/api/product/${id}", dataObject);

        }else{
            response = await apiClient.post("/api/product", dataObject);
        }

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
        const response = await apiClient.get("/api/product")
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

export default AdminProducts