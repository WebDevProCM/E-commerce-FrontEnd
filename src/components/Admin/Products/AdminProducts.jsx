import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GrView } from "react-icons/gr";
import classes from "./adminProducts.module.css";
import apiClient from '../../../utilis/apiClient'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Swal from 'sweetalert2';

const CreateModal = ({ setShowState, showModal }) =>{
    return(
        <>
        <Button variant="btn btn-success" onClick={() => setShowState(true)}>
            Create Product
        </Button>
        <Modal show={showModal} onHide={() => setShowState(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Create Product</Modal.Title>
            </Modal.Header>
            <Form method="post" encType='multipart/form-data'>
            <Modal.Body>
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

const UpdateModal = ({updateModalData, setShowState, showModal}) =>{
    return(
        <>
        <Button variant="btn btn-primary btn-sm" onClick={() => setShowState(true)}>
          <FaRegEdit />
        </Button>
        <Modal show={showModal} onHide={() => setShowState(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Update Product Details</Modal.Title>
            </Modal.Header>
            <Form method="post" encType='multipart/form-data'>
                <Modal.Body>
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

const DetailsModal = ({updateModalData, setShowState, showModal}) =>{
    // const keys = Object.keys(updateModalData[0]);

    return(
    <>
    <Button variant="btn btn-primary btn-sm" onClick={() => setShowState(true)}>
        <GrView />
    </Button>
    <Modal show={showModal} onHide={() => setShowState(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        {/* <Container>
        {keys.map((key, index) =>(
            key == "image" ?
                <LazyLoadImage
                    src={`${updateModalData[0]?.[key].startsWith("https") ?"updateModalData[0]?.image" :`/images/${updateModalData[0]?.key}.webp`}`}
                    alt="product"
                    effect="opacity"
                    width="100%"
                    height="auto"
                />
                :
                <Row key={index}>
                <Col>{key}</Col>
                <Col>{updateModalData[0]?.[key]}</Col>
                </Row>
                
        ))}
        </Container> */}
        <section className={classes.detailsBody}>
            <div className={classes.detailsBodyText}>
                <p>PRODUCT ID: </p>
                <p>{updateModalData[0]?.prodId}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>NAME: </p>
                <p>{updateModalData[0]?.name}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>QUANTITY: </p>
                <p>{updateModalData[0]?.quantity}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>PRICE: </p>
                <p>${updateModalData[0]?.price}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>OLD PRICE: </p>
                <p>${updateModalData[0]?.oldPrice}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>STATUS: </p>
                <p>{updateModalData[0]?.status}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>CATEGORY: </p>
                <p>{updateModalData[0]?.category}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>TYPE: </p>
                <p>{updateModalData[0]?.type}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>ML: </p>
                <p>{updateModalData[0]?.ml}ml</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>DESCRIPTION: </p>
                <p>{updateModalData[0]?.description}</p>
            </div>
            <div className={classes.detailsBodyText}>
                <p>IMAGE: </p>
                {updateModalData[0]?.image.startsWith("https") ?
                    // <img src={modalData[0]?.image} alt='product'/>
                    <LazyLoadImage
                        src={updateModalData[0]?.image}
                        alt="product"
                        effect="opacity"
                        width="100%"
                        height="auto"
                    />
                    :
                    // <img src={`/images/${modalData[0]?.image}.webp`} alt='product'/>
                    <LazyLoadImage
                        src={`/images/${updateModalData[0]?.image}.webp`}
                        alt="product"
                        effect="opacity"
                        width="100%"
                        height="auto"
                    />
                }
            </div>
        </section>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowState(false)}>Close</Button>
    </Modal.Footer>
    </Modal>
    </>
    )
}

function AdminProducts() {
    const data = useLoaderData();
    const changedData = useActionData();
    const [tableData, setTableData] = useState(data.products);
    // //managing state for each modal
    const [createModalState, setCreateModalState] = useState(false);
    const [showModal, setShowModal] = useState({});

    const handleDetailsShowModal = (id) => {
        setShowModal((prev) => ({ ...prev, [id]: true }));
    };
      
    const handleDetailsCloseModal = (id) => {
        setShowModal((prev) => ({ ...prev, [id]: false }));
    };
    
    //updating state after admin updating product details
    useEffect(() =>{
      if(changedData?.prodId){
          toast.success("Product details updated!");
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
            <DetailsModal 
                updateModalData={handleViewDetails(row.prodId)} 
                showModal={showModal[row.prodId+"view"] || false} 
                setShowState={(state) => state ? handleDetailsShowModal(row.prodId+"view") : handleDetailsCloseModal(row.prodId+"view")}/>
            <UpdateModal 
                updateModalData={row} 
                showModal={showModal[row.prodId+"patch"] || false} 
                setShowState={(state) => state ? handleDetailsShowModal(row.prodId+"patch") : handleDetailsCloseModal(row.prodId+"patch")}/>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(row.prodId)}><MdDelete /></button>
            </div>
        ),
        },
    ];

    //updating relevant modal state with relevant product details
    const handleViewDetails = (id) =>{
        return tableData.filter((data) => data.prodId === id);
    }
    //sending delete request
    const deleteReq = async (id) =>{
        try{
            const response = await apiClient.delete(`/api/product/${id}`)
            const data = response.data;
            if(data.error){
                if(data.error === "Not a authorized Admin" || data.error === "You are not a authorized user!"){
                    return redirect("/admin");
                }

                return toast.error(data.error);
            }

            toast.success("Review removed!");
            setTableData((prev) => prev.filter((data) => data.prodId !== id));

        }catch(error){
            if(error?.response?.data){
                return error.response.data
              }
            return error;
        }
    }
    // delete handler
    const handleDelete = (id) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            deleteReq(id)
            Swal.fire("Deleted!", "Your item has been deleted.", "success");
          }
        });
    };

  return (
    <div>
        <section className={classes.titleContainer}>
            <h1>PRODUCTS DETAILS</h1>
            <CreateModal setShowState={setCreateModalState} showModal={createModalState}/>
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
            response = await apiClient.patch(`/api/product/${id}`, dataObject);

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
        const response = await apiClient.get("/api/products",{
            params: {category: ["Unisex", "Women", "Men"], page: 1}
        })
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