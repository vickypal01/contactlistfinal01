import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const INITIALSTATE = {
       contacts : [],
       isLoading : false,
       error : null,
}

const contactSlice = createSlice({
      name : "contacts",
      initialState : INITIALSTATE,
      reducers : {
           fetchStart: (state,action)=>{
                  state.isLoading = true
           },
           fetchSuccess : (state,action)=>{
                  state.isLoading = false;
                  state.contacts = action.payload;
           },
           fetchError : (state,action)=>{
                 state.isLoading = false;
                 state.error = "failed to fetch contact";
           },
           DeleteContact: (state,action)=>{
            const filteredContacts = state.contacts.filter((user)=>user.id!==action.payload && user)
            state.contacts = filteredContacts
           },
           SearchContact: (state,action)=>{
            const filteredContacts = state.contacts.filter((user)=>user.name.toLowerCase().includes(action.payload.toLowerCase()))
            state.contacts = filteredContacts
           },
           NewUser: (state,action)=>{
                 state.contacts = [...state.contacts,action.payload];
           },
           EditUser: (state,action)=>{
              const updateContact = state.contacts.map((user) =>  
              user.id ===action.payload.id ? action.payload: user 
          ) 
          state.contacts = updateContact
           },
      }
})
           
export const updateUser = createAsyncThunk("user/edit", async ({data},thunkAPI)=>{
       try{
              console.log(data);
              
           const response = await fetch(`https://jsonplaceholder.typicode.com/users/${data.id}`, {
           method: "PUT",
           headers:{
               "content-type":"application/json"
           },
       });
       if (!response.ok) {
              // Handle the case where the request was not successful
              const errorData = await response.json();
              throw new Error(errorData.message);
            }
       // Dispatch a successful action, you can use payload as necessary
       thunkAPI.dispatch(EditUser(data));

       }catch(error){
               // Dispatch an error action in case of an error
              thunkAPI.dispatch(fetchError());
       }
})

export const deleteContact = createAsyncThunk("user/delete", async ({id},thunkAPI)=>{
       try{
           const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
           method: "DELETE",
           headers:{
               "content-type":"application/json"
           },
       });
       if (!response.ok) {
              // Handle the case where the request was not successful
              const errorData = await response.json();
              throw new Error(errorData.message);
            }
       // Dispatch a successful action, you can use payload as necessary
       thunkAPI.dispatch(DeleteContact(id));
       }catch(error){
              // Dispatch an error action in case of an error
              thunkAPI.dispatch(fetchError());
       }
   })

   export const newContact = createAsyncThunk("user/add",async({data},thunkAPI)=>{
       try{
           const response = await fetch(`https://jsonplaceholder.typicode.com/users`, {
           method: "POST",
           headers:{
               "content-type":"application/json"
           },
       });
       if (!response.ok) {
              // Handle the case where the request was not successful
              const errorData = await response.json();
              throw new Error(errorData.message);
            }
       // Dispatch a successful action, you can use payload as necessary
       thunkAPI.dispatch(NewUser(data));
       }catch(error){
              // Dispatch an error action in case of an error
              thunkAPI.dispatch(fetchError());
       }
   })

export const getContacts = createAsyncThunk("contacts/getContacts", async(_,thunkAPI)=>{
          try{
              const res = await fetch("https://jsonplaceholder.typicode.com/users");
              if (!res.ok) {
                throw new Error("Failed to fetch contact");
              }
              const data = await res.json();
              thunkAPI.dispatch(fetchSuccess(data));
          }
          catch(error){
                 thunkAPI.dispatch(fetchError());
          }
}); 



export const contactReducer = contactSlice.reducer;
export const {fetchStart,fetchSuccess,fetchError,DeleteContact,SearchContact,NewUser,EditUser} = contactSlice.actions;
export const constactSelector = (state) => state.contactReducer;