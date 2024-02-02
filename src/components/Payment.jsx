import React, { useState, useEffect, } from 'react'
import { useLocation } from 'react-router-dom'

export default function Payment(props) {

    let loc = useLocation()
    let id = loc.pathname.slice(13, loc.pathname.length).toLowerCase()
    let name = ""
    let mobile = ""
    let rate = ""
    

    props.worker.filter((e) => {
        if (e._id === id) {
            name = e.name;
            mobile = e.mobile;
            rate = e.rate

        }
    })

    let time = 0
    let adv = 0

    useEffect(() => {
        props.getattendance(id)

    }, [])



    props.attendance.forEach((e) => {
        time = time + e.time
        adv = adv + e.advance
       
    })

    let from = props.attendance[0].date
    let to = props.attendance[props.attendance.length - 1].date


    let pay = (time * rate) - adv

    return (
        <>

            <div className="container my-2  ">
                <h3 className='my-2'>Payment Details</h3>
                <div className="container my-2 mx-2">
                    <p>Name : {name}</p>
                    <p>Mobile : {mobile}</p>
                    <p>Rate : {rate}</p>
                    <p>Total Worked Time : {time}</p>
                    <p>From {from} to {to}</p>
                    <p>Total Advance : {adv}</p>
                    <p>To Be Paid : {pay}</p>
                </div>
            </div>

        </>
    )
}
