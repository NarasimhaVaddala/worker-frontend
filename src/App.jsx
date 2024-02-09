import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import WorkersList from './components/WorkersList'
import Addworker from './components/Addworker'

import Att from './components/Att'
import Payment from './components/Payment'
import Att_Pay from './components/Att_Pay'


const fetchData = async (suburl, method, body) => {
  const data = await fetch(`http://localhost:3000/api/worker/${suburl}`, {
    headers: {
      "auth-token": "eyJhbGciOiJIUzI1NiJ9.NjViNWE1MzFmMDgyZTc0YTQzY2FiNDFk.ZmWinjmICqS6K_n3EOymuAvCxa3oBdxCd_SYeT0DhYU",
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

  const getWorkers = async () => {
    const res = await fetchData("fetchallworkers", "GET")
    setworker(res.workerlist)
  }

  useEffect(() => { getWorkers() }, [])


  const addWorker = async (name, mobile, designation, rate) => {
    const res = await fetchData("addnewworker", "POST", { name, mobile, designation, rate })
    setworker([...worker, res.worker])
    console.log(res.worker);

  }

  const deleteWorker = async (id) => {
    let x = confirm("Are You Sure Want To Delete This Worker")
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


  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workers' element={<WorkersList worker={worker} delete={deleteWorker} editWorker={editWorker} />} />
        <Route path='/addworker' element={<Addworker addWorker={addWorker} />} />
        <Route path='/takeattendance/:id' element={<Att worker={worker} attendance={attendance} takeattendance={takeattendance} getattendance={getattendance} date={date}/>} />
        <Route path='attendance_payment' element={<Att_Pay worker={worker} attendance={attendance} getattendance={getattendance}/>} />
        <Route path='makepayment/:id' element={<Payment worker={worker} attendance={attendance} getattendance={getattendance} />} />
      </Routes>



    </>
  )
}
