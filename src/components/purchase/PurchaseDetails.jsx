import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { getById } from "../../features/purchase/purchaseDetailSlice";

export default function PurchaseDetails() {
  
  const dispatch = useDispatch()
  const {purchase_order,purchase_order_details} = useSelector(state => state.purchaseDetail.purchaseDetail)
  let { id } = useParams();
  useEffect(()=>{
    dispatch(getById(id))
    console.log("purchase_order",purchase_order)
    console.log("purchase_order_detail",purchase_order_details)
  },[id])
  if (!purchase_order) {
    return <div>Loading...</div>;
  }

  // Check if purchase_order_details is not yet loaded
  if (!purchase_order_details) {
    return <div>Loading...</div>;
  }
  return (
   <>
    <div className="m-14 border-gray-400 border-2">
      <div className="pl-3 py-5 bg-gray-400 text-lg font-bold  border-gray-400 border-b-2">
        Order #{purchase_order[0]?.po_id}
      </div>
      <div class="grid grid-cols-4 gap-x-4 gap-y-10 mt-4">
        <div className="text-center">
          <div className="text-lg">Name</div>
          <p className="text-3xl text-green-400">{purchase_order[0].supplier_name}</p>
        </div>

        <div className="text-center">
          <div className="text-lg">Quantity</div>
          <p className="text-3xl text-green-400">{purchase_order[0].totalQuantity}</p>
        </div>

        <div className="text-center">
          <div className="text-lg">Date</div>
          <p className="text-3xl text-green-400">{purchase_order[0].date}</p>
        </div>

        <div className="text-center">
          <div className="text-lg">Time</div>
          <p className="text-3xl text-green-400">16:39:23</p>
        </div>
        <div className="text-center">
          <div className="text-lg">Procurement Mode</div>
          <p className="text-3xl text-green-400"> {purchase_order[0].procurement_mode === 1 ? 'Drop off' : 'Pick up'}</p>
        </div>
        <div className="text-center">
          <div className="text-lg">Vehicle Number</div>
          <p className="text-3xl text-green-400">TN10AW1234</p>
        </div>
      </div>
      <div className="mx-4 my-8">
      <table className="min-w-full divide-y  divide-gray-200 table-auto border-collapse border border-gray-400">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Material
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Material Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
              Sacks
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {purchase_order_details.map((purchase_order_details) => (
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {purchase_order_details.po_details_id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {purchase_order_details.material_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {purchase_order_details.quantity + "kg"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {purchase_order_details.sacks}
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
             Total
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
             -
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {purchase_order[0].totalQuantity + "kg"}
            </td>
            
          </tr>
        </tfoot>
      </table>
      </div>
     
    </div>
    </>
  );
}
