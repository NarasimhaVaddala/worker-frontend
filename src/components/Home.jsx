import React from 'react'
import {Link  , useLocation} from 'react-router-dom'


export default function Home() {
  
  
  return (
    <div className="container">

  <div className="d-grid gap-2 col-6 mx-auto my-4">
            <Link className="btn btn-primary my-2" type="button" to="/workers">Worker List</Link>
            <Link className="btn btn-success my-2" type="button" to="/addworker">Add Worker</Link>
            <Link className="btn btn-warning my-2" type="button" to="/attendance_payment">Attendance and Payments</Link>
            <Link className='btn btn-danger my-2' to='/paymentlog'>Payment History</Link>

       
  </div>
    </div>
  )
}