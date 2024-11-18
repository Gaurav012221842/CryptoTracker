 
import React from "react";
import store from "../../state/store";
import { useNavigate } from "react-router-dom";
import SearchBar from "../Search/searchBar";
import DayNight from "../DayNight/DayNight"; // Import DayNight component

function Navbar() {
  const { setCurrency } = store();
  const navigate = useNavigate();

  const gotoHome = () => {
    navigate('/');
  };
  
  return (
    <div className="navbar position-sticky bg-base-200">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><a onClick={() => setCurrency('inr')}>INR</a></li>
            <li><a onClick={() => setCurrency('usd')}>USD</a></li>
          </ul>
        </div>
      </div>
      
       

      <div onClick={gotoHome} className="navbar-center">
        <a className="btn btn-ghost text-xl">Crypto Tracker</a>
      </div>
     
       
      <div className="navbar-end">        
        <button className="btn btn-ghost btn-circle">
          <DayNight />
        </button>
      </div>
      <div className="absolute top-3 right-14">
                    <SearchBar />
      </div>
    </div>
  );
}

export default Navbar;
