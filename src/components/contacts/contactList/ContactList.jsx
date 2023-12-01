import React from "react";
import { Link } from "react-router-dom";
import userImg from "../../../Images/userImg.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {SearchContact, constactSelector, deleteContact, fetchStart, getContacts } from "../../../redux/ContextReducer";

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(fetchStart());
      dispatch(getContacts());
  },[dispatch])
  const {contacts} = useSelector(constactSelector);

  const searchContact = (name)=>{
        dispatch(SearchContact(name));
  }
  return (
    <>

    {/* navbar of contact list  */}
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  Contact Manager &nbsp;
                  <Link to={"/contacts/add"} className="btn btn-primary">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
              </div>
              {/* search the names of contact  */}
              <div className="row">
                <div className="col md-6">
                  <form className="row">
                    <div className="col">
                      <div className="mb-2">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="search names"
                          onChange={(e)=>searchContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="mb-2">
                        <input
                          type="submit"
                          className="btn btn-outline-dark"
                          value="search"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

         {/* card of contact  */}
      <section className="contact-list">
          <div className="container">
            <div className="row">
                <div className="d-flex flex-wrap" style={{gap:"2.5%"}}> 
                {contacts.map((user,i)=>(
                       <div key={i} className="card" style={{width:"48%", marginTop:"2.5%", padding:"1.5%"}}>
                       <div className="card-body">
                          <div className="row align-items-center d-flex justify-content-around">
                          <div className="col-md-4">
                               <img src={userImg} alt="userImg" className="contact-img"/>
                           </div>
                           <div className="col-md-7">
                                <ul className="list-group">
                                   <li className="list-group-item list-group-item-action">
                                       Name : <span className="fw-bold">{user.name}</span>
                                   </li>
                                   <li className="list-group-item list-group-item-action">
                                       Mobile No. : <span className="fw-bold">{user.phone}</span>
                                   </li>
                                   <li className="list-group-item list-group-item-action">
                                       Email : <span className="fw-bold">{user.email}</span>
                                   </li>
                                </ul>
                           </div>
                           <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link to={`/contacts/view/${user.id}`} className="btn btn-warning my-1">
                                      <i className="fa fa-eye"/>
                                </Link>
                                <Link to={`/contacts/edit/${user.id}`} className="btn btn-primary my-1">
                                      <i className="fa fa-pen"/>
                                </Link>
                                <button onClick={()=>dispatch(deleteContact({id: user.id}))} className="btn btn-danger my-1">
                                      <i className="fa fa-trash"/>
                                </button>
                           </div>
                          </div>
                       </div>
                    </div>
                ))} 
                </div>
            </div>
          </div>
      </section>
    </>
  );
};
export default ContactList;
