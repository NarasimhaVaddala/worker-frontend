import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Forgotpassword() {

    const [mail, setmail] = useState("")
    const [openOtp, setOpenOtp] = useState(false)
    const [otp, setOtp] = useState(0)
    const [password, setpassword] = useState("")
    const [pastype, setpastype] = useState("password")

    const navigate = useNavigate()
    const forgotpass = async () => 
    {
        if (!mail) 
        {
                alert("enter valid email")
        }
        else 
        {
                const data = await fetch(`http://localhost:3000/api/auth/forgotpassword`, 
                {
                    headers: {"Content-type": "application/json",},
                    method: "POST",
                    body: JSON.stringify({ email: mail })
                })

                const res = await data.json();
                console.log(res);
                if (res.success) 
                {
                    setOpenOtp(true)
                }
        }
    }

    const verifyOtp = async () => 
    {
        if (!otp || !password) 
        {
            alert("Enter Otp and Password")
        }
        else 
        {
            const data = await fetch(`http://localhost:3000/api/auth/verifyotp`, 
            {
                headers: {"Content-type": "application/json"},
                method: "POST",
                body: JSON.stringify({ email: mail, otp: otp, password: password })
            })
            const res = await data.json()
            console.log(res);
            if (res.success) 
            {
                alert('Password Changed Successfully')
                navigate('/login')
            }

            if (!res.success) {
                alert('Something Went wrong please try again')

            }


        }
    }


    return (

        <section className="vh-100" >
            <div className="container py-5 h-100 text-white" data-bs-theme="dark">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card" style={{ borderRadius: "1rem" }}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                        alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form>

                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <i className="fas fa-cubes fa-2x me-3" style={{ color: "#ff6219" }}></i>
                                                <span className="h3 fw-bold mb-0 text-white">Worker Management</span>
                                            </div>



                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px", color: "white" }} hidden={openOtp}>Enter Your Email Id for verification</h5>
                                            <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "1px", color: "white" }} hidden={!openOtp}>Enter Otp and New Password</h5>


                                            <div className="form-outline mb-4">
                                                <label className="form-label text-white" htmlFor="email">Email</label>
                                                <input disabled={openOtp} type="email" id="email" className="form-control form-control-lg" onChange={(e) => setmail(e.target.value)} />
                                            </div>

                                            {openOtp && <>

                                                <div className="form-outline mb-4">
                                                    <label className="form-label text-white" htmlFor="otp">Enter Otp</label>
                                                    <input type="number" id="otp" className="form-control form-control-lg" maxLength={4} onChange={(e) => setOtp(e.target.value)} />
                                                </div>



                                                <label className="form-label text-white" htmlFor="password">Enter New Password</label>
                                                <div className="d-flex mb-4">
                                                    <input type={pastype} id="password" className="form-control form-control-lg" onChange={(e) => setpassword(e.target.value)} />
                                                    <button onClick={() => { pastype == "password" ? setpastype("text") : setpastype("password") }} className="btn btn-dark mx-2" type='button'>{pastype == "password" ? <i className="fa-regular fa-eye"></i> : <i className="fa-regular fa-eye-slash"></i>}</button>
                                                </div>


                                                <button className="btn btn-light btn-lg btn-block" type='button' onClick={verifyOtp}>Change password</button>

                                            </>}
                                            <button hidden={openOtp} className="btn btn-light btn-lg btn-block" type='button' onClick={forgotpass}>Send OTP</button>

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