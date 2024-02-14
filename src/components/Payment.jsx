import React, { useState, useEffect, } from 'react'
import { useParams } from 'react-router-dom'

export default function Payment(props) {

    let {id }= useParams()
    let name = ""
    let mobile = ""
    let rate = ""
    let from = ""
    let to = ""
    let time = 0
    let adv = 0

    props.worker.filter((e) => {
        if (e._id === id) {
            name = e.name;
            mobile = e.mobile;
            rate = e.rate

        }
    })

    props.attendance.forEach((e) => {
        time = time + e.time
        adv = adv + e.advance

    })
    if (props.attendance.length > 0) {
        from = props.attendance[0].date
        to = props.attendance[props.attendance.length - 1].date
    }

   
    useEffect(() => {
        props.getattendance(id)

    }, [])
    let pay = (time * rate) - adv
    let workedamt = time*rate

    
    const makePayment = ()=>{
            let x = confirm("Are You sure want to make payment , This will erase all the attendance , advance , worktime of this worker , you can find the transaction in payment log once the payment is done successfully");

            if (x) {
                    props.setpaymentLog(name , id , mobile , pay , workedamt , adv , from , to)
                    from = ""
                    to = ""
                    time = ""
                    adv = ""
                    pay = ""
                    
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
                            <td>{name}</td>
                            <td>{mobile}</td>
                            <td>{rate}</td>
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
                                <td>{from}</td>
                            </tr>
                            <tr>
                                <td>To Date</td>
                                <td>{to}</td>
                            </tr>


                            <tr>
                                <td>Total Worked Time</td>
                                <td>{time}</td>
                            </tr>

                            <tr>
                                <td>Total Advance Taken</td>
                                <td>{adv}</td>
                            </tr>

                            <tr>
                                <td>To Be Paid</td>
                                <td>
                                    {pay}
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
