import React , {useContext} from 'react'
import { Link, useLocation , useNavigate } from 'react-router-dom'
import context from '../Context/context'

export default function Header(props) {
  let loc = useLocation()
  const navigate = useNavigate()
  const value = useContext(context)
  const logout = () => {
    let x = confirm("Are You sure want to logout ?")
    if (x) {
      localStorage.removeItem('auth-token' )
      localStorage.removeItem('adminname' )
      value.islogin()
      navigate("/login")
    }else{
      console.log("his");
    }
    
  }
  return (
    <>

      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark" style={{ width: "100%" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">{props.adminname}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${loc.pathname === '/' ? "active" : ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${loc.pathname === '/workers' ? "active" : ""}`} to="/workers">Worker List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" onClick={logout} >SignOut</Link>
              </li>

            </ul>

          </div>
        </div>
      </nav>


    </>
  )
}
