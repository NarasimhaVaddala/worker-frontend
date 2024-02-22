import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    
    <section className="vh-100" >
    <div className="container py-5 h-100 text-white" data-bs-theme="dark">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col col-xl-10">
          <div className="card" style={{borderRadius: "1rem"}}>
            <div className="row g-0">
              <div className="col-md-6 col-lg-5 d-none d-md-block">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                  alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
              </div>
              <div className="col-md-6 col-lg-7 d-flex align-items-center">
                <div className="card-body p-4 p-lg-5 text-black">
  
                  <form>
  
                    <div className="d-flex align-items-center mb-3 pb-1">
                      <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
                      <span className="h3 fw-bold mb-0 text-white">Worker Management</span>
                    </div>
  
                    <h5 className="fw-normal mb-2 pb-2" style={{letterSpacing: "1px" , color:"white"}}>Sign Up for New Account</h5>
  
                    <div className="form-outline mb-3">
                      <input type="email" id="form2Example17" className="form-control form-control-lg" />
                      <label className="form-label text-white" htmlFor="form2Example17">Email address</label>
                    </div>
  
                    <div className="form-outline mb-3">
                      <input type="text" id="form2Example27" className="form-control form-control-lg" />
                      <label className="form-label text-white" htmlFor="form2Example27">Mobile</label>
                    </div>

                    <div className="form-outline mb-3">
                      <input type="password" id="form2Example27" className="form-control form-control-lg" />
                      <label className="form-label text-white" htmlFor="form2Example27">Password</label>
                    </div>
  
                    <div className="pt-1 mb-3">
                      <button className="btn btn-light btn-lg btn-block" type="button">Login</button>
                    </div>
  
                    <a className="small text-muted" href="#!">Forgot password?</a>
                    <p className="mb-3 pb-lg-2 text-white" >Already have an account?
                     <Link to="/login"
                        style={{color: "#393f81"}}> Login</Link></p>
                  </form>
  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
