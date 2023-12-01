import { configureStore } from "@reduxjs/toolkit";
import { contactReducer } from "./ContextReducer";

export const store = configureStore({
    reducer:{
        contactReducer
    }
})