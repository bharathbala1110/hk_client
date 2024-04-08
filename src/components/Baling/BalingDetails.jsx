import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../features/bale/baleSlice'
import { useParams } from 'react-router-dom'
import { getById } from '../../features/bale/baleDetailSlice'

export default function BalingDetails() {
  const dispatch = useDispatch()
  const {summary,material} = useSelector(state=>state.baleDetail.baleDetail)
  const {id}=useParams()
  useEffect(()=>{
    dispatch(getById(id))
    console.log(summary)
  },[])
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
     Bale #{summary[0].bale_id}
   </div>
   <div class="grid grid-cols-3 gap-x-4 gap-y-10 mt-4">
     <div className="text-center">
       <div className="text-lg font-semibold">Bale Material</div>
     <p className="text-3xl text-green-400 mb-1">{summary[0].bale_material}</p>

      
     </div>

     <div className="text-center">
       <div className="text-lg font-semibold">Quantity</div>
       <p className="text-3xl text-green-400 mb-1">{summary[0].bale_quantity}</p>


     </div>

     <div className="text-center">
     
       <div className="text-lg font-semibold">Date</div>
       <p className="text-3xl text-green-400 mb-1">{summary[0].date}</p>

     </div>
    
    
   </div>
   <div className='m-6'>
      <h4 className='text-2xl font-semibold'>Batch Contribution</h4>
      <div className="mx-4 my-6">
   <table className="min-w-full divide-y  divide-gray-200 table-auto border-collapse border border-gray-400">
     <thead className="bg-gray-50">
       <tr>
         <th className="px-6 py-3 text-center text-xs font-extrabold text-gray-500 uppercase tracking-wider">
         Batch
         </th>
         <th className="px-6 py-3 text-center text-xs font-extrabold text-gray-500 uppercase tracking-wider">
        Input Quantity
         </th>
       </tr>
     </thead>
     <tbody className="bg-white divide-y divide-gray-200">
     {material.map((order) => (
       <tr>
         <td className="px-6 py-4 text-center  whitespace-nowrap text-sm font-medium text-gray-900">
        {order.batch_id}
         </td>
         <td className="px-6 py-4 text-center  whitespace-nowrap text-sm text-gray-500">
         {order.quantity} kg
         </td>
        
       </tr>
     ))} 
     </tbody>
     <tfoot>
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
             Total
            </td>
            
            <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
             {summary[0].bale_quantity}kg
            </td>
            
          </tr>
        </tfoot>
   </table>
   </div>
   </div>

 </div>
  )
}
