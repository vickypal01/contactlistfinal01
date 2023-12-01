import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {newContact } from "../../../redux/ContextReducer";
import { useDispatch, useSelector } from "react-redux";
import { constactSelector } from "../../../redux/ContextReducer";
const AddContact = ()=>{
    const {contacts} = useSelector(constactSelector);
    const navigate = useNavigate();

    const addUser = (e)=>{
        e.preventDefault();
         const name = e.target[0].value;
         const phone = e.target[1].value;
         const email = e.target[2].value;
         const id = contacts.length+1;

         const data = {
            id: id,
            name: name,
            email: email,
            phone: phone,
         }
         dispatch(newContact({data:data}));
         navigate('/contacts/List');
    }

    const dispatch = useDispatch();
    return(
        <>
           <section className="add-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold">Create Contact</p>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <form onSubmit={addUser}>
                                    <div className="mb-2">
                                        <input type="text" className="form-control" placeholder="Name"/>
                                    </div>
                                    <div className="mb-2">
                                        <input type="number" className="form-control" placeholder="Mobile No."/>
                                    </div>
                                    <div className="mb-2">
                                        <input type="email" className="form-control" placeholder="Email"/>
                                    </div>
                                    <div className="mb-2">
                                        <input type="submit" className="btn btn-success" value="create"/>
                                        <Link to={"/contacts/list"} className="btn btn-dark ms-2">Cancel</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
           </section>
        </>
    )
}
export default AddContact;