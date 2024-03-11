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

let token = localStorage.getItem('auth-token')
let adminname = localStorage.getItem('adminname')
const fetchAuth = async (suburl, body) => {
  const data = await fetch(`http://localhost:3000/api/auth/${suburl}`, {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(body)
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




// RFC START HERE



export default function App() {
  const navigate = useNavigate()
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
  const [paymentlog, setpaymentlog] = useState([])
  const [login, setlogin] = useState(false)

 
  
  const getWorkers = async () => {
    const res = await fetchData("fetchallworkers", "GET")
    setworker(res.workerlist)

  }

  useEffect(() => {

    token = localStorage.getItem('auth-token')
    adminname = localStorage.getItem('adminname')
    if (token) {
      islogin()
      getWorkers()
      getpaymentLog()
    }


  },
    [login])


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




  const getpaymentLog = async () => {
    const res = await fetch(`http://localhost:3000/api/payment/paymenthistory`, {
      headers: {
        "auth-token": token,
        "Content-type": "application/json",
      },
      method: "GET",

    })

    const data = await res.json()
    setpaymentlog(data.paymentlog)
  }


  const setpaymentLog = async (name, id, mobile, paidamount, workedamount, advance, fromdate, todate) => {
    const log = { name: name, id: id, mobile: mobile, date: date, paidamount: paidamount, workedamount: workedamount, advance: advance, fromdate: fromdate, todate: todate }
    const res = await fetch(`http://localhost:3000/api/payment/paymentlog`, {
      headers: {
        "auth-token": token,
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(log)
    })
    const data = await res.json()

    if (data.success) {
      const delatt = await fetchData("deleteatt", "POST", { id })
      console.log(delatt);

    }
    getpaymentLog()
  }

  const islogin = () => {
    let token = localStorage.getItem('auth-token')
    if (!token || token == "null" || token == "") {
      setlogin(false)
    }
    else {
      setlogin(true)
    }
  }


  return (
    <>
      <Context.Provider value={{ date, worker, paymentlog,fetchAuth ,islogin,  editWorker, deleteWorker, login , setlogin, getWorkers }}>
        {login && <Header adminname={adminname} />}

        <Routes>
          <Route path='/' element={login ? <Home /> : <Login />} />

          <Route path='/workers' element={login ? <WorkersList /> : <Login />} />

          <Route path='/addworker' element={login ? <Addworker addWorker={addWorker} /> : <Login />} />

          <Route path='/takeattendance/:id' element={login ? <Att /> : <Login />} />

          <Route path='/attendance_payment' element={login ? <Att_Pay /> : <Login />} />

          <Route path='/makepayment/:id' element={login ? <Payment worker={worker} setpaymentLog={setpaymentLog} /> : <Login />} />
          <Route path='/paymentlog' element={login ? <Payment_Log paymentlog={paymentlog} /> : <Login />} />

          <Route path='/login' element={<Login />} />

          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Context.Provider>


    </>
  )
}
