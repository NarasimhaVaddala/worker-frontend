import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import WorkersList from './components/WorkersList'
import Addworker from './components/Addworker'
import Att from './components/Att'
import Payment from './components/Payment'
import Att_Pay from './components/Att_Pay'
import Payment_Log from './components/Payment_Log'
import Login from './components/Login'
import Signup from './components/Signup'
import Context from './Context/context'
import Forgotpassword from './components/Forgotpassword'
import FloatingButton from './components/FloatingButton'
import Alert from './components/Alert'
import Spinner from './components/Spinner'
import AdminProfile from './components/AdminProfile'
import About from './components/About'
import ContactPage from './components/ContactPage'

let token = localStorage.getItem('auth-token')
let adminname = localStorage.getItem('adminname')
const fetchAuth = async (suburl, body) => {
  const data = await fetch(`https://worker-backend-y30n.onrender.com/api/auth/${suburl}`, 
  {
    headers: {"Content-type": "application/json", "auth-token": token},
    method: "POST",
    body: JSON.stringify(body)
  })

  const res = await data.json();
  return res;
}

const fetchData = async (suburl, method, body) => {
  const data = await fetch(`https://worker-backend-y30n.onrender.com/api/worker/${suburl}`, 
  {
    headers: 
    {
      "auth-token": token,
      "Content-type": "application/json",
    },
    method: method,
    body: JSON.stringify(body)

  })
  const res = await data.json();
  return res;
}




// RFC START HERE



export default function App() {
  const navigate = useNavigate()
  let date = ""

  const setdate = () => 
  {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        date = dd + '/' + mm + '/' + yyyy;
  }
  setdate()

  const [worker, setworker] = useState([])
  const [paymentlog, setpaymentlog] = useState([])
  const [login, setlogin] = useState(false)
  const [alert , setalert] = useState(null)
  const [loading , setloading] = useState(false)

 
  
  const getWorkers = async () => 
  {
    const res = await fetchData("fetchallworkers", "GET")
    setworker(res.workerlist)
  }

  useEffect(() => 
  {
      token = localStorage.getItem('auth-token')
      adminname = localStorage.getItem('adminname')

      if (token) 
      {
        islogin()
        getWorkers()
        getpaymentLog()
      }
  },[login ])


  const addWorker = async (name, mobile, designation, rate) => 
  {
    setloading(true)
    const res = await fetchData("addnewworker", "POST", { name, mobile, designation, rate })
    setworker([...worker, res.worker])
    setloading(false)
    
    showAlert("success" , "Worker added Successfully")
   
  }

  const deleteWorker = async (id) => {
    let x = confirm("Are You Sure Want To Delete This Worker and all of his Data!!")
    if (x) 
    {
        setloading(true)
        const res = await fetchData("deleteworker", "DELETE", { id: id })
        setloading(false)
        getWorkers()
        showAlert('warning' , "Worker Deleted Successfully")
    }
  }


  const editWorker = async (id, name, mobile, designation, rate) => {
      if ((name.length < 3) || (mobile.length < 10 || mobile.length > 10) || rate.length < 1 || (designation === null || designation === "")) 
      {
        alert("Please Enter a Valid Details")
      }
      else 
      {
        setloading(true)
        const res = await fetchData("editworker", "PUT", { id, name, designation, mobile, rate })
        setloading(false)
        getWorkers()
        setworker([...worker])
      }
  }




  const getpaymentLog = async () => {
    setloading(true)
    const res = await fetch(`https://worker-backend-y30n.onrender.com/api/payment/paymenthistory`,
    {
        headers: 
        {
          "auth-token": token,
          "Content-type": "application/json",
        },
        method: "GET",
    })

      const data = await res.json()
      setpaymentlog(data.paymentlog)
      setloading(false)
  }


  const setpaymentLog = async (name, id, mobile, paidamount, workedamount, advance, fromdate, todate) => 
  {
    const log = { name: name, id: id, mobile: mobile, date: date, paidamount: paidamount, workedamount: workedamount, advance: advance, fromdate: fromdate, todate: todate }
    setloading(true)
    const res = await fetch(`https://worker-backend-y30n.onrender.com/api/payment/paymentlog`, 
    {
        headers: 
        {
          "auth-token": token,
          "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(log)
    })
    const data = await res.json()
    setloading(false)
    if (data.success) 
    {
      const delatt = await fetchData("deleteatt", "POST", { id })
      
    }
    getpaymentLog()
  }

  const islogin = () => {
      let token = localStorage.getItem('auth-token')
      if (!token || token == "null" || token == "") 
      {
          setlogin(false)
      }
      else {
          setlogin(true)
      }
  }

  const showAlert = (type , message)=>{
    setalert({type , message})
    setTimeout(() => {
      setalert(null)
    }, 1500);
  }
  return (
    <>
      <Context.Provider value={{loading , setloading , date, worker, paymentlog,fetchAuth ,islogin,  editWorker, deleteWorker, login , setlogin, getWorkers , fetchData , showAlert }}>
        {login && <Header adminname={adminname} />}

        <Alert alert={alert}/>

        {
          loading && <Spinner/>
        }

       <Routes >
          <Route path='/' element={login ? <Home /> : <Login />} />

          <Route path='/workers' element={login ? <WorkersList /> : <Login />} />

          <Route path='/addworker' element={login ? <Addworker addWorker={addWorker} /> : <Login />} />

          <Route path='/takeattendance/:id' element={login ? <Att /> : <Login />} />

          <Route path='/attendance_payment' element={login ? <Att_Pay /> : <Login />} />

          <Route path='/makepayment/:id' element={login ? <Payment worker={worker} setpaymentLog={setpaymentLog} /> : <Login />} />

          <Route path='/paymentlog' element={login ? <Payment_Log paymentlog={paymentlog} /> : <Login />} />

          <Route path='/adminprofile' element={login ? <AdminProfile/> : <Login />} />

          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<ContactPage/>} />
          

          <Route path='/signup' element={<Signup />} />
          <Route path='/forgotpassword' element={<Forgotpassword/>} />

        </Routes>


      </Context.Provider>
      {login && <FloatingButton/>}


    </>
  )
}


