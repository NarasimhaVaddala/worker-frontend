import React from 'react'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>

      <div className="container mt-4">
 
      <div className="row">
        <div className="col">
            <h1>Welcome to our Worker Management System!  
        <Link className='btn btn-primary mx-2' to='/contact'> HIRE ME</Link>
        <Link className='btn btn-primary mx-2' to='/'>Try Our Procuct</Link></h1>
          <h3>About the Project:</h3>
          <p>
            Myself Narasimha , I am excited to showcase my project, a comprehensive Worker Management System developed using the MERN stack (MongoDB, Express.js, React, Node.js). This project represents my passion for creating innovative solutions and my proficiency in full-stack web development.
          </p>
          <h3>Key Features:</h3>
          <ul>
            <li>User-Friendly Interface</li>
            <li>Attendance Management</li>
            <li>Payments Management</li>
            <li>Payment Hiatory</li>
            <li>Secure Authentication System</li>
          </ul>
          <h3>Technologies Used:</h3>
          <p>
            Frontend: React.js, Bootstrap<br />
            Backend: Node.js, Express.js<br />
            Database: MongoDB
          </p>
          <h3>Project Impact:</h3>
          <p>
            This project has not only honed my technical skills but also enhanced my problem-solving abilities and project management capabilities. It showcases my ability to conceptualize, design, and implement scalable and efficient software solutions.
          </p>
          <h3>Why Hire Me?</h3>
          <ul>
            <li>Strong foundation in full-stack web development with hands-on experience in MERN stack technologies.</li>
            <li>Proven ability to deliver high-quality, user-centric solutions that meet business objectives.</li>
            <li>Passionate about learning new technologies and continuously improving my skills.</li>
          </ul> </div>
      </div>
    </div>
    </>
  )
}
