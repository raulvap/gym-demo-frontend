import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import "./RightNav.scss";

const Ul = styled.ul`
   list-style: none;
   display: flex;
   margin-top: 20px;
   justify-content: center;
   flex-flow: row nowrap;
   li {
      text-align: center;
      padding: 10px 10px;
      display: flex;
      align-items: center;
      transition: all 0.2s;
      a {
         color: #ffbf00;
         transition: all 0.2s;
         &:hover {
            font-weight: bold;
            transition: all 0.2s;
         }
      }
   }
   @media (max-width: 960px) {
      flex-flow: column nowrap;
      justify-content: flex-start;
      background-image: linear-gradient(
         to right top,
         #000000,
         #0d0d0d,
         #161616,
         #1d1d1d,
         #242424,
         #262628,
         #28282b,
         #2a2a2f,
         #262730,
         #202432,
         #182233
      );
      opacity: 0.97;
      position: fixed;
      transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
      top: -20px;
      right: 0;
      height: 100vh;
      width: 300px;
      z-index: 998;
      padding-top: 4rem;
      transition: transform 0.5s ease-in-out;
      li {
         font-size: 1rem;
         font-weight: bold;
         padding-top: 0.8rem;
         transition: all 1s;
      }
   }
`;

const RightNav = (props) => {
   const { open, setOpen } = props;

   return (
      <Ul open={open}>
         <li>
            <Link to="/" onClick={() => setOpen(!open)}>
               Inicio
            </Link>
         </li>

         <li>
            <Link to="/instalaciones" onClick={() => setOpen(!open)}>
               Instalaciones
            </Link>
         </li>
         <li>
            <Link to="/calendario" onClick={() => setOpen(!open)}>
               Eventos | Clases
            </Link>
         </li>
         <li>
            <Link to="/blog" onClick={() => setOpen(!open)}>
               Blog | Publicaciones
            </Link>
         </li>
         <li>
            <Link className="navbar-button" to="/contacto" onClick={() => setOpen(!open)}>
               Contacto
            </Link>
         </li>
      </Ul>
   );
};

export default RightNav;
