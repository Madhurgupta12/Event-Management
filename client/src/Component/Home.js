// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState('');

//   const handleNavigation = (path) => {
//     navigate(path);
//     setSelected(path);
//   };

//   return (
//     // <div className="flex h-[calc(100vh-2rem)] w-full">
//     //   <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
//     //     <div className="mb-2 p-4">
//     //       <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
//     //         Material Tailwind
//     //       </h5>
//     //     </div>
//     //     <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
//     //       <div
//     //         role="button"
//     //         tabIndex={0}
//     //         onClick={() => handleNavigation('/blocks')}
//     //         className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all ${
//     //           selected === '/blocks'
//     //             ? 'bg-gray-200 text-blue-900'
//     //             : 'hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900'
//     //         } outline-none`}
//     //       >
//     //         <div className="grid place-items-center mr-4">
//     //           <svg
//     //             xmlns="http://www.w3.org/2000/svg"
//     //             viewBox="0 0 24 24"
//     //             fill="currentColor"
//     //             aria-hidden="true"
//     //             className="h-5 w-5"
//     //           >
//     //             <path
//     //               fillRule="evenodd"
//     //               d="M2.25 2.25a.75.75 0 000 1.5H3v10.5a3 3 0 003 3h1.21l-1.172 3.513a.75.75 0 001.424.474l.329-.987h8.418l.33.987a.75.75 0 001.422-.474l-1.17-3.513H18a3 3 0 003-3V3.75h.75a.75.75 0 000-1.5H2.25zm6.04 16.5l.5-1.5h6.42l.5 1.5H8.29zm7.46-12a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6zm-3 2.25a.75.75 0 00-1.5 0v3.75a.75.75 0 001.5 0V9zm-3 2.25a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"
//     //               clipRule="evenodd"
//     //             />
//     //           </svg>
//     //         </div>
//     //         Blocks
//     //       </div>
//     //       <div
//     //         role="button"
//     //         tabIndex={0}
//     //         onClick={() => handleNavigation('/books')}
//     //         className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all ${
//     //           selected === '/books'
//     //             ? 'bg-gray-200 text-blue-900'
//     //             : 'hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900'
//     //         } outline-none`}
//     //       >
//     //         <div className="grid place-items-center mr-4">
//     //           <svg
//     //             xmlns="http://www.w3.org/2000/svg"
//     //             viewBox="0 0 24 24"
//     //             fill="currentColor"
//     //             aria-hidden="true"
//     //             className="h-5 w-5"
//     //           >
//     //             <path
//     //               fillRule="evenodd"
//     //               d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 004.25 22.5h15.5a1.875 1.875 0 001.865-2.071l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
//     //               clipRule="evenodd"
//     //             />
//     //           </svg>
//     //         </div>
//     //         Books
//     //       </div>
//     //       <div
//     //         role="button"
//     //         tabIndex={0}
//     //         onClick={() => handleNavigation('/example-pages')}
//     //         className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all ${
//     //           selected === '/example-pages'
//     //             ? 'bg-gray-200 text-blue-900'
//     //             : 'hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900'
//     //         } outline-none`}
//     //       >
//     //         <div className="grid place-items-center mr-4">
//     //           <svg
//     //             xmlns="http://www.w3.org/2000/svg"
//     //             viewBox="0 0 24 24"
//     //             fill="currentColor"
//     //             aria-hidden="true"
//     //             className="h-5 w-5"
//     //           >
//     //             <path
//     //               fillRule="evenodd"
//     //               d="M6.912 3a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H6.912zm13.823 9.75l-2.213-7.191A1.5 1.5 0 0017.088 4.5H6.912a1.5 1.5 0 00-1.434 1.059L3.265 12.75H6.11a3 3 0 012.684 1.658l.256.513a1.5 1.5 0 001.342.829h3.218a1.5 1.5 0 001.342-.83l.256-.512a3 3 0 012.684-1.658h2.844z"
//     //               clipRule="evenodd"
//     //             />
//     //           </svg>
//     //         </div>
//     //         Example Pages
//     //       </div>
//     //       <div
//     //         role="button"
//     //         tabIndex={0}
//     //         onClick={() => handleNavigation('/profile')}
//     //         className={`flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all ${
//     //           selected === '/profile'
//     //             ? 'bg-gray-200 text-blue-900'
//     //             : 'hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900'
//     //         } outline-none`}
//     //       >
//     //         <div className="grid place-items-center mr-4">
//     //           <svg
//     //             xmlns="http://www.w3.org/2000/svg"
//     //             viewBox="0 0 24 24"
//     //             fill="currentColor"
//     //             aria-hidden="true"
//     //             className="h-5 w-5"
//     //           >
//     //             <path
//     //               fillRule="evenodd"
//     //               d="M15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zm-3.75 4.5a5.25 5.25 0 00-5.25 5.25.75.75 0 01-.75.75h-.75a.75.75 0 00-.75.75v.75A.75.75 0 004.5 21h15a.75.75 0 00.75-.75v-.75a.75.75 0 00-.75-.75h-.75a.75.75 0 01-.75-.75 5.25 5.25 0 00-5.25-5.25h-1.5z"
//     //               clipRule="evenodd"
//     //             />
//     //           </svg>
//     //         </div>
//     //         Profile
//     //       </div>
//     //     </nav>
//     //   </div>
//     //   <div className="flex-grow p-6">
//     //     <h2 className="text-2xl font-bold">Welcome to Material Tailwind</h2>
//     //     <p className="mt-4 text-lg">
//     //       This is your home page where you can navigate to different sections
//     //       using the side panel. Enjoy exploring the features!
//     //     </p>
//     //   </div>
//     // </div>
    
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css';
// import Appointments from "./appointments";
// import useDoctorProfile from "../../DoctorsPage/DoctorInitialpage";

