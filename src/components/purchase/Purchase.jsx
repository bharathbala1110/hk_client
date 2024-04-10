import React, { useEffect, useState } from 'react';
import Pagination from '../../common/Pagination';
import Header from '../../common/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../features/purchase/purchaseSlice';

export default function Purchase() {
  const dispatch = useDispatch();
  const { purchaseData,isLoading } = useSelector(state => state.purchase);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);
  if(isLoading){
    console.log("isLoading",isLoading)
    return(
      <div class="flex justify-center items-center h-screen">
      <div class="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
    </div>
    )
  }
  // Update to filter purchaseData based on search term, considering both supplier name and order ID
  const filteredPurchaseData =purchaseData.filter(order => 
    order.supplier.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.display_order_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  return (
    <div className="animate-fadeIn p-2">
      <div className="min-w-full">
        <Header title={'Purchase Order'} />
        {/* Search Input Field */}
        <div className='text-right  w-full'>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border my-2 mx-1 w-56 rounded p-1"
        />
        </div>
      
      </div>
      <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 table-auto border-collapse border border-gray-400">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                PO ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Supplier Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Traceability
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPurchaseData.map((order) => (
              <tr key={order.order_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link to={`/layout/purchaseDetails/${order.order_id}`} className="text-indigo-600 hover:text-indigo-900">
                    {order.display_order_id}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.supplier}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity} Kg</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.traceability === 1 ? 'True' : 'False'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
