import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import "../Components/NavBar.css";

const Navbar = () => {
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const [lib, setlib] = useState(false);
    const [program, setprogram] = useState(false);

    const programToggle = () => {
        setprogram(!program);
    };

    const LibToggle = () => {
        setlib(!lib);
    };

    const resourceshandleToggle = () => {
        setResourcesOpen(!resourcesOpen);
    };

    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary position-fixed-top">
                <div className="container">
                    <a className="navbar-brand" href="#">   </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav gap-1">
                            <Link to="/" className="nav-link m-1" >Home</Link>
                            <Link to="dashboard" className="nav-link m-1" >Dashboard</Link>
                            <Link to="/lib" className="a dropdown nav-link" onMouseEnter={e => setlib(true)} onMouseLeave={e => setlib(false)}>
                                <div
                                    className="dropdown-toggle custom-dropdown-toggle"
                                    onClick={LibToggle}
                                >
                                    Library
                                </div>
                                <ul className={`dropdown-menu  ${lib ? 'show' : ''}`}>
                                    <li><a className="dropdown-item" href="#">Library</a></li>
                                    <li><a className="dropdown-item" href="#">Solution Overviews</a></li>
                                    <li><a className="dropdown-item" href="#">Videos</a></li>
                                    <li><a className="dropdown-item" href="#">Blogs</a></li>
                                    <li><a className="dropdown-item" href="#">Case Studies</a></li>
                                    <li><a className="dropdown-item" href="#">Webinars</a></li>
                                    <li><a className="dropdown-item" href="#">OpenRAN</a></li>
                                </ul>
                            </Link>

                            <Link to="/stepper" className="a dropdown nav-link" onMouseEnter={e => setResourcesOpen(true)} onMouseLeave={e => setResourcesOpen(false)}>
                                <div
                                    className="dropdown-toggle custom-dropdown-toggle"
                                    onClick={resourceshandleToggle}
                                >
                                    Admission
                                </div>
                                <ul className={`dropdown-menu  ${resourcesOpen ? 'show' : ''}`}>
                                    <li><a className="dropdown-item" href="#">Admission-Form</a></li>
                                    <li><a className="dropdown-item" href="#">Fee-Form</a></li>
                                    <li><a className="dropdown-item" href="#">Videos</a></li>
                                    <li><a className="dropdown-item" href="#">Application-Form</a></li>
                                    <li><a className="dropdown-item" href="#">Case Studies</a></li>
                                    <li><a className="dropdown-item" href="#">Webinars</a></li>
                                    <li><a className="dropdown-item" href="#">OpenRAN</a></li>
                                </ul>
                            </Link>

                            <Link to="/stepper" className="a dropdown nav-link" onMouseEnter={e => setprogram(true)} onMouseLeave={e => setprogram(false)}>
                                <div
                                    className="dropdown-toggle custom-dropdown-toggle"
                                    onClick={programToggle}
                                >
                                    program
                                </div>
                                <ul className={`dropdown-menu  ${program ? 'show' : ''}`}>
                                    <li><a className="dropdown-item" href="#">Exhibition</a></li>
                                    <li><a className="dropdown-item" href="#">Gathering</a></li>
                                    <li><a className="dropdown-item" href="#">Teacher-Day</a></li>
                                    <li><a className="dropdown-item" href="#">Program-study</a></li>
                                    <li><a className="dropdown-item" href="#">Case Studies</a></li>
                                    <li><a className="dropdown-item" href="#">Webinars</a></li>
                                    <li><a className="dropdown-item" href="#">OpenRAN</a></li>
                                </ul>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
