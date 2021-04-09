/*jshint esversion: 6 */
import React from "react";

import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { youtubeLink, fbLinkPage, IgPage } from "../../../utils/dataVariables";

import "./SocialLinks.scss";

export default function SocialLinks() {
  return (
    <div className='social-links'>
      <a
        href={youtubeLink}
        className='youtube'
        target='_blank'
        rel='noopener noreferrer'>
        <FaYoutube />
      </a>

      <a
        href={fbLinkPage}
        className='facebook'
        target='_blank'
        rel='noopener noreferrer'>
        <FaFacebook />
      </a>
      <a
        href={IgPage}
        className='facebook'
        target='_blank'
        rel='noopener noreferrer'>
        <FaInstagram />
      </a>
      {/* <a
        href='https://es.linkedin.com/in/agustin93'
        className='linkedin'
        target='_blank'
        rel='noopener noreferrer'>
        <LinkedinIcon />
      </a>
      <a
        href='https://twitter.com/xagustin93'
        className='twitter'
        target='_blank'
        rel='noopener noreferrer'>
        <TwitterIcon />
      </a> */}
    </div>
  );
}
