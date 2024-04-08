import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getById } from '../../features/batch/batchDetailSlice';

export default function BatchDetail() {
  const dispatch = useDispatch()
  const {summary,material} = useSelector(state => state.batchDetail.batchDetail)
  let { id } = useParams();
  useEffect(()=>{
    dispatch(getById(id))
    console.log("batch detail",summary)
    // console.log("purchase_order_detail",purchase_order_details)
  },[id])
  if (!material) {
    return <div>Loading...</div>;
  }

  // Check if purchase_order_details is not yet loaded
  if (!summary) {
    return <div>Loading...</div>;
  }
  return (
    <div className="m-14 border-gray-400 border-2  ">
       <div className="pl-3 py-5 bg-gray-400 text-lg font-bold  border-gray-400 border-b-2">
        Batch #{summary[0].batch_id}
      </div>
      <div class="grid grid-cols-3 gap-x-4 gap-y-10 mt-4">
        <div className="text-center">
        <p className="text-3xl text-green-400 mb-1">{summary[0].orderCount}</p>
          <div className="text-lg font-semibold">Orders</div>
         
        </div>

        <div className="text-center">
          <p className="text-3xl text-green-400 mb-1">{summary[0].quantity}</p>
          <div className="text-lg font-semibold">Total Quantity</div>

        </div>

        <div className="text-center">
        
          <p className="text-3xl text-green-400 mb-1">{summary[0].date}</p>
          <div className="text-lg font-semibold">Data Created</div>
        </div>
       
       
      </div>
      <div className='m-6'>
         <h4 className='text-2xl font-semibold'>Material Details</h4>
         <div className="mx-4 my-6">
      <table className="min-w-full divide-y  divide-gray-200 table-auto border-collapse border border-gray-400">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
            PO ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
            Material Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
            Material Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
            Supplier
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
        {material.map((order) => (
          <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {order.purchase_order_id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.display_material_id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.material_name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.supplier_name }
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.quantity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {order.sacks}
            </td>
          </tr>
         ))} 
        </tbody>
       
      </table>
      </div>
      </div>

    </div>
  )
}
