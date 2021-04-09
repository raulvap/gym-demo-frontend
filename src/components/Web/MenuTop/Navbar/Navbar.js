import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Burger from "./Burger";
import Logo from "../../../../assets/img/svg/logo-color.svg";

const Navbar = () => {
   return (
      <div className="navbar">
         {/* <Nav> */}
         {/* <div className='navbar__logo'>
        
      </div> */}
         <Link to="/">
            <img src={Logo} alt="Eclesia Logo" />
         </Link>
         <Burger />
         {/* </Nav> */}
      </div>
   );
};

export default Navbar;
