import React, { useEffect, useState } from 'react'

export default function Attendance(props) {

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  const [search, setsearch] = useState("")

  const [time, settime] = useState("")
  const [adv, setadv] = useState("")

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;



  const formattedToday = dd + '/' + mm + '/' + yyyy;
  const [att, setatt] = useState([])
  const [dis , setdis] = useState(false)
  const takeAttendance = (id, time, advance) => {
    setatt(att.concat({ id, time, advance }))
   console.log(att);
  }
  return (
    <>
      <div className="container my-3">
        <h3 className=''>Date : {formattedToday}</h3>
        <div className="d-flex align-items-center justify-content-between my-2 ">

          <p>Half : 1/2</p>
          <p>One : P</p>
          <p>Full : P 1/2</p>
          <p>Double : PP</p>
          <p>Double + Half : PP 1/2</p>
        </div>

        <div className="input-group bg-dark my-3" data-bs-theme="dark">
          <span className="input-group-text">Search Worker</span>
          <input type="text" aria-label="First name" className="form-control" onChange={(e) => setsearch(e.target.value)} />


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
            {
              props.worker.filter((e) => {
                return search.toLowerCase() === '' ? e : e.name.toLowerCase().includes(search) || e.mobile.toLowerCase().includes(search) || e.designation.toLowerCase().includes(search)
              }).map((e) => {
                return (
                  <tr key={e._id}>
                    <td>{e.name}</td>
                    <td>{e.mobile}</td>
                    <td>
                      <select value={time} onChange={(e) => settime(e.target.value)} disabled={dis}>
                        <option value="0">Absent</option>
                        <option value="0.5">Half</option>
                        <option value="1">One</option>
                        <option value="1.5">Full</option>
                        <option value="2">Double</option>
                        <option value="2.5">Double + Half</option>
                      </select> </td>
                    <td><input type="number" disabled={true?att.filter((el)=>{return el._id})[0]===e._id:false} style={{ width: "70px" }} value={adv} onChange={(e) => setadv(e.target.value)} /></td>
                    <td>
                      <button className='btn btn-warning' disabled={dis} type='button' onClick={() => takeAttendance(e._id, time, adv)}>Submit</button></td>
                  </tr>
                )
              })
            }
          </tbody>


        </table>



      </div>



    
    </>
  )
}
