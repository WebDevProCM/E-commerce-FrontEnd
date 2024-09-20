import React, { useRef, forwardRef, useState, useEffect, memo } from 'react'
import { Form, redirect, useActionData, useLoaderData } from 'react-router-dom';
import './adminOrders.css'
import DataTable from 'react-data-table-component';
import { FaRegEdit } from "react-icons/fa";
import { BiDetail } from "react-icons/bi";
import axios from 'axios';
import { toast } from 'react-toastify';
import OrderDetails from './OrderDetails';
import Modal from '../Modal/Modal';

const UpdateModal = memo(forwardRef(({updateModalData}, ref) =>{
    const status = updateModalData.status;
    const paid = updateModalData.paid;

    return(
        <Modal ref={ref}>
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Update Order Details</h1>
                <button type="button" className="btn-close" onClick={() => ref.current.close()}></button>
            </div>
            <Form method="post" encType='multipart/form-data'>
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
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => ref.current.close()}>Close</button>
                    <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
            </Form>
            </div>
        </Modal>
    )
}))

const DetailsModal = memo(forwardRef(({modalData}, ref) =>{

    return(
        <Modal ref={ref}>
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Order Details</h1>
                <button type="button" className="btn-close" onClick={() => ref.current.close()}></button>
            </div>

            <section className='detailsBody'>
                <div className='detailsBodyText'>
                    <p>ORDER ID: </p>
                    <p>{modalData[0]?.ordId}</p>
                </div>
                <div className='detailsBodyText'>
                    <p>CUSTOMER: </p>
                    <p>{modalData[0]?.customer.name}</p>
                </div>
                <div className='detailsBodyText'>
                    <p>DELIVERY DATE: </p>
                    <p>{modalData[0]?.deliveryDate?.slice(0, 10)}</p>
                </div>
                <div className='detailsBodyText'>
                    <p>PAID: </p>
                    <p>{modalData[0]?.paid}</p>
                </div>
                <div className='detailsBodyText'>
                    <p>STATUS: </p>
                    <p>{modalData[0]?.status}</p>
                </div>
                <div className='detailsBodyText'>
                    <p>TOTAL AMOUNT: </p>
                    <p>${modalData[0]?.totalAmount}</p>
                </div>
                <p>PRODUCTS: </p>
                {modalData[0]?.products?.map((product) =>{
                    return (
                        <OrderDetails key={product?.prodId} product={product} />
                    )
                })}
            </section>
            </div>
        </Modal>
    )
}))

function AdminOrders() {
    const initialData = useLoaderData();
    const changedData = useActionData();
    const [tableData, setTableData] = useState(initialData);
    const [orderData, setOrderData] = useState([]);
    const [updateModalData, setUpdateModalData] = useState({});
    const modalRef = useRef();
    const DetailsmodalRef = useRef();

    useEffect(() =>{
        if(changedData?.ordId){
            toast.success("Order details updated!");
            modalRef.current.close();
            setTableData((prev) => {return [...prev.filter((data) => data.ordId !== changedData.ordId), changedData] })
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
            <div className="actionBtn">
              <button className="btn btn-primary btn-sm" onClick={() => handleUpdate(row.ordId, row.deliveryDate, row.status, row.paid)}><FaRegEdit /></button>
              <button className="btn btn-secondary btn-sm" onClick={() => showDetailHandler(row.ordId)}><BiDetail /></button>
            </div>
          ),
        },
    ];

    const handleUpdate = (id, deliveryDate, status, paid) => {
        setUpdateModalData({id, deliveryDate, status, paid});
        modalRef.current.showModal();
    };

    const showDetailHandler = (id) =>{
        const details = tableData.filter((data) => data.ordId === id);
        setOrderData(() => details);
        DetailsmodalRef.current.showModal();
    }

  return (
    <div>
        <section className='titleContainer'>
            <h1>ORDERS</h1>
        </section>
        <DataTable
            defaultSortFieldId={1}
            columns={columns}
            data={tableData}
            pagination
        />
        
        {updateModalData && <UpdateModal updateModalData={updateModalData} ref={modalRef}/>}
        {orderData && <DetailsModal modalData={orderData} ref={DetailsmodalRef}/>}

    </div>
  )
}
 
export async function action({request}){
    try{
        const formData = await request.formData();
        const dataObject = Object.fromEntries(formData);

        const requestData = {deliveryDate: dataObject.date, status:dataObject.status, paid:dataObject.paid}
        const response = await axios.patch(`${process.env.REACT_APP_DOMAIN}/api/order/admin/${dataObject.ordId}`, requestData,{
            withCredentials: true
        })
        const data = response.data;
        if(data.error){
           return data;
        }
    
        return data;

    }catch(error){
        return {error: "something went wrong"}
    }
}

export async function loader(){
    try{
        const response = await axios.get(`${process.env.REACT_APP_DOMAIN}/api/orders/admin`, {
            headers: {"Content-Type": "apllication/json"},
            withCredentials: true
        })
        const data = response.data;
        if(data.error){
            if(data.error === "Not a authorized Admin"){
                return redirect("/admin/login");
            }
            throw new Error(data.error);
        }

        return data;
    }catch(error){
        return {error: "something went wrong"}
    }
}

export default AdminOrders