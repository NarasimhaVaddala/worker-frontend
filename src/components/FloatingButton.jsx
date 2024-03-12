import React, { useEffect } from 'react'
import './float.css'
import { Link } from 'react-router-dom';
// import './float.js'
// import { Link } from 'react-router-dom'

export default function FloatingButton() {

    useEffect(() => {
        const handleClick = () => {
            const menu = document.querySelector(".sticky-menu-container .inner-menu");
            const closeIcon = document.querySelector(".sticky-menu-container .close-icon");
            const arrowIcon = document.querySelector(".sticky-menu-container .arrow-icon");
            const menuItems = document.querySelectorAll(".sticky-menu-container .menu-item");

            if (!menu || !closeIcon || !arrowIcon || !menuItems) {
                console.error("One or more elements not found");
                return;
            }

            menu.classList.toggle("closed");

            if (menu.classList.contains("closed")) {
                closeIcon.classList.remove("show");
                closeIcon.classList.add("hide");
                arrowIcon.classList.remove("hide");
                arrowIcon.classList.add("show");
                menuItems.forEach(item => item.classList.add("text-hides"));
            } else {
                closeIcon.classList.remove("hide");
                closeIcon.classList.add("show");
                arrowIcon.classList.remove("show");
                arrowIcon.classList.add("hide");
                menuItems.forEach(item => item.classList.remove("text-hides"));
            }
        };

        const button = document.querySelector(".sticky-menu-container .outer-button");
        if (button) {
            button.addEventListener("click", handleClick);
        }

        return () => {
            if (button) {
                button.removeEventListener("click", handleClick);
            }
        };
    }, []);

    return (
        <>
            {/* <i className="fa-solid fa-ellipsis"/></i> */}

            <div className="sticky-menu-container">
                <div className="inner-menu closed">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <span className="item-icon">
                               
                            <i className="fa-solid fa-house"></i>
                            </span>
                            <Link to="/"  className='text-white'>Home</Link>
                        </li>
                        <li className="menu-item">
                            <span className="item-icon">
                            <i className="fa-solid fa-people-group"></i>
                            </span>
                            <Link className="text-white " to="/workers">Worker List</Link>
                        </li>
                        <li className="menu-item">
                            <span className="item-icon">
                            <i className="fa-solid fa-clipboard-user"></i>

                            </span>

                            
                           <Link to='/attendance_payment' className='text-white'>Attendance</Link>
                            </li>
                        <li className="menu-item">
                            <span className="item-icon">
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            </span>
                           <Link to='/paymentlog' className='text-white'>Payment History</Link>
                        </li>
                    </ul>
                </div>
                <div className="outer-button">
                    <div className="icon-container">
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 92 92" enableBackground="new 0 0 92 92" xmlSpace="preserve" className="close-icon">
                            <path id="XMLID_732_" d="M70.7,64.3c1.8,1.8,1.8,4.6,0,6.4c-0.9,0.9-2,1.3-3.2,1.3c-1.2,0-2.3-0.4-3.2-1.3L46,52.4L27.7,70.7
	c-0.9,0.9-2,1.3-3.2,1.3s-2.3-0.4-3.2-1.3c-1.8-1.8-1.8-4.6,0-6.4L39.6,46L21.3,27.7c-1.8-1.8-1.8-4.6,0-6.4c1.8-1.8,4.6-1.8,6.4,0
	L46,39.6l18.3-18.3c1.8-1.8,4.6-1.8,6.4,0c1.8,1.8,1.8,4.6,0,6.4L52.4,46L70.7,64.3z"/>
                        </svg>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 92 92" enableBackground="new 0 0 92 92" xmlSpace="preserve" className="arrow-icon">
                            <path id="XMLID_507_" d="M49.9,88c-0.2,0-0.4,0-0.6-0.1c-1.8-0.3-3.2-1.7-3.3-3.5l-3.5-34.8L7.6,46.1c-1.8-0.2-3.3-1.6-3.5-3.3
	c-0.3-1.8,0.7-3.5,2.3-4.3l76-34.1c1.5-0.7,3.3-0.4,4.5,0.8c1.2,1.2,1.5,3,0.8,4.5l-34.1,76C52.9,87.1,51.4,88,49.9,88z M23.3,39.7
	L46.4,42c1.9,0.2,3.4,1.7,3.6,3.6l2.4,23.1L76,16L23.3,39.7z"/>
                        </svg>
                    </div>
                </div>
            </div>



        </>
    )
}
