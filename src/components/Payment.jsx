import React, { useState, useEffect, useContext, } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
import context from '../Context/context'

export default function Payment(props) {

    const {id }= useParams()
    const value = useContext(context)
    const navigate = useNavigate()
  
    const [attendance, setattendance] = useState([])

    const getAttendance = async () => {
        value.setloading(true)
        const res = await value.fetchData("/getatt", "POST", { id: id })
        value.setloading(false)
        if (res.success) {
            setattendance(res.attendance)
            setdetails(res.details)
        }
    }
useEffect(()=>{
    getAttendance()
},[])
    const [details , setdetails] = useState([])
    let from = ""
    let to = ""
    let time = 0
    let adv = 0
    

    if (attendance.length!=0 ) 
    {
        
        from = attendance[0].date
        to = attendance[attendance.length -1].date

        attendance.map((e)=>
        {
            time = time + e.time
            adv = adv + e.advance
        })
    }

    let pay = (time * details.rate) - adv
    let workedamt = time*details.rate

    
    const makePayment = ()=>{
            let x = confirm("Are You sure want to make payment , This will erase all the attendance , advance , worktime of this worker , you can find the transaction in payment log once the payment is done successfully");

            if (x) 
            {
                    props.setpaymentLog(details.name , id , details.mobile , pay , workedamt , adv , from , to)
                    from = ""
                    to = ""
                    time = ""
                    adv = ""
                    pay = ""
                    navigate('/paymentlog')
            }
    }

    return (
        <>

            <div className="container my-2 ">
                <h3 className='my-2 text-center'>Payment Details</h3>
                <hr />

                <table className='table bg-dark' data-bs-theme="dark" >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{details.name}</td>
                            <td>{details.mobile}</td>
                            <td>{details.rate}</td>
                        </tr>
                    </tbody>
                </table>

                
                <div className="container d-flex flex-column">


                    <table className="table  bg-dark" data-bs-theme="dark" style={{ width: "80%", margin: "auto" }}>
                        <thead>
                            <tr>
                                <th>Descryption</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                                <td>From Date</td>
                                <td>{!from?"NA":from}</td>
                            </tr>
                            <tr>
                                <td>To Date</td>
                                <td>{!to?"NA":to}</td>
                            </tr>


                            <tr>
                                <td>Total Duties</td>
                                <td>{!time?"NA":time}</td>
                            </tr>

                            <tr>
                                <td>Total Advance Taken</td>
                                <td>{!adv?"NA":adv}</td>
                            </tr>

                            <tr>
                                <td>To Be Paid</td>
                                <td>
                                    {pay<0?"0":pay}
                                </td>
                            </tr>
                            <tr>
                                <td>To Recieve</td>
                                <td>
                                    {pay>0?"0":-pay}
                                </td>
                            </tr>
                        </tbody>



                    </table>

                    <button onClick={makePayment} type="button" disabled={!pay} className="btn btn-warning my-4" style={{ width: "150px", margin: "auto" }}>Make Payment</button>
                </div>

            </div>

        </>
    )
}
