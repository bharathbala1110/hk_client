import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Dashboard from "../../components/dashboard/Dashboard";
import Purchase from "../../components/purchase/Purchase";
import { Route, Routes } from "react-router-dom";
import Dashboard2 from "../../components/dashboard/Dashboard2";
import PurchaseDetails from "../../components/purchase/PurchaseDetails";
import Supplier from "../../components/supplier/Supplier";
import Baling from "../../components/Baling/Baling";
import BalingDetails from "../../components/Baling/BalingDetails";
import Batch from "../../components/batches/Batch";
import Sale from "../../components/Sales/Sale";
import SaleDetail from "../../components/Sales/SaleDetail";
import SupplierDetail from "../../components/supplier/SupplierDetail";
import BatchDetail from "../../components/batches/BatchDetail";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate,Outlet } from 'react-router-dom'

export default function Layout() {
  const {user}= useSelector(state=>state.auth)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!user){
      console.log("User is not logged in");
      navigate('/')
    }
  },[user,navigate])
  return (
    <div className="flex">
      <div className="h-screen w-64 fixed top-0 left-0 bg-gray-800">
        <Sidebar />
      </div>
      <main className="ml-72 flex-1">
        <Routes>
          <Route index path="/" element={<Dashboard2 />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/purchaseDetails/:id" element={<PurchaseDetails />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/supplier/:id" element={<SupplierDetail />} />
          <Route path="/baling" element={<Baling />} />
          <Route path="/baling/:id" element={<BalingDetails />} />
          <Route path="/batch" element={<Batch />} />
          <Route path="/batch/:id" element={<BatchDetail />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/sale/:id" element={<SaleDetail />} />
        </Routes>
        <Outlet/>
      </main>
    </div>
  );
}
