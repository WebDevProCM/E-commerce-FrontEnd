import React, { useState, useEffect } from 'react'
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';
import classes from './adminOrders.module.css'
import DataTable from 'react-data-table-component';
import { FaRegEdit } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import { toast } from 'react-toastify';
import apiClient from '../../../utilis/apiClient';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import OrderDetails from './OrderDetails';

const UpdateModal = ({updateModalData, setShowState, showModal}) =>{
    const status = updateModalData.status;
    const paid = updateModalData.paid;

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
                        <input name='ordId' type="hidden" className="form-control" id="ordId" defaultValue={updateModalData.id}/>
                    <div className="row mb-3">
                        <label htmlFor="date" className="form-label">Delivery Date</label>
                        <div>
                        <input name='date' type="date" className="form-control" id="date" defaultValue={updateModalData.deliveryDate?.slice(0, 10)} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select defaultValue={status} name='status' className="form-select" id="status">
                            <option value="dispatched">Dispatched</option>
                            <option value="preparing">Preparing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div className="row mb-3">
                        <label htmlFor="paid" className="form-label">Paid</label>
                        <select name='paid' className="form-select" id="paid" defaultValue={paid}>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
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

    return(
        <>
        <Button variant="btn btn-primary btn-sm" onClick={() => setShowState(true)}>
            <BiDetail />
        </Button>
        <Modal show={showModal} onHide={() => setShowState(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <section className={classes.detailsBody}>
                <div className={classes.detailsBodyText}>
                    <p>ORDER ID: </p>
                    <p>{updateModalData[0]?.ordId}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>CUSTOMER: </p>
                    <p>{updateModalData[0]?.customer.name}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>DELIVERY DATE: </p>
                    <p>{updateModalData[0]?.deliveryDate?.slice(0, 10)}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>PAID: </p>
                    <p>{updateModalData[0]?.paid}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>STATUS: </p>
                    <p>{updateModalData[0]?.status}</p>
                </div>
                <div className={classes.detailsBodyText}>
                    <p>TOTAL AMOUNT: </p>
                    <p>${updateModalData[0]?.totalAmount}</p>
                </div>
                <p>PRODUCTS: </p>
                {updateModalData[0]?.products?.map((product) =>{
                    return (
                        <OrderDetails key={product?.prodId} product={product} />
                    )
                })}
            </section>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowState(false)}>
                    Close
                </Button>
                <Button variant="primary" type='submit' onClick={() => setShowState(false)}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
      </>
    )
}

function AdminOrders() {
    const initialData = useLoaderData();
    const changedData = useActionData();
    const [tableData, setTableData] = useState(initialData);
    const [show, setShow] = useState({});

    const handleShowModal = (id) => {
    setShow((prev) => ({ ...prev, [id]: true }));
    };
    
    const handleCloseModal = (id) => {
    setShow((prev) => ({ ...prev, [id]: false }));
    };

    //updating state data after admin changing details
    useEffect(() =>{
        if(changedData?.ordId){
            toast.success("Order details updated!");
            setTableData((prev) => [...prev.filter((data) => data.ordId !== changedData.ordId), changedData]);
        }

        if(changedData?.error){
            toast.error(changedData.error);
        }
    }, [changedData]);

    const columns = [
        { name: 'ORD-ID', selector: row => row.ordId, sortable: true },
        { name: 'DELIVERY-DATE', selector:  row => <p>{row?.deliveryDate.slice(0, 10)} </p>, sortable: true },
        { name: 'TOTAL-AMOUNT', selector: row => <p>${row?.totalAmount} </p>, sortable: true },
        { name: 'STATUS', selector: row => row.status, sortable: true },
        { name: 'PAID', selector: row => row.paid, sortable: true },
        {
          name: 'ACTIONS',
          cell: (row) => (
            <div className={classes.actionBtn}>
                <UpdateModal 
                    updateModalData={{id: row.ordId, deliveryDate: row.deliveryDate, status: row.status, paid: row.paid}} 
                    showModal={show[row.ordId+"patch"] || false} 
                    setShowState={(state) => state ? handleShowModal(row.ordId+"patch") : handleCloseModal(row.ordId+"patch")}
                />
                <DetailsModal 
                    updateModalData={tableData.filter((data) => data.ordId === row.ordId)} 
                    showModal={show[row.ordId+"view"] || false} 
                    setShowState={(state) => state ? handleShowModal(row.ordId+"view") : handleCloseModal(row.ordId+"view")}
                />
              {/* <button className="btn btn-secondary btn-sm" onClick={() => showDetailHandler(row.ordId)}><BiDetail /></button> */}
            </div>
          ),
        },
    ];

  return (
    <div>
        <section className={classes.titleContainer}>
            <h1>ORDERS</h1>
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

        const requestData = {deliveryDate: dataObject.date, status:dataObject.status, paid:dataObject.paid}
        const response = await apiClient.patch(`/api/order/admin/${dataObject.ordId}`, requestData);
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
        const response = await apiClient.get("/api/orders/admin");
        const data = response.data;
        if(data.error){
            if(data.error === "Not a authorized Admin"){
                return redirect("/admin/login");
            }
            throw new Error(data.error);
        }

        return data;
    }catch(error){
        if(error?.response?.data){
            if(error?.response?.data.error === "Not a authorized Admin"){
                return redirect("/admin/login");
            }
            throw new Error(error.response.data);
          }
          throw new Error(error);
    }
}

export default AdminOrders