import React, { useState , useContext} from 'react';
import { Link } from 'react-router-dom';
import context from '../Context/context';

const ContactPage = () => {

    const value = useContext(context)

    const [details, setdetails] = useState({name:"" , email:"" , message:""})

    const sendemail = async()=>{
            if (!details.name || !details.email || !details.message) {
                alert("Please Fill all the Fields")
            }
            else{
                value.setloading(true)
                const data = await value.fetchAuth('contactme' , {name:details.name , email:details.email , message:details.message})
                if (data.success) {
                    value.setloading(false)
                    setdetails({name:"" , email:"" , message:""})
                    value.showAlert('success' ,  "Message Sent Successfully")
                }

                if (!data.success) {
                    value.setloading(false)
                    value.showAlert('danger' , data.error)
                }

            }
    }
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 my-3">
          <h1>Contact Me</h1>
          <p>Feel free to reach out to me for any inquiries or opportunities.</p>
          <ul className="list-unstyled">
            <li><i className="fa-regular fa-envelope my-2"></i> <Link to="mailto:narasimhavaddala@gmail.com"> narasimhavaddala@gmail.com</Link></li>
            <li><i className="fa-solid fa-phone my-2"></i> +91 89781 06223</li>
          </ul>
          <div className="mt-4">
            <Link style={{fontSize:"35px", textDecoration:"none" , color:"white"}} to="https://www.linkedin.com/in/narasimhavaddala" target="_blank" rel="noopener noreferrer" className="me-4"><i className="fa-brands fa-linkedin"></i></Link>
            <Link style={{fontSize:"35px", textDecoration:"none" , color:"white"}} to="https://github.com/NarasimhaVaddala" target="_blank" rel="noopener noreferrer" className="me-4"><i className="fa-brands fa-github"></i></Link>
            <Link style={{fontSize:"35px", textDecoration:"none" , color:"white"}} to="https://x.com/Narasimha_62" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-x-twitter"></i></Link>
          </div>
        </div>

      

        <div className="col-md-6 my-3">
          <form data-bs-theme="dark">
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">Name</label>
              <input type="text" className="form-control" id="nameInput" placeholder="Enter your name" required  value={details.name} onChange={(e)=>setdetails({...details , name:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="emailInput" className="form-label">Email</label>
              <input type="email" className="form-control" id="emailInput" placeholder="Enter your email" required  value={details.email} onChange={(e)=>setdetails({...details , email:e.target.value})}/>
            </div>
            <div className="mb-3">
              <label htmlFor="messageTextarea" className="form-label">Message</label>
              <textarea className="form-control" id="messageTextarea" rows="5" placeholder="Enter your message" required value={details.message} onChange={(e)=>setdetails({...details , message:e.target.value})}></textarea>
            </div>
          </form>
            <button type="submit" className="btn btn-primary" onClick={sendemail}>Send Message</button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
