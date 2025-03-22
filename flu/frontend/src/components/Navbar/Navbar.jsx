import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");// to set the activation //
    const {getTotalcartAmount, token, setToken} = useContext(StoreContext);
    const navigate = useNavigate();
    const logout = ()=>{
      localStorage.removeItem("token");
      setToken("")
      navigate("/")
    }

  return (
    <div className='navbar'>
        <Link to='/'><img src="logoc.png" className="logo"></img></Link>
        <ul className="navbar-menu">
             <Link to='/' onClick={()=>setMenu("home")}className={menu === "home" ? "actve" : ""}>Home</Link>

             <a  onClick={() => navigate("/info")} className={`nav-link ${location.pathname === "/info" ? "active" : ""}`}>
                About Us
            </a>
             <a  onClick={() => navigate("/infu")} className={`nav-link ${location.pathname === "/infu" ? "active" : ""}`}>
                Influencer
            </a>
            <a  onClick={() => navigate("/brand")}className={`nav-link ${location.pathname === "/brand" ? "active" : ""}`}>
                Brand
            </a>
             
             <a href='#footer' onClick={()=>setMenu("contact")}className={menu === "contact" ? "actve" : ""}>Contact </a>
        </ul>
        <div className="navbar-right">
             <img src={assets.search_icon} alt="" />
             <div className="navbar-search-icon">
                
                <div className={getTotalcartAmount()===0?"":"dot"}></div>
                </div>
                {!token?<button onClick={()=> setShowLogin(true) }>Sign in</button>
                :<div className='navbar-profile'>
                  <img src={assets.profile_icon} alt="" />
                  <ul className="nav-profile-dropdown">
                    
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                  </ul>
                  </div>}
                
        </div>    
    </div>
  )
}

export default Navbar
