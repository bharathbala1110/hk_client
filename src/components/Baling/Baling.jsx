import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import { useDispatch, useSelector } from 'react-redux'
import { getAll } from '../../features/bale/baleSlice'
import { Link } from 'react-router-dom'

export default function Baling() {
  const dispatch = useDispatch()
  const {baleData,isLoading} = useSelector(state => state.bale)
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(()=>{
    dispatch(getAll())
  },[])

  if(isLoading){
    return(
      <div class="flex justify-center items-center h-screen">
      <div class="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
    </div>
    )
  }
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredBaleData = baleData.filter(
    (order) =>
      order.bale_material.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.display_bale_id.toLowerCase().includes(searchTerm)
  );
  return (
    <div className="animate-fadeIn p-2 ">
    <div className="min-w-full">
    <Header title={'Bale'}/>
    <div className="text-right  w-full">
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
          Bale ID
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
          Bale Material
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
        Bale Quantity
        </th>
        <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
          Bale Date
        </th>
        
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredBaleData && filteredBaleData.map((order) => (
        <tr key={order.bale_id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            <Link to={`/layout/baling/${order.bale_id}`} className="text-indigo-600 hover:text-indigo-900">
              {order.display_bale_id}
            </Link>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.bale_material}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.bale_quantity}</td>
          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
         
        </tr>
      ))}
    </tbody>
    
  </table>
  </div>
 
</div>
  )
}
