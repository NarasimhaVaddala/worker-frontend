import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import context from '../Context/context'

export default function Signup(props) {
  const value = useContext(context)
  const navigate = useNavigate()
  const [user, setuser] = useState({ name: "", email: "", mobile: "", password: "" })
  const [otp, setotp] = useState(0)

  const [pastype, setpastype] = useState("password")
  const [openOtp, setOpenOtp] = useState(false)


  const forgotpass = async (email) => {

    value.setloading(true)
    const data = await fetch(`https://worker-backend-y30n.onrender.com/api/auth/justemail`,
      {
        headers: { "Content-type": "application/json", },
        method: "POST",
        body: JSON.stringify({ email: email })
      })

    const res = await data.json();
    value.setloading(false)
    if (res.success) {
      setOpenOtp(true)
    }

    return res;

  }

  const verifyOtp = async (email, otp) => {
    if (!otp || !email) {
      alert("Enter Otp and Email")
    }
    else {
      value.setloading(false)
      const data = await fetch(`https://worker-backend-y30n.onrender.com/api/auth/justverify`,
        {
          headers: { "Content-type": "application/json" },
          method: "POST",
          body: JSON.stringify({ email: email, otp: otp })
        })
      const res = await data.json()
      value.setloading(false)


      return res;


    }
  }


  const sendotp = async () => {
    if (user.name == "" || user.email == "" || user.mobile == "" || user.password == "") {
      value.showAlert("warning", "Please enter valid details")
    }
    else {
      value.setloading(true)
      let otpsend = await forgotpass(user.email)
      value.setloading(false)
      if (!otpsend.success) {
        if (otpsend.error == "email already exists") {
          value.showAlert("warning", "Email already exists please login")
          return navigate('/login')
        }
      }

      if (otpsend.success) {
        if (!otp) {
          setOpenOtp(true)
          value.showAlert("primary", "Enter Otp")

        }

      }
}

  }


  const signup = async()=>{
   
    let otpverify = await verifyOtp(user.email, otp)
 
      if (!otpverify.success) 
      {
        value.showAlert("danger", "Please enter valid Otp")
        return;
      }

      if (otpverify.success) {
        
        const data = await value.fetchAuth('signup', { name: user.name, email: user.email, mobile: user.mobile, password: user.password })
        
        if (!data.success) {
          if (data.error == "User already exists") {
            value.setlogin(false)
            value.showAlert("warning", "User Already Exists , Please Login");

          }
          else {
            value.setlogin(false)
            value.showAlert("danger", "Please enter valid email or try again after sometime")
          }
        }

        if (data.success) {
          localStorage.setItem('auth-token', data.token)
          localStorage.setItem('adminname', data.name)
          value.setlogin(true)
          value.showAlert("success", "Login Successful");
          navigate('/')
        }
      }

    

  }


  return (

    <section className="vh-70" >
      <div className="container py-5 h-100 text-white" data-bs-theme="dark">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img src="https://wallpapercave.com/wp/wp10688314.jpg"
                    alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem", }} />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">

                    <form>

                      <div className="d-flex align-items-center mb-3 pb-1">
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                        <span className="h3 fw-bold mb-0 text-white">Worker Management</span>
                      </div>

                      <h5 className="fw-normal mb-2 pb-2" style={{ letterSpacing: "1px", color: "white" }}>Sign Up for New Account</h5>

                      <div className="form-outline mb-3">
                        <label className="form-label text-white" htmlFor="name">Name</label>
                        <input type="text" id="name" className="form-control form-control-lg" onChange={(e) => { setuser({ ...user, name: e.target.value }) }} />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label text-white" htmlFor="email">Email address</label>
                        <input type="email" id="email" className="form-control form-control-lg" onChange={(e) => { setuser({ ...user, email: e.target.value }) }} />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label text-white" htmlFor="mobile">Mobile</label>
                        <input type="number" maxLength={10} id="mobile" className="form-control form-control-lg" onChange={(e) => { setuser({ ...user, mobile: e.target.value }) }} />
                      </div>

                      <label className="form-label text-white" htmlFor="password">Password</label>
                      <div className="form-outline d-flex mb-4" style={{ position: 'relative' }}>
                        <input
                          onChange={(e) => { setuser({ ...user, password: e.target.value }) }}
                          type={pastype}
                          id="password"
                          className="form-control form-control-lg"
                        />
                        <button
                          onClick={() => { pastype === "password" ? setpastype("text") : setpastype("password") }}
                          className="btn btn-dark mx-2"
                          type='button'
                          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
                        >
                          {pastype === "password" ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}
                        </button>
                      </div>


                      {openOtp && <><div className="form-outline mb-3">
                        <label className="form-label text-white" htmlFor="otp">Mobile</label>
                        <input type="number" id="otp" className="form-control form-control-lg" onChange={(e) => { setotp(e.target.value) }} />
                      </div>

                        <div className="pt-1 mb-3">
                          <button className="btn btn-light btn-lg btn-block" type="button" onClick={signup}>Register</button>
                        </div>

                      </>
                      }

                      {!openOtp && <div className="pt-1 mb-3">
                        <button className="btn btn-light btn-lg btn-block" type="button" onClick={sendotp}>Register</button>
                      </div>}

                      <Link className="small text-muted" to="/forgotpassword">Forgot password?</Link>
                      <p className="mb-3 pb-lg-2 text-white" >Already have an account?
                        <Link to="/login"
                          style={{ color: "#393f81" }}> Login</Link></p>
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
