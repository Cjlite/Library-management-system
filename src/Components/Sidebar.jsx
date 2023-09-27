import React from 'react'
import './Sidebar.css'
import { Outlet, Link } from 'react-router-dom'
import { GiOpenBook, GiReturnArrow } from 'react-icons/gi'
import { BsFillPersonFill } from 'react-icons/bs'
import { SiHatenabookmark } from 'react-icons/si'
import { RiLogoutCircleFill } from 'react-icons/ri'
import { MdSpaceDashboard } from 'react-icons/md'
import { FaUserPlus } from 'react-icons/fa'

export default function Sidebar() {
  return (
    <div className='container-fluid'>

      <div className="row">
        <div className="col-md-2 text-white overflow-auto" style={{ background: "rgb(7, 36, 62)", boxShadow: "0px 0px 1px white", height: "100lvh" }}>
          <img src="https://static.vecteezy.com/system/resources/thumbnails/004/297/596/small/education-logo-open-book-dictionary-textbook-or-notebook-with-sunrice-icon-modern-emblem-idea-concept-design-for-business-libraries-schools-universities-educational-courses-vector.jpg" alt="" className='mt-3 ms-4' width={150} />
          <hr />
          <div className="row mt-5 ms-2">
            <Link to='dashboard' style={{ color: "white", textDecoration: "none" }}>  <p><span><MdSpaceDashboard /></span> Dashboard</p></Link>
            <Link to='addbook' style={{ color: "white", textDecoration: "none" }}> <p><span><GiOpenBook /></span> Add Book</p></Link>
            <Link to='addstudent' style={{ color: "white", textDecoration: "none" }}><p><span><BsFillPersonFill /></span> Add Student</p></Link>
            <Link to='issuebook' style={{ color: "white", textDecoration: "none" }}> <p><span><SiHatenabookmark /></span> Issue Book</p></Link>
            <Link to='returnbook' style={{ color: "white", textDecoration: "none" }}>    <p><span><GiReturnArrow /></span> Return Book</p></Link>
            <Link to='adduser' style={{ color: "white", textDecoration: "none" }}>  <p><span><FaUserPlus /></span> Add User</p></Link>
            <p><span><RiLogoutCircleFill /></span> Log Out</p>
          </div>
        </div>
        <div className="col-md-10">
          <div className="row py-2" style={{ background: "rgb(7, 36, 62)" }}>
            <h5 className='text-center text-white'>Library Management System</h5>
          </div>
          <div className="row outletbackground overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
