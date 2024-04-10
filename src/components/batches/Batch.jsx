import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAll } from "../../features/batch/batchSlice";

export default function Batch() {
  const dispatch = useDispatch();
  const { batchData, isLoading } = useSelector((state) => state.batch);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(getAll());
  }, []);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredBatchData = batchData.filter(
    (order) =>
      order.status.toString().includes(searchTerm.toLowerCase()) ||
      order.display_batch_id.toLowerCase().includes(searchTerm)
  );
  if(isLoading){
    return(
      <div class="flex justify-center items-center h-screen">
      <div class="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
    </div>
    )
  }
  return (
    <div className="animate-fadeIn p-2 ">
      <div className="min-w-full">
        <Header title={"Batch"} />
        
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
                Batch ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Segregated start date
              </th>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Segregated end date
              </th>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBatchData.map((order) => (
              <tr key={order.batch_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link
                    to={`/layout/batch/${order.batch_id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {order.display_batch_id}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.start_date || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.end_date || "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.totalQuantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
