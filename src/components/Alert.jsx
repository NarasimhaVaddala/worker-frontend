import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type} d-flex align-items-center`} style={{position:"absolute" , zIndex:4 , width:"100%"}} role="alert">
            
            <div>
                {props.alert.message}
            </div>
        </div>
    )
}
