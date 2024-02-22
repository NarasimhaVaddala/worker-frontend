import React, { useEffect, useState  } from 'react'
import {  useParams, } from 'react-router-dom'

export default function Att(props) {
   

    let {id }= useParams()
    let name = ""
    let mobile = ""
    let disable = false
    
    const [time, settime] = useState("")
    const [adv, setadv] = useState("")

props.worker.filter((e) => {
        if (e._id === id) {
            name = e.name;
            mobile = e.mobile;
  }})

props.attendance.filter((e)=>{
    if(e.date===props.date){
        disable = true
    }
})

props.paymentlog.filter((e)=>{
    if (e.id===id && e.todate==props.date) {
        disable = true
    }
})



useEffect(()=>{
        props.getattendance(id)
},[])
    
 

    


    const takeAttendance =  (id, time, adv) => {
        if (adv==null ||adv== "") {
            alert("please Enter Advance")
        }
         else if (time==null || time=="" || time==0){
        time = 0
      }else{
        let x = confirm("Attendance Once Marked Cannot Be Edited, If You wish to Mark attendance Click OK , Otherwise Click cancel")
        if (x) {
            props.takeattendance(id, time, adv)
            props.getattendance(id)
    
            settime("")
            setadv("")
        }
       
      }
        
    }
    return (
        <div className="container my-3">
            <h3 className='my-3'>Date : {props.date}</h3>
            <div className="d-flex align-items-center justify-content-between my-2 ">
                <p>Absent : 0 Hours</p>
                <p>Half : 4 Hours</p>
                <p>One : 8 Hours</p>
                <p>Full : 12 Hours</p>
                <p>Double : 16 Hours</p>
                <p>Double + Half : 20 Hours</p>
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
                            <select disabled={disable} value={time} onChange={(e) => settime(e.target.value)} >
                                <option value="0">Absent</option>
                                <option value="0.5">Half</option>
                                <option value="1">One</option>
                                <option value="1.5">Full</option>
                                <option value="2">Double</option>
                                <option value="2.5">Double + Half</option>
                            </select> </td>
                        <td><input type="number" style={{ width: "70px" }} disabled={disable} value={adv} onChange={(e) => setadv(e.target.value)} /></td>
                        <td>
                            <button className='btn btn-warning' type='button' disabled={disable} onClick={() => takeAttendance(id, time, adv)}>Submit</button></td>
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

                    props.attendance.map((e) => {
                        return (<tr key={e.advance}>
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
