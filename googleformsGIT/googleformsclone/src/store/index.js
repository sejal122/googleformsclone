import { configureStore } from "@reduxjs/toolkit";
import formSlice from "./form-Slice";
const store =configureStore({
    reducer:{
        ques:formSlice.reducer
    }
})

export default store;