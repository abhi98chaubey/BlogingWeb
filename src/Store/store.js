import { ConfigureStore } from "@reduxjs/toolkit";
import authslice from "./authslice";


const store = new ConfigureStore({
   reducer:{
       auth:authslice,
   }
});


export default store;