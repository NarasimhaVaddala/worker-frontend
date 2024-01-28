import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import WorkersList from './components/WorkersList'
import Addworker from './components/Addworker'
import Attendance from './components/Attendance'
export default function App() {

  useEffect(() => {
    if (localStorage.getItem('workerlist')) {
      const newlist = JSON.parse(localStorage.getItem("workerlist"))
      setworker(newlist)
    }
  }, [])

  const [worker, setworker] = useState([])

  const addWorker = (name, mobile, desig, rate) => {

    let newworker = { name: name, mobile: mobile, designation: desig, rate: rate }
    setworker([...worker, newworker])
    localStorage.setItem('workerlist', JSON.stringify([...worker, newworker]))
    console.log(worker);



  }

  const deleteWorker = (number) => {
    let x = confirm("Are You Sure Want To Delete This Worker")
    if (x) {
      let newlist = worker.filter((e) => {
        return e.mobile !== number
      })
      setworker(newlist)
      localStorage.setItem('workerlist', JSON.stringify(newlist))
      console.log(newlist);
    }
  }


  const editWorker = (name, mobile, desig, rate) => {
    let objIndex = worker.findIndex((obj => obj.mobile === mobile));

    worker[objIndex].name = name;
    worker[objIndex].mobile = mobile;
    worker[objIndex].designation = desig;
    worker[objIndex].rate = rate;

    setworker([...worker])
    localStorage.setItem('workerlist', JSON.stringify(worker))
    console.log(worker[objIndex].name);
  }


  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/workers' element={<WorkersList worker={worker} delete={deleteWorker} editWorker={editWorker} />} />
        <Route path='/addworker' element={<Addworker addWorker={addWorker} />} />
        <Route path='/takeattendance' element={<Attendance  worker={worker}/>} />
        <Route path='/removeworker' element={<WorkersList worker={worker} delete={deleteWorker} editWorker={editWorker} />} />
      </Routes>

    </>
  )
}
