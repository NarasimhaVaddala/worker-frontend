import React, { useEffect, useState, useContext } from 'react'
import { useParams, } from 'react-router-dom'
import context from '../Context/context'



export default function Att(props) {



    const value = useContext(context);
    const { id } = useParams()
    const [attendance, setattendance] = useState([])
    const [details , setdetails] = useState([])
    const [time, settime] = useState("")
    const [adv, setadv] = useState("")


    

  
    const postatt = async (time, adv) => {
        if (!time) time = 0
        if (!adv) adv = 0
        let x = confirm("Attendance Once Marked Cannot Be Edited , Do You want to procced") 
        if (!x) return
        else
        {
            value.setloading(true)
            const res = await value.fetchData(`/takeattendance/${id}`, "PUT", { time: parseFloat(time), advance: parseFloat(adv), date: value.date })
            value.setloading(false)
            setattendance([...attendance, { time: parseFloat(time), advance: parseFloat(adv), date: value.date }])
            settime("")
            setadv("")
        }
        
    }

    const getAttendance = async () => {
        value.setloading(true)
        const res = await value.fetchData("getatt", "POST", { id: id })
        value.setloading(false)
        if (res.success) {
            setattendance(res.attendance)
            setdetails(res.details)
        }
    }


    useEffect(() => {
        getAttendance()
    }, [])


  


    let disable = false

    if (attendance.length!=0 ) {
        
        if (value.date == attendance[attendance.length - 1].date) {
            disable = true   
        }
    }


    return (
        <div className="container my-3">
            <h3 className='my-3'>Date : {value.date}</h3>
            <div className="d-flex align-items-center justify-content-between my-2 ">
                <p>Absent : 0 Hours</p>
                <p>Half : 4 Hours</p>
                <p>One : 8 Hours</p>
                <p>Full : 12 Hours</p>
                <p>Double : 16 Hours</p>
                <p>Double + Half : 20 Hours</p>
            </div>

            <hr />

<div className="d-flex justify-content-between">
    <p><strong>Name</strong> : {details.name}</p>
    <p><strong>Mobile</strong> : {details.mobile}</p>
</div>

            <table className="table bg-dark my-4 " data-bs-theme="dark"  >
                <thead className='border'>
                    <tr >
                        
                        <th scope="col">Time</th>
                        <th scope="col">Advance in ₹</th>
                        <th scope="col">Submit</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                      
                        <td>
                            <select name='ddes' disabled={disable} value={time} onChange={(e) => settime(e.target.value)} >
                                <option value="0">Absent</option>
                                <option value="0.5">Half</option>
                                <option value="1">One</option>
                                <option value="1.5">Full</option>
                                <option value="2">Double</option>
                                <option value="2.5">Double + Half</option>
                            </select> </td>
                        <td><input type="number" style={{ width: "70px" }} disabled={disable} value={adv} onChange={(e) => setadv(e.target.value)} name='nu' /></td>
                        <td><button className='btn btn-warning' type='button' disabled={disable} onClick={() => postatt(time, adv)}>Submit</button></td>
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

                    attendance.map((e) => {
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
