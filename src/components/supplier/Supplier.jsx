import React, { useEffect, useState } from 'react'
import Pagination from '../../common/Pagination';
import Header from '../../common/Header';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../../features/supplier/supplierSlice';


export default function Supplier() {

  const dispatch = useDispatch()  
  const {supplierList,isLoading} = useSelector(state => state.supplier)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{
    dispatch(getAll())
    console.log(supplierList)
    
  },[dispatch])
if(isLoading){
  return(
    <div class="flex justify-center items-center h-screen">
    <div class="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
  </div>
  )
}
  const filteredSupplierData = supplierList.filter(order => 
    order.supplier_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.supplier_id.toString().includes(searchTerm)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // const [currentPage, setCurrentPage] = useState(1);
  // const [ordersPerPage] = useState(10);
  // const indexOfLastOrder = currentPage * ordersPerPage;
  // const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  // const currentOrders = purchaseData.slice(indexOfFirstOrder, indexOfLastOrder);
  // const paginate = pageNumber => setCurrentPage(pageNumber);
 
  return (
   
    <div className="animate-fadeIn p-2 ">
    <div className="min-w-full">
    <Header title={'Supplier'}/>
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
         Supplier ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
           No. of orders
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
          Weight
        </th>
       
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredSupplierData && filteredSupplierData.map((order) => (
        <tr key={order.supplier_id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <Link to={`/layout/supplier/${order.supplier_id}`} className="text-indigo-600 hover:text-indigo-900">
              {order.supplier_id}
            </Link>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.supplier_name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">100Kg</td>
          
        </tr>
      ))}
    </tbody>
    
  </table>
  </div>
 
</div>
  )
}
