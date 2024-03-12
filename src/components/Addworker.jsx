import React, { useState } from 'react'

export default function Addworker(props) {

  

const [newWorker, setNewWorker] = useState({name:"" , mob:"" , des:"" , rate:""})

const addWorker = async () => 
    {
        if (newWorker.name.length < 3) 
        {
            alert("Please Enter a Valid Name")
        }
        else if (newWorker.mob.length < 10 || newWorker.mob.length > 10)
        {
            alert("please enter a valid mobile number")
        }
        else if (newWorker.des === null || newWorker.des === "") 
        {
            alert("Please select Designation Of Worker")
        }
        else 
        {
            props.addWorker(newWorker.name, newWorker.mob, newWorker.des, newWorker.rate)
            console.log(newWorker);
            setNewWorker({name:"" , mob:"" , des:"" , rate:""})
        }
}




return (
        <>
            <div className="container my-3 " data-bs-theme="dark">
                <form className='mx-3'>

                            <div className="mb-3">
                                <label htmlFor="name" className="form-label text-white">Name</label>
                                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={newWorker.name} onChange={(e) => setNewWorker({...newWorker ,name:e.target.value})} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label text-white">Mobile</label>
                                <input type="number" min={1} max={10} className="form-control" id="exampleInputPassword1" value={newWorker.mob} maxLength={10} onChange={(e) => setNewWorker({...newWorker ,mob:e.target.value})} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="rate" className="form-label text-white">Rate</label>
                                <input type="number" min={1} max={10} className="form-control" id="rate" maxLength={10} value={newWorker.rate} onChange={(e) => setNewWorker({...newWorker ,rate:e.target.value})} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="designation" className="form-label text-white">Designation</label>
                                <select className="form-select" aria-label="Default select example" required={true} id='designation' value={newWorker.des} onChange={(e) => setNewWorker({...newWorker ,des:e.target.value})}>
                                    <option value={""}>-- Designation --</option>
                                    <option value="mastry">Mastry</option>
                                    <option value="helper">Helper</option>
                                    <option value="driver">Driver</option>
                                    <option value="driver">Cleaner</option>
                                    <option value="driver">Others</option>
                                </select>
                            </div>

                            <button type="button" className="btn btn-primary" onClick={addWorker}>Submit</button>
                </form>
            </div>
        </>
    )
}
