import React from 'react';
import './Sidebar.css';
import { Outlet, Link } from 'react-router-dom';
import { GiOpenBook, GiReturnArrow } from 'react-icons/gi';
import { BsFillPersonFill } from 'react-icons/bs';
import { SiHatenabookmark } from 'react-icons/si';
import { RiLogoutCircleFill } from 'react-icons/ri';
import { MdSpaceDashboard } from 'react-icons/md';
import { FaUserPlus } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className='sidebar-container'>
      <div className='sidebar'>
        <div className='logo-container'>
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/004/297/596/small/education-logo-open-book-dictionary-textbook-or-notebook-with-sunrice-icon-modern-emblem-idea-concept-design-for-business-libraries-schools-universities-educational-courses-vector.jpg"
            alt=""
            className='logo'
          />
          <hr />
        </div>
        <div className='links-container'>
          <Link to='dashboard' className='sidebar-link'>
            <p><span className='sidebar-icon'><MdSpaceDashboard /></span> Dashboard</p>
          </Link>
          <Link to='addbook' className='sidebar-link'>
            <p><span className='sidebar-icon'><GiOpenBook /></span> Add Book</p>
          </Link>
          <Link to='addstudent' className='sidebar-link'>
            <p><span className='sidebar-icon'><BsFillPersonFill /></span> Add Student</p>
          </Link>
          <Link to='issuebook' className='sidebar-link'>
            <p><span className='sidebar-icon'><SiHatenabookmark /></span> Issue Book</p>
          </Link>
          <Link to='returnbook' className='sidebar-link'>
            <p><span className='sidebar-icon'><GiReturnArrow /></span> Return Book</p>
          </Link>
          <Link to='adduser' className='sidebar-link'>
            <p><span className='sidebar-icon'><FaUserPlus /></span> Add User</p>
          </Link>
          {/* <p><span className='sidebar-icon'><RiLogoutCircleFill /></span> Log Out</p> */}
        </div>
      </div>
      <div className='outlet'>
        <div className='header'>
          <h5>Library Management System</h5>
        </div>
        <div className='outlet-background'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
