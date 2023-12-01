import React from "react";
import { Link, useParams } from "react-router-dom";
import userImg from "../../../Images/userImg.png";
import { useSelector } from "react-redux";
import { constactSelector } from "../../../redux/ContextReducer";



const ViewContact = ()=>{
    const {contactId} = useParams();
    const userId = parseInt(contactId);
    const {contacts} = useSelector(constactSelector);

    const user = contacts.find(user => user.id === userId);
    return(
        <>
           <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                        </div>
                    </div>
                </div>
           </section>

           <section className="view-contact mt-3">
               <div className="container">
                   <div className="row">
                        <div className="col-md-4">
                            <img src={userImg} alt="userImg" className="contact-img"/>
                        </div>
                        <div className="col-md-8">
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
                   </div>
                   <div className="row">
                      <div className="col">
                           <Link to={'/contacts/List'} className="btn btn-warning">Back</Link>
                      </div>
                   </div>
               </div>
           </section>
        </>
    )
}
export default ViewContact;