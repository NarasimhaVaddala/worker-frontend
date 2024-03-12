import React, { useState  , useContext} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import context from '../Context/context'

export default function Signup(props) {
  const value = useContext(context)
  const navigate = useNavigate()
  const [user , setuser] = useState({name:"", email:"", mobile:"" , password:""})

  const signup = async () => 
  {
    if (user.name=="" || user.email=="" || user.mobile=="" || user.password=="") 
    {
              alert("Please enter valid details")
    }
    else
    {
            const data = await value.fetchAuth('signup', { name:user.name, email:user.email, mobile:user.mobile, password:user.password })
            if (!data.success) 
            {
                        if (data.error == "User already exists") 
                        {
                                value.setlogin(false)
                                alert("User Already Exists , Please Login");
                        }
                        else 
                        {
                                alert("some error occured Please try again after sometime")
                        }
            }

            if (data.success) 
            {
                      localStorage.setItem('auth-token', data.token)
                      localStorage.setItem('adminname', data.name)
                      value.setlogin(true)
                      navigate('/')
            }
    }

}


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
                      <label className="form-label text-white" htmlFor="name">Name</label>
                      <input type="text" id="name" className="form-control form-control-lg" onChange={(e)=>{setuser({...user , name:e.target.value})  }}/>
                    </div>
  
                    <div className="form-outline mb-3">
                      <label className="form-label text-white" htmlFor="email">Email address</label>
                      <input type="email" id="email" className="form-control form-control-lg" onChange={(e)=>{setuser({...user , email:e.target.value})}}/>
                    </div>
  
                    <div className="form-outline mb-3">
                      <label className="form-label text-white" htmlFor="mobile">Mobile</label>
                      <input type="text" id="mobile" className="form-control form-control-lg" onChange={(e)=>{setuser({...user , mobile:e.target.value})}}/>
                    </div>

                    <div className="form-outline mb-3">
                      <label className="form-label text-white" htmlFor="pass">Password</label>
                      <input type="password" id="pass" className="form-control form-control-lg" onChange={(e)=>{setuser({...user , password:e.target.value})}}/>
                    </div>
  
                    <div className="pt-1 mb-3">
                      <button className="btn btn-light btn-lg btn-block" type="button" onClick={signup}>Register</button>
                    </div>
  
                    <Link className="small text-muted" to="/forgotpassword">Forgot password?</Link>
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
