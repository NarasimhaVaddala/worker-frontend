import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import context from '../Context/context'

export default function Header(props) {
  let loc = useLocation()
  const navigate = useNavigate()
  const value = useContext(context)
  const logout = () => {
    let x = confirm("Are You sure want to logout ?")
    if (x) {
      localStorage.removeItem('auth-token')
      localStorage.removeItem('adminname')
      value.islogin()
      navigate("/login")
    }
    else {
      console.log("");
    }

  }
  return (
    <>

      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark " data-bs-theme="dark" style={{ width: "100%" }}>
        <div className="container-fluid ">
          <Link className="navbar-brand" to="/">
            <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent ">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${loc.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${loc.pathname === '/workers' ? "active" : ""}`} to="/workers">Worker List</Link>
              </li>
              <li className="nav-item">
              </li>



              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {props.adminname} <i className="fa-regular fa-user"></i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li> <Link className="dropdown-item" to='/adminprofile' style={{ textDecoration: "none", color: "white" }}>Edit Details</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" onClick={logout} >SignOut</Link></li>
                </ul>
              </li>
            </ul>


          </div>
        </div>

      </nav> */}

<nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
  <div className="container-fluid">
    {/* Logo on the left */}
    <Link className="navbar-brand d-flex align-items-center" to="/">
      <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i> Worker Management
    </Link>
    
    {/* Navbar toggler for mobile */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    {/* Navbar items on the right */}
    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${loc.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${loc.pathname === '/workers' ? "active" : ""}`} to="/workers">Worker List</Link>
        </li>
        {/* Add more nav items here */}
        
        {/* Dropdown for admin */}
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             <i className="fa-regular fa-user"></i> {props.adminname}
          </a>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to='/adminprofile' style={{ textDecoration: "none", color: "white" }}>Account Details</Link></li>
            <li><Link className="dropdown-item" to='/about' style={{ textDecoration: "none", color: "white" }}>About Us</Link></li>
            <li><Link className="dropdown-item" to='/contact' style={{ textDecoration: "none", color: "white" }}>Contact Us</Link></li>
            <li><hr className="dropdown-divider" /></li>
            <li><Link className="dropdown-item" onClick={logout}>SignOut</Link></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>




    </>
  )
}
