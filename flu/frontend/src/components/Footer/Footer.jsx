import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-left">
            <img className='loog' src="/logoc.png" alt="" />
            <p>bridge the gap between brands and influencers, making collaborations effortless and impactful. The right match, the right time no hassle, just results.
            </p>
            <div className="footer-social-icon">
              <a href="https://www.facebook.com/profile.php?id=100011141617447" target="_blank" rel="noopener noreferrer">
              <img src={assets.facebook_icon} alt="Facebook" />
               </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <img src={assets.twitter_icon} alt="Twitter" />
                   </a>
                   <a href="https://www.linkedin.com/in/srikrishna-hireholi/" target="_blank" rel="noopener noreferrer">
                     <img src={assets.linkedin_icon} alt="LinkedIn" />
                       </a>
            </div>
        </div>
        <div className="footer-centre">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Influencer</li>
                <li>Brand</li>
                <li>Privacy policy</li>
            </ul>
        </div>        
        <div className="footer-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9019755311</li>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" > <li>srikrishnanfs@gmail.com</li> </a>
            </ul>
        </div>

      </div>
      <hr />
      <p className='footer-copyright'>
      Copyright 2024. All rights reserved.
      </p>
    </div>
  )
}

export default Footer
