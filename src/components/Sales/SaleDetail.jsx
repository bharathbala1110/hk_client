import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getById } from "../../features/sale/saleDetailSlice";

export default function SaleDetail() {
  const dispatch = useDispatch();
  const { summary, material } = useSelector(
    (state) => state.saleDetail.saleDetail
  );
  let { id } = useParams();
  useEffect(() => {
    dispatch(getById(id));
    console.log("summary", summary);
    console.log("material", material);
  }, [id]);
  if (!summary) {
    return <div>Loading...</div>;
  }
  if (summary.length === 0) {
    return <div>No data available for this supplier.</div>;
  }
  return (
    <div className="m-14 border-gray-400 border-2  ">
      <div className="pl-3 py-5 bg-gray-400 text-lg font-bold  border-gray-400 border-b-2">
        Sale #
      </div>
      <div class="grid grid-cols-4 gap-x-4 gap-y-10 mt-4">
        <div className="text-center">
          <div className="text-lg">Date</div>
          <p className="text-2xl text-green-400">{summary[0].date}</p>
        </div>

        <div className="text-center">
          <div className="text-lg">Buyer Name</div>
          <p className="text-2xl text-green-400">{summary[0].buyer_name}</p>
        </div>

        <div className="text-center">
          <div className="text-lg">No. of Bales</div>
          <p className="text-2xl text-green-400">{summary[0].balesCount}</p>
        </div>

        <div className="text-center">
          <div className="text-lg">No. of suppliers</div>
          <p className="text-2xl text-green-400">{summary[0].suppliersCount}</p>
        </div>
       
      </div>
      <div className="m-6">
        
        <div className="mx-4 my-6">
          <table className="min-w-full divide-y  divide-gray-200 table-auto border-collapse border border-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Bale ID	
                </th>
                <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Material
                </th>
              
                <th className="px-6 py-3 text-left text-xs font-extrabold text-gray-500 uppercase tracking-wider">
                Quantity
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {material.map((order) => (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.bale_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.bale_material}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.bale_quantity }
                </td>
               
              </tr>
              ))} 
            </tbody>
          </table>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-x-4 gap-y-10 mt-24 mb-4">
        <div className="text-center">
          <div className="text-lg font-semibold">Buyer Signature</div>
          {/* <p className="text-2xl text-green-400">{summary[0].date}</p> */}
        </div>

        <div className="text-center">
          <div className="text-lg font-semibold">Supervisor Signature</div>
          {/* <p className="text-2xl text-green-400">{summary[0].buyer_name}</p> */}
        </div>

     
       
      </div>
    </div>
  );
}
