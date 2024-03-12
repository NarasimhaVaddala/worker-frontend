import React from 'react'

export default function Payment_Log(props) {

    
    
    return (
        <div className='container my-2'>
            <h5 className='my-3'>{props.paymentlog.length?"Note : If Paid amount showing Negative , It Means You have Recieved the amount":""}</h5>
            <h2 className='text-center my-5'>{!props.paymentlog.length?"Nothing to See Here":""} </h2> 
            {props.paymentlog.map((e)=>{
                
                    return (<div key={e.date} className="card bg-dark my-2" data-bs-theme="dark">
                            <div className="card-header d-flex justify-content-between">
                                <span>{e.name} | {e.mobile}</span>
                            <   span>Trxn date : {e.date}</span>
                            </div>
                            <div className="card-body d-flex justify-content-around">
                                    <span>Paid : {e.paidamount}</span>
                                    <span>Advance : {e.advance}</span>
                                    <span>WorkAmount : {e.workedamount}</span>
                                    <span>From {e.fromdate} To {e.todate}</span>
                            </div>
                    </div>)
          })}
        </div>
       
    )
}
