import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
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

let token = localStorage.getItem('auth-token')
let adminname = localStorage.getItem('adminname')
const fetchAuth = async(suburl , body)=>{
    const data = await fetch(`http://localhost:3000/api/auth/${suburl}`,{
      headers:{
        "Content-type": "application/json",
      },
      method:"POST",
      body:JSON.stringify(body)
    }) 

    const res = await data.json();
    return res;
}

const fetchData = async (suburl, method, body) => {
  const data = await fetch(`http://localhost:3000/api/worker/${suburl}`, {
    headers: {
      "auth-token": token,
      "Content-type": "application/json",
    },
    method: method,
    body: JSON.stringify(body)

  })
  const res = await data.json();
  return res;
}

export default function App() {
  let date = ""
  const setdate = () => {
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
  const [attendance, setattendance] = useState([])
  const [paymentlog , setpaymentlog] = useState([])
  const [login , setlogin] = useState(false)
  
  const signup = async(name, email , mobile , password)=>{
    const data = await fetchAuth('signup' , {name , email ,  mobile , password})
    if (!data.success) {
      if (data.error=="User already exists") {
        alert("User Already Exists , Please Login");
      }
      else{
        alert("some error occured Please try again after sometime")
      }
    }
  
    if (data.success) {
        localStorage.setItem('auth-token' , data.token) 
        localStorage.setItem('adminname',data.name)
        location.href = "/"
    }
  }
  
  const log_in = async(mobile , password)=>{
    const data = await fetchAuth('login' , {mobile , password})
    if (!data.success) {
      if (data.error=="You Donot Have Account Please Sign Up") {
        let x = confirm("You Dont have an account! Do you want to create one")
        if (x) {
          location.href="/signup"
        }
      }
  
      if (data.error=="Please Enter correct details") {
        alert("Mobile or Password is Wrong")
      }
  
    }
  
    if (data.success) {
      localStorage.setItem('auth-token' , data.token)
      localStorage.setItem('adminname',data.name)
      location.href = "/" 
    
    }
  }
  
  const getWorkers = async () => {
    const res = await fetchData("fetchallworkers", "GET")
    setworker(res.workerlist)
    
  }

  useEffect(() => { 
    islogin()
    getWorkers()
    getpaymentLog()
  },
  [])


  const addWorker = async (name, mobile, designation, rate) => {
    const res = await fetchData("addnewworker", "POST", { name, mobile, designation, rate })
    setworker([...worker, res.worker])
    console.log(res.worker);

  }

  const deleteWorker = async (id) => {
    let x = confirm("Are You Sure Want To Delete This Worker and all of his Data!!")
    if (x) {
      const res = await fetchData("deleteworker", "DELETE", { id: id })
      getWorkers()
    }
  }


  const editWorker = async (id, name, mobile, designation, rate) => {
    if ((name.length < 3) || (mobile.length < 10 || mobile.length > 10) || rate.length < 1 || (designation === null || designation === "")) {
      alert("Please Enter a Valid Details")
    }
    else {
      const res = await fetchData("editworker", "PUT", { id, name, designation, mobile, rate })
      getWorkers()
      setworker([...worker])
    }
  }


  const takeattendance = async (id, time, adv) => {
    const res = await fetchData(`takeattendance/${id}`, "PUT", { time: parseFloat(time), advance: parseFloat(adv), date: date })
    getWorkers()
    setworker([...worker])

  }

  const getattendance = async (id) => {
    const result = await fetchData("getatt", "POST", { id })
    setattendance(result.attendance)
    getWorkers()
    setworker([...worker])

  }


  const getpaymentLog = async()=>{
    const res = await fetch(`http://localhost:3000/api/payment/paymenthistory` , {
      headers: {
        "auth-token": token,
        "Content-type": "application/json",
      },
      method: "GET",
      
    })

    const data = await res.json()
    setpaymentlog(data.paymentlog)
  }


  const setpaymentLog = async(name , id , mobile , paidamount , workedamount , advance , fromdate , todate)=>{
    const log = {name:name , id:id , mobile:mobile , date:date , paidamount:paidamount , workedamount:workedamount , advance:advance , fromdate:fromdate , todate:todate}
    const res = await fetch(`http://localhost:3000/api/payment/paymentlog` , {
      headers: {
        "auth-token": token,
        "Content-type": "application/json",
      },
      method: "POST",
      body:JSON.stringify(log)
    })
    const data = await res.json()
    
    if (data.success) {
      const delatt = await fetchData("deleteatt" , "POST" , {id})
      console.log(delatt);
      
    }
    getpaymentLog()
  }

  const islogin=()=>{
    let token = localStorage.getItem('auth-token')
    if (!token) {
      setlogin(false)
    }
    else{
      setlogin(true)
    }
  }
  

  return (
    <>
    {login && <Header adminname={adminname}/>}

      <Routes>
        <Route path='/' element={login?<Home />:<Login log_in={log_in}/>} />
        <Route path='/workers' element={login?<WorkersList worker={worker} delete={deleteWorker} editWorker={editWorker} />:<Login log_in={log_in}/>} />
        <Route path='/addworker' element={login?<Addworker addWorker={addWorker} />:<Login log_in={log_in}/>} />
        <Route path='/takeattendance/:id' element={login?<Att worker={worker} paymentlog={paymentlog} attendance={attendance} takeattendance={takeattendance} getattendance={getattendance} date={date}/>:<Login log_in={log_in}/>} />
        <Route path='/attendance_payment' element={login?<Att_Pay worker={worker} attendance={attendance} getattendance={getattendance}/>:<Login log_in={log_in}/>} />
        <Route path='/makepayment/:id' element={login?<Payment worker={worker} attendance={attendance} getattendance={getattendance}  setpaymentLog={setpaymentLog}  />:<Login log_in={log_in}/>} />
        <Route path='/paymentlog' element={login?<Payment_Log  paymentlog={paymentlog} />:<Login log_in={log_in}/>} />

        <Route path='/login' element={<Login log_in={log_in}/>} />
        <Route path='/signup' element={<Signup signup={signup}/>} />
      </Routes>



    </>
  )
}
