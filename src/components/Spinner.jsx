import React from 'react'

export default function Spinner() {
    return (
        <div className="d-flex justify-content-center align-items-center text-warning " style={{height:"100%", width:"100%" , zIndex:3 , position:"absolute" , background:"rgba(0,0,0,0.5)"}}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden" >Loading...</span>
            </div>
        </div>
    )
}
