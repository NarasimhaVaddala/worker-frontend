import React, {useState , useContext} from 'react'
import {Link  } from 'react-router-dom'
import context from '../Context/context'
export default function Att_Pay(props) {
    
    const [search, setsearch] = useState("")
    const value = useContext(context)
    return (
        <div className='container my-4'>
     <div className="input-group bg-dark" data-bs-theme="dark">
                    <span className="input-group-text">Search Worker</span>
                    <input id="search" type="text" aria-label="First name" className="form-control" onChange={(e) => setsearch(e.target.value)} />

                </div>
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
                    {value.worker.filter((e) => {
                            return search.toLowerCase() === '' ? e : e.name.toLowerCase().includes(search) || e.mobile.toLowerCase().includes(search) || e.designation.toLowerCase().includes(search)
                        }).map((e) => {
                        
                        return (

                            <tr key={e._id}>
                                <td>{e.name}</td>
                                <td>{e.mobile}</td>
                           
                                <td><Link className="btn btn-dark btn-sm" to={`/takeAttendance/${e._id}`}><i className="fa-solid fa-arrow-right"></i></Link></td>
                                <td> <Link className="btn btn-dark btn-sm" to={`/makepayment/${e._id}`}><i className="fa-solid fa-arrow-right"></i></Link></td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
            
            <h3 className='text-center my-5'>{value.worker.length==0|| value.worker.length==""?"Go to home and Add a New Worker To Proceed":""} </h3> 
        </div>



      
  )
}
