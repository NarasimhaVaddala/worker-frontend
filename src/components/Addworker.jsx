import React, { useState } from 'react'

export default function Addworker(props) {

    const [name, setname] = useState("")
    const [des, setdes] = useState("")
    const [mob, setmob] = useState("")
    const [rate, setrate] = useState("")
    const addWorker = async () => {
        if (name.length < 3) {
            alert("Please Enter a Valid Name")
        }
        else if (mob.length < 10 || mob.length > 10) {
            alert("please enter a valid mobile number")
        }
        else if (des === null || des === "") {
            console.log(des);
            alert("Please select Designation Of Worker")
        }
        else {
            props.addWorker(name, mob, des, rate)
            setname("")
            setdes("")
            setmob("")
            setrate("")

        }
}
    return (
        <>
            <div className="container my-3 " data-bs-theme="dark">

                <form className='mx-3'>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label text-white">Name</label>
                        <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={name} onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white">Mobile</label>
                        <input type="number" min={1} max={10} className="form-control" id="exampleInputPassword1" value={mob} maxLength={10} onChange={(e) => setmob(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rate" className="form-label text-white">Rate</label>
                        <input type="number" min={1} max={10} className="form-control" id="rate" maxLength={10} value={rate} onChange={(e) => setrate(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="designation" className="form-label text-white">Designation</label>
                        <select className="form-select" aria-label="Default select example" required={true} id='designation' value={des} onChange={(e) => setdes(e.target.value)}>
                            <option value={""}>-- Designation --</option>
                            <option value="mastry">Mastry</option>
                            <option value="helper">Helper</option>
                            <option value="driver">Driver</option>
                        </select>
                    </div>

                    <button type="button" className="btn btn-primary" onClick={addWorker}>Submit</button>
                </form>
            </div>
        </>
    )
}
