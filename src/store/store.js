import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice'
import purchaseSlice from "../features/purchase/purchaseSlice";
import purchaseDetailSlice from "../features/purchase/purchaseDetailSlice";
import supplierSlice from "../features/supplier/supplierSlice";
import batchSlice from "../features/batch/batchSlice";
import  baleSlice  from "../features/bale/baleSlice";
import saleSlice from "../features/sale/saleSlice";
import supplierDetailSlice from "../features/supplier/supplierDetailSlice";
import batchDetailSlice from "../features/batch/batchDetailSlice";
import baleDetailSlice from "../features/bale/baleDetailSlice";
import saleDetailSlice from "../features/sale/saleDetailSlice";
import dashboard from "../features/dashboard/dashboard";
export const store=configureStore({
    reducer:{
        auth:authReducer,
        purchase:purchaseSlice,
        purchaseDetail:purchaseDetailSlice,
        supplier:supplierSlice,
        supplierDetail:supplierDetailSlice,
        batch:batchSlice,
        batchDetail:batchDetailSlice,
        bale:baleSlice,
        baleDetail:baleDetailSlice,
        sale:saleSlice,
        saleDetail:saleDetailSlice,
        dashboard:dashboard

    }
})