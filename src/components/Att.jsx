import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Att(props) {
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
    let loc = useLocation()
    let id = loc.pathname.slice(16, loc.pathname.length).toLowerCase()
  

    let name = ""
    let mobile = ""
    let att = []
   

    props.worker.filter((e) => {
        if (e._id === id) {
            name = e.name;
            mobile = e.mobile;
           att = e.attendance
           
        }
    })
    
   

    
    const [time, settime] = useState("")
    const [adv, setadv] = useState("")

    const takeAttendance =  (id, time, adv) => {
        if (adv==null ||adv== "") {
            alert("please Enter Advance")
        }
        props.takeattendance(id, time, adv)
    }
    return (
        <div className="container my-3">
            <h3 className='my-3'>Date : {date}</h3>
            <div className="d-flex align-items-center justify-content-between my-2 ">

                <p>Half : 1/2</p>
                <p>One : P</p>
                <p>Full : P 1/2</p>
                <p>Double : PP</p>
                <p>Double + Half : PP 1/2</p>
            </div>
            <table className="table bg-dark my-4" data-bs-theme="dark">
                <thead className='border'>
                    <tr >
                        <th scope="col">Name</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Time</th>
                        <th scope="col">Advance in ₹</th>
                    </tr>
                </thead>

                <tbody>

                    <tr>
                        <td>{name}</td>
                        <td>{mobile}</td>
                        <td>
                            <select value={time} onChange={(e) => settime(e.target.value)} >
                                <option value="0">Absent</option>
                                <option value="0.5">Half</option>
                                <option value="1">One</option>
                                <option value="1.5">Full</option>
                                <option value="2">Double</option>
                                <option value="2.5">Double + Half</option>
                            </select> </td>
                        <td><input type="number" style={{ width: "70px" }} value={adv} onChange={(e) => setadv(e.target.value)} /></td>
                        <td>
                            <button className='btn btn-warning' type='button' onClick={() => takeAttendance(id, time, adv)}>Submit</button></td>
                    </tr>




                </tbody>


            </table>

            <h3>Attendance</h3>
            <table className='table' data-bs-theme="dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Duty</th>
                        <th>Advance</th>
                    </tr>
                </thead>
                <tbody>{

                    att.map((e) => {
                        return (<tr key={e.date}>
                            <td>{e.date}</td>
                            <td>{e.time}</td>
                            <td>{e.advance}</td>
                        </tr>)
                    })

                }</tbody>
            </table>




        </div>




    )
}
