import React from 'react'
import {Link  } from 'react-router-dom'
export default function Att_Pay(props) {
    return (
        <div className='container'>

            <table className="table bg-dark my-4" data-bs-theme="dark">
                <thead className='border'>
                    <tr >
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        
                        
                        <th scope="col">Mark Attendance</th>
                        <th scope="col">Make Payment</th>

                    </tr>
                </thead>
                <tbody >
                    {props.worker.map((e) => {
                        
                        return (

                            <tr key={e._id}>
                                <td>{e.name}</td>
                                <td>{e.mobile}</td>
                           
                                <td><Link className="btn btn-dark btn-sm" to={`/takeAttendance/${e._id}`}><i className="fa-solid fa-arrow-right"></i></Link></td>
                                <td><Link className="btn btn-dark btn-sm" to={`/makepayment/${e._id}`}><i className="fa-solid fa-arrow-right"></i></Link></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        </div>



      
  )
}
