import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../features/supplier/supplierDetailSlice";

export default function SupplierDetail() {
  const dispatch = useDispatch()
  const {supplierDetail} = useSelector(state => state.supplierDetail)
  let { id } = useParams();
  useEffect(()=>{
    dispatch(getById(id))
    console.log("supplierDetail",supplierDetail)
  },[dispatch,id])
  
  return (
    <div className="m-14 border-gray-400 border-2">
      <div className="pl-3 py-5 bg-gray-400 text-lg font-bold  border-gray-400 border-b-2">
        User #{supplierDetail && supplierDetail[0] && supplierDetail[0].supplier_id}
      </div>
      <div class="grid grid-cols-3 gap-x-2 gap-y-10 mt-4">
        <div className="text-center">
          <div className="text-lg">Photo</div>
          <p className="text-4xl text-green-500"></p>
        </div>
        <div className="text-start">
          <div className="mx-2 my-4">
            <div className="text-lg">Name</div>
            <p className="text-2xl text-green-400">{supplierDetail && supplierDetail[0] && supplierDetail[0].supplier_name}</p>
          </div>

          <div className="mx-2 my-4">
            <div className="text-lg">Age</div>
            <p className="text-2xl text-green-400">{supplierDetail && supplierDetail[0] && supplierDetail[0].age}</p>
          </div>
          <div className="mx-2 my-4">
            <div className="text-lg">Average Quantity</div>
            <p className="text-2xl text-green-400">{supplierDetail && supplierDetail[0] && supplierDetail[0].avg_quantity}</p>
          </div>
          <div className="mx-2 my-4">
            <div className="text-lg">Address</div>
            <p className="text-2xl text-green-400">{supplierDetail && supplierDetail[0] && supplierDetail[0].address}</p>
          </div>
        </div>
        <div className="text-start">
         

          <div className="mx-2 my-4">
            <div className="text-lg">Phone</div>
            <p className="text-2xl text-green-400">{supplierDetail && supplierDetail[0] && supplierDetail[0].phone}</p>
          </div>
          <div className="mx-2 my-4">
            <div className="text-lg">Total number of orders</div>
            <p className="text-2xl text-green-400">{supplierDetail && supplierDetail[0] && supplierDetail[0].order_number}</p>
          </div>
          <div className="mx-2 my-4">
            <div className="text-lg">Average Load Quality</div>
            <p className="text-2xl text-green-400">-</p>
          </div>
          <div className="mx-2 my-4">
            <div className="text-lg">Specimen Signature</div>
            <p className="text-2xl text-green-400">.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
