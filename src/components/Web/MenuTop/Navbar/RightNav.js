import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Ul = styled.ul`
   list-style: none;
   display: flex;
   margin-top: 20px;
   justify-content: center;
   flex-flow: row nowrap;
   li {
      padding: 10px 10px;
      display: flex;
      align-items: center;
      transition: all 0.5s;
      a {
         color: #224870;
         &:hover {
            font-weight: bold;
            transition: all 0.5s;
         }
      }
      button {
         box-sizing: content-box;
         ${"" /* font-size: 1.5rem;
      height: 2.5rem; */}
         background-color: transparent;
         border-color: #fff;
         border-radius: 4px;
         cursor: pointer;
         transition: all 0.2s ease-in-out;
         text-decoration: none;
         padding: 5px 20px;
         transition: all 0.5s;
         &:hover {
            transition: all 0.4s ease-in-out;
            background: #fff;
            background-color: #fff;
            font-weight: bold;
         }
      }
   }
   @media (max-width: 960px) {
      flex-flow: column nowrap;
      justify-content: flex-start;
      background-image: linear-gradient(
         to top,
         #d5d4d0 0%,
         #d5d4d0 1%,
         #eeeeec 31%,
         #efeeec 75%,
         #e9e9e7 100%
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
         button {
            a {
               color: #f5f5f5;
               font-weight: 400;
               transition: all 1s;
            }
            opacity: 1 !important;
            box-sizing: content-box;
            font-size: 1rem;
            font-weight: bold;
            height: 1.5rem;
            width: 65%;
            background: #0269af;
            box-shadow: 0px 1px 4px rgba(11, 110, 166, 0.65);
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.2s ease-in-out;
            text-decoration: none;
            padding: 2px 5px 5px 5px;
            transition: all 1s;
            &:hover,
            a:hover {
               background: #0269af;
               transition: all 1s;
               box-shadow: 0px 6px 15px $color-1;
               color: #fff;
               a {
                  font-weight: bold;
                  transition: all 1s;
               }
               &::after {
                  opacity: 1;
                  transition: all 1s;
               }
            }
         }
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
            <Link to="/contacto" onClick={() => setOpen(!open)}>
               Horarios
            </Link>
         </li>
         <li>
            <Link to="/servicios" onClick={() => setOpen(!open)}>
               Servicios
            </Link>
         </li>
         <li>
            <Link to="/comunidad" onClick={() => setOpen(!open)}>
               Comunidad
            </Link>
         </li>
         <li>
            <Link to="/calendario" onClick={() => setOpen(!open)}>
               Eventos
            </Link>
         </li>
         <li>
            <Link to="/blog" onClick={() => setOpen(!open)}>
               Publicaciones
            </Link>
         </li>
         <li>
            <button>
               <Link to="/contacto" onClick={() => setOpen(!open)}>
                  Contacto
               </Link>
            </button>
         </li>
      </Ul>
   );
};

export default RightNav;
