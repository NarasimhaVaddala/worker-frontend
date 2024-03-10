import React , {useContext} from 'react'
import { Link } from 'react-router-dom'



export default function Home() {

  
  

  return (
    <div className="container">

      <div className="d-grid gap-2 col-6 mx-auto my-4">
        <Link className="btn btn-primary my-2 d-flex align-items-center justify-content-center flex-column" style={{ height: "100px" }} type="button" to="/workers"><i className="fa-solid fa-user my-2"></i>  Worker List</Link>
        <Link className="btn btn-success my-2 d-flex align-items-center justify-content-center flex-column" style={{ height: "100px" }} type="button" to="/addworker"><i className="fa-solid fa-user-plus my-2"></i> Add Worker</Link>
        <Link className="btn btn-warning my-2 d-flex align-items-center justify-content-center flex-column" style={{ height: "100px" }} type="button" to="/attendance_payment"><i className="fa-solid fa-clipboard-user my-2"></i>Attendance and Payments</Link>
        <Link className='btn btn-danger my-2 d-flex align-items-center justify-content-center flex-column' style={{ height: "100px" }} to='/paymentlog'><i className="fa-solid fa-clock-rotate-left my-2"></i> Payment History</Link>


      </div>
    </div>
  )
}
