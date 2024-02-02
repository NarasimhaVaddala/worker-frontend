import React from 'react'
import {Link  , useLocation} from 'react-router-dom'

export default function Header() {
    let loc = useLocation()
  return (
    <>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark" style={{width:"100%"}}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Narasimha</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${loc.pathname==='/'?"active":""}` }  to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${loc.pathname==='/workers'?"active":""}` } to="/workers">Worker List</Link>
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>


    </>
  )
}
