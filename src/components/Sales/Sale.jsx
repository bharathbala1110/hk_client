import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../features/sale/saleSlice'
import { Link } from 'react-router-dom'

export default function Sale() {
  const dispatch = useDispatch()  
  const {saleData} = useSelector(state => state.sale)
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(()=>{
    dispatch(getAll())
    console.log(saleData)
    
  },[dispatch])
  const filteredSaleData = saleData.filter(order => 
    order.buyer_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    order.display_sale_id.toLowerCase().includes(searchTerm)
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="animate-fadeIn p-2 ">
    <div className="min-w-full">
    <Header title={'Sale'}/>
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
          Sale ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
         Date
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
         Buyer
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
         Total Quantity
        </th>
      
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredSaleData && filteredSaleData.map((order) => (
        <tr key={order.sales_id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <Link to={`/layout/sale/${order.sales_id}`} className="text-indigo-600 hover:text-indigo-900">
              {order.display_sale_id}
            </Link>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.buyer_name}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.quantity} Kg</td>

        </tr>
      ))}
    </tbody>
    
  </table>
  </div>
 
</div>
  )
}
