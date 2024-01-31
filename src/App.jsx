import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import WorkersList from './components/WorkersList'
import Addworker from './components/Addworker'

import Att from './components/Att'

export default function App() {
  let date = ""
  const setdate = ()=>{
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
  
  const getWorkers = async () => {

    const data = await fetch('http://localhost:3000/api/worker/fetchallworkers', {
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.NjViNWE1MzFmMDgyZTc0YTQzY2FiNDFk.ZmWinjmICqS6K_n3EOymuAvCxa3oBdxCd_SYeT0DhYU",
        "Content-type": "application/json",
      },
      method: "GET",

    })

    const res = await data.json();
    setworker(res.workerlist)

    

  }

  useEffect(() => { getWorkers() }, [])


  const addWorker = async (name, mobile, designation, rate) => {



    const data = await fetch('http://localhost:3000/api/worker/addnewworker', {
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiJ9.NjViNWE1MzFmMDgyZTc0YTQzY2FiNDFk.ZmWinjmICqS6K_n3EOymuAvCxa3oBdxCd_SYeT0DhYU",
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name, mobile, designation, rate })

    })

    const res = await data.json();
    setworker([...worker, res.worker])
    console.log(res.worker);

  }

  const deleteWorker = async (id) => {
    let x = confirm("Are You Sure Want To Delete This Worker")
    if (x) {
      let url = "http://localhost:3000/api/worker/deleteworker"
      const data = await fetch(url, {
        headers: {
          "auth-token": "eyJhbGciOiJIUzI1NiJ9.NjViNWE1MzFmMDgyZTc0YTQzY2FiNDFk.ZmWinjmICqS6K_n3EOymuAvCxa3oBdxCd_SYeT0DhYU",
          "Content-type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify({ id: id })

      })

      const res = await data.json();
      getWorkers()
    }
  }


  const editWorker = async (id, name, mobile, designation, rate) => {
    if (name.length < 3) {
      alert("Please Enter a Valid Name")
    }
    else if (mobile.length < 10 || mobile.length > 10) {
      alert("please enter a valid mobile number")
    }
    else if(rate.length < 1){
      alert("Please enter a valid rate")
    }
    else if (designation === null || designation === "") {
      console.log(des);
      alert("Please select Designation Of Worker")
    }
    else {
      let url = "http://localhost:3000/api/worker/editworker"
      const data = await fetch(url, {
        headers: {
          "auth-token": "eyJhbGciOiJIUzI1NiJ9.NjViNWE1MzFmMDgyZTc0YTQzY2FiNDFk.ZmWinjmICqS6K_n3EOymuAvCxa3oBdxCd_SYeT0DhYU",
          "Content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ id, name, designation, mobile, rate })

      })

      const res = await data.json();
      console.log(res);
      getWorkers()

      setworker([...worker])
    }
    }


   const takeattendance = async(id, time, adv)=>{
    
    let url = `http://localhost:3000/api/worker/takeattendance/${id}`
    const data = await fetch(url, {
        headers: {
          "auth-token": "eyJhbGciOiJIUzI1NiJ9.NjViNWE1MzFmMDgyZTc0YTQzY2FiNDFk.ZmWinjmICqS6K_n3EOymuAvCxa3oBdxCd_SYeT0DhYU",
          "Content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ time:parseFloat(time) , advance:parseFloat(adv) , date:date })

      })

      let res = await data.json()
      console.log(res);
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
          {/* <Route path='/takeattendance' element={<Attendance worker={worker} updateWorker={updateWorker}/>} /> */}
          <Route path='/takeattendance/:id' element={<Att worker={worker}  takeattendance={ takeattendance}  />} />

          <Route path='/removeworker' element={<WorkersList worker={worker} delete={deleteWorker} editWorker={editWorker} />} />
        </Routes>


    
      </>
    )
  }
