import React, { useState , useContext} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import context from '../Context/context'




export default function Login() {

  const value = useContext(context)
  const [user , setuser] = useState({mobile:"" , password:""})
  
  const [pastype, setpastype] = useState("password")
  const navigate = useNavigate()

  const log_in = async () => 
  {
        if (user.mobile.length < 10 || user.mobile.length > 10 || user.password=="") 
        {
          alert("Enter Valid Details")
        }
        else
        {
                  const data = await value.fetchAuth('login', { mobile:user.mobile, password:user.password })
                  if (!data.success) 
                  {
                                if (data.error == "You Donot Have Account Please Sign Up") 
                                {
                                          let x = confirm("You Dont have an account! Do you want to create one")
                                          if (x) 
                                          {
                                            value.setlogin(false)
                                            navigate('/signup')
                                          }
                                }
                            
                                if (data.error == "Please Enter correct details") 
                                {
                                          value.setlogin(false)
                                          value.showAlert("danger" ,"Mobile or Password is Wrong")
                                }
                            
                  }
                
                  if (data.success)
                  {
                                localStorage.setItem('auth-token', data.token)
                                localStorage.setItem('adminname', data.name)
                                value.setlogin(true)
                                value.showAlert("success" , "Login Successful");
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

                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px" , color:"white"}}>Sign into your account</h5>

                  <div className="form-outline mb-4">
                    <label className="form-label text-white" htmlFor="mobile">Mobile</label>
                    <input onChange={(e)=>{setuser({...user , mobile:e.target.value});console.log(user);}} type="text" id="mobile" className="form-control form-control-lg" />
                  </div>

                    <label className="form-label text-white" htmlFor="password">Password</label>
                  <div className="form-outline d-flex mb-4">
                    <input onChange={(e)=>{setuser({...user , password:e.target.value})}} type={pastype} id="password" className="form-control form-control-lg" />
                    <button onClick={() => { pastype == "password" ? setpastype("text") : setpastype("password") }} className="btn btn-dark mx-2" type='button'>{pastype == "password" ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</button>
                    
                  </div>

                  <div className="pt-1 mb-4">
                    <button onClick={log_in} className="btn btn-light btn-lg btn-block" type="button">Login</button>
                  </div>

                  <Link className="small text-muted" to="/forgotpassword">Forgot password?</Link>
                    <p className="mb-5 pb-lg-2 text-white" >Don't have an account?
                   <Link to="/signup"
                      style={{color: "#393f81"}}> Register here</Link></p>
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
