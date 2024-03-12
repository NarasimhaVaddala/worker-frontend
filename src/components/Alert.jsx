import React from 'react'

export default function Alert(props) {
    return (
        props.alert && <div className={`alert alert-${props.alert.type} d-flex align-items-center`} role="alert">
            
            <div>
                {props.alert.message}
            </div>
        </div>
    )
}
