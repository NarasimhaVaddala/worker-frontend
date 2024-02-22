import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function WorkersList(props) {

    const ref = useRef()
    const [name, setname] = useState("")
    const [des, setdes] = useState("")
    const [mob, setmob] = useState("")
    const [rate, setrate] = useState("")
    const [search, setsearch] = useState("")
    const [id, setid] = useState("")
    
    const handleEdit = (mobile, designation, rate, name, id) => {

        ref.current.click()
        
        setid(id)
        setname(name)
        setmob(mobile)
        setdes(designation)
        setrate(rate)
    }



    return (
        <>
            <div className="container my-4 ">
                <div className="input-group bg-dark" data-bs-theme="dark">
                    <span className="input-group-text">Search Worker</span>
                    <input type="text" aria-label="First name" className="form-control" onChange={(e) => setsearch(e.target.value)} />

                </div>
                <table className="table bg-dark my-4" data-bs-theme="dark">
                    <thead className='border'>
                        <tr >
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                          
                          
                        </tr>
                    </thead>
                    <tbody >
                        {props.worker.filter((e) => {
                            return search.toLowerCase() === '' ? e : e.name.toLowerCase().includes(search) || e.mobile.toLowerCase().includes(search) || e.designation.toLowerCase().includes(search)
                        }).map((e) => {
                            return (
                                <tr key={e._id}>
                                    <td>{e.name}</td>
                                    <td>{e.mobile}</td>
                                    <td>{e.designation}</td>
                                    <td>{e.rate}</td>
                                    <td><button className="btn btn-warning btn-sm" onClick={() => handleEdit(e.mobile, e.designation, e.rate, e.name, e._id)}><i className="fa-regular fa-pen-to-square"></i></button></td>
                                    <td><button className="btn btn-danger btn-sm" onClick={() => props.delete(e._id)}><i className="fa-solid fa-trash-can"></i></button></td>
                                   
                             </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
            </div>
            <h3 className='text-center my-5'>{props.worker.length==0|| props.worker.length==""?"Go to home and Add a New Worker To Proceed":""} </h3> 



            <button ref={ref} hidden type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-dark" data-bs-theme="dark">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Details</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body bg-dark" data-bs-theme="dark">
                            <form className='mx-3'>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label ">Name</label>
                                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={name} onChange={(e) => setname(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="mobile" className="form-label ">Mobile</label>
                                    <input type="number" min={1} max={10} className="form-control" id="mobile" maxLength={10} value={mob} onChange={(e) => setmob(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="rate" className="form-label ">Rate</label>
                                    <input type="number" min={1} max={10} className="form-control" id="rate" maxLength={10} value={rate} onChange={(e) => setrate(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="designation" className="form-label ">Designation</label>
                                    <select className="form-select" aria-label="Default select example" required={true} id='designation' value={des} onChange={(e) => setdes(e.target.value)}>
                                        <option value={""}>-- Designation --</option>
                                        <option value="mastry">Mastry</option>
                                        <option value="helper">Helper</option>
                                        <option value="driver">Driver</option>
                                    </select>
                                </div>

                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => props.editWorker(id, name, mob, des, rate)}>Submit</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
