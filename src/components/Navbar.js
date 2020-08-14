import React from 'react';
import {Link} from 'react-router-dom';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import '../css/Navbar.css';

export default function Navbar() {
    return (
        <div>
            <nav id="navbar">
          <h1 className="logo">
            <span className="text-primary">
             Covid</span><TrendingUpIcon fontSize="large" style={{color:'rgb(173, 255, 47)'}} /><span style={{color:'rgb(243, 28, 21)'}}>Tracker</span>
          </h1>
          <ul>
            <li><Link to="/dashboard"> Dashboard </Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/precautions"> Precautions </Link></li>
            {/* <li><Link to="/donate">Donate</Link></li> */}
            <li><Link to="/usefulLinks">Useful Links</Link></li>
      
          </ul>
        </nav>
        </div>
    )
}
