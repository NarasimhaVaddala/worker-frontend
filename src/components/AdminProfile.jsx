import React, { useState , useContext , useEffect } from 'react'
import context from '../Context/context'

export default function AdminProfile(props) {

    
    
    const value = useContext(context)
    const [disable , setdissable] = useState(true)


    const [user , setuser] = useState({name:localStorage.getItem('adminname') , mobile:localStorage.getItem('mobile')})

    const submitdetails = async()=>{
        const data = await value.fetchAuth('editdetails' , {name:user.name , mobile:user.mobile})
        if (data.success) {
                    
                    setdissable(true)
                    value.showAlert('success' , "Details Changed SUccessfully")
                    localStorage.setItem('adminname', data.details.name)
                    localStorage.setItem('mobile',data.details.mobile)
        }
        else
        {
            value.showAlert('danger', "Something Went Wrong or Please enter different mobile number")
        }
    }

    useEffect(() => {
        setuser({name:localStorage.getItem('adminname') , mobile:localStorage.getItem('mobile')})
      }, [])

    return (
        <>
        <div className="container my-3">
            <h4 className='my-4 mx-4'>Edit Account Details</h4>


            <form className='mx-4' data-bs-theme="dark">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                <div className="mb-3 d-flex">
                    <input type="text" value={user.name} className="form-control" id="exampleInputEmail1" disabled={disable} onChange={(e)=>setuser({...user , name:e.target.value})}/>
                </div>
                    <label htmlFor="exampleInputPassword1" className="form-label">Mobile</label>
                <div className="mb-3 d-flex">
                    <input type="text" value={user.mobile} className="form-control" id="exampleInputPassword1" disabled={disable} onChange={(e)=>setuser({...user , mobile:e.target.value})}/>
                </div>
                
                <button type='button' className='btn btn-light mx-2' onClick={()=>{setdissable(disable==true?false:true) }}>Edit Details <i className="fa-regular fa-pen-to-square" ></i></button>
                <button type='button' className='btn btn-success' disabled={disable} onClick={submitdetails}>Submit</button>
            </form>
        </div>
        </>
    )
}