function Home() {
  const navigate=useNavigate();
    // const { user, loading } = useDoctorProfile();
    // console.log(user);
   



  // if (!user) {
  //    navigate("/")
  // }

  // if (loading) {
  //    <div>Loading...</div>;
  // }
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const userName = "John doe"
  const userPhoto = "https://via.placeholder.com/40";

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };
  const handleToggleClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleModeSwitch = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    console.log("Doctor page loaded");
    const body = document.querySelector("body");

    if (darkMode) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }, [darkMode]);
  // console.log(user)
  // const doctorId=1;

  // const doctorId=user.id;
  // console.log(doctorId)
  // console.log(doctorId)
  return (
    <>
        <div className="bg-emerald-900 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-lg font-semibold">Doctor App</Link>
          <div className="flex items-center">
            <img src={userPhoto} alt="User" className="w-8 h-8 rounded-full mr-2" />
            <div className="text-white">{userName}</div>
            <button
              onClick={handleLogout}
              className="ml-4 p-2 rounded bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />
      <div>
        <div>
          <nav className={`sidebar ${sidebarOpen ? "" : "close"}`}>
            <header>
              <div className="image-text">
                <span className="image">
                  <img
                    src="https://t4.ftcdn.net/jpg/04/06/91/91/240_F_406919147_D3WsGjwXj1qmFNrei2ZFvBWwiueRcFmg.jpg"
                    alt="logo"
                  />
                </span>
                <div className="text header-text">
                  <span className="main">Event </span>
                  <span className="sub">Management</span>
                </div>
              </div>
              <i
                className="bx bx-chevron-right toggle"
                onClick={handleToggleClick}
              />
            </header>
            <div className="menu-bar">
              <div className="menu">
                <ul className="menu-links">
                  <li className="search-bar">
                    <i className="bx bx-search icons" />
                    <input type="search" placeholder="Search..." />
                  </li>
                  {/* <li className="nav-link">
                    <a href="/doctor">
                      <i className="bx bx-home-alt icons" />
                      <span className="text nav-text">Dashboard</span>
                    </a>
                  </li> */}
                  <li className="nav-link">
                    <Link to={`/doctor/`}>
                    {/* <Link to="/notification"> */}
                      <i className="bx bx-bell icons" />
                      <span className="text nav-text">DashBoard</span>
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link to={`/notification`}>
                    {/* <Link to="/notification"> */}
                      <i className="bx bx-bell icons" />
                      <span className="text nav-text">Notifications</span>
                    </Link>
                  </li>

                  <li className="nav-link">
                    <a href="/review">
                      <i className="bx bx-heart icons" />
                      <span className="text nav-text">Reviews</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="bottom-content">
              

                {/* dark mode functionality */}
                <li className="mode" onClick={handleModeSwitch}>
                  <div className="moon-sun">
                    <i
                      className={`bx bx-moon icons ${darkMode ? "moon" : ""}`}
                    />
                    <i
                      className={`bx bx-sun icons ${darkMode ? "" : "sun"}`}
                    />
                  </div>
                  <span className="mode-text text">
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </span>
                  <div className="toggle-switch">
                    <span className={`switch ${darkMode ? "dark" : ""}`} />
                  </div>
                </li>
              </div>
            </div>
          </nav>
        </div>
        <div>
          {/* <Appointments></Appointments> */}
        </div>
      </div>
    </>
  );
}

export default Home;

