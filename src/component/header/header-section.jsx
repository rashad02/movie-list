import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Dropdown from '../common-component/dropdown.jsx';

import './header.scss';



const Header = ({search, activepage, selectActivePage}) => {
    const [showSerach, setShowSearch] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const cookie = document.cookie;

    const handleChange = (e) => {
        console.log(e.target.value);
        search(e.target.value)
      }
  
    return (
        <div className="header-container col-md-12 col-xs-12">
            <div className="col-md-7 navbar-left col-xs-7">
                <div className="col-md-12 col-xs-12">
                        <Link to='/' onClick={() => selectActivePage('home')}><span className="wordart italic-outline"><span className="text">Showtime</span></span></Link>
                    <span className="col-md-2 col-xs-2 nav-menu">
                        <Link to='/' onClick={() => selectActivePage('home')}><span className= {`nav-menu-text ${activepage === 'home' ? 'selected': ''}`}>Home</span></Link>
                    </span>
                    {cookie ? <>
                    <span className="col-md-2 col-xs-2 nav-menu">
                        <Link to='/movies' onClick={() => selectActivePage('movies')}><span className={`nav-menu-text ${activepage === 'movies' ? 'selected': ''}`}>Movies</span> </Link>
                    </span>
                    <span className="col-md-2 col-xs-2 nav-menu">
                        <Link to='/tv-shows' onClick={() => selectActivePage('tv-shows')}><span className={`nav-menu-text ${activepage === 'tv-shows' ? 'selected': ''}`}>TV Shows</span></Link>
                    </span>
                    <span className="col-md-2 col-xs-2 nav-menu">
                        <Link to='/new-released' onClick={() => selectActivePage('new-released')}><span className={`nav-menu-text ${activepage === 'new-released' ? 'selected': ''}`}>New Released</span></Link>
                    </span></>: ''}
                </div>
            </div>
            <div className="col-md-3 navbar-right search">
                <div className="col-md-12 col-xs-12">
                    <div className="col-md-3 col-xs-3 nav-menu-right">
                        {showSerach ? 
                        <span  className="search-input"><input type="text" placeholder='Search by title' onBlur={() => setShowSearch(false)} onChange= {handleChange}/><i className="fa fa-search"></i></span>
                        :<span className="nav-menu-right cursor-pointer" onClick={() => setShowSearch(true)}><i className="fa fa-search"></i><span className="nav-menu-right"> Search </span></span>}  
                    </div>
                    <div className="col-md-2 col-xs-2 nav-menu-right">
                            <span className="nav-menu-right"><i className="fa fa-bell"></i></span>
                    </div>
                    <div className="col-md-6 col-xs-7 nav-menu-right">
                        <span className="nav-menu-right" >
                            <span className="user-section">
                                <i className="fa fa-user-circle"></i>
                            </span>
                            <span className="username">
                                John Doe
                            </span>
                            <span className="option-caret" onBlur={() => setShowDropdown(false)} onClick={() => setShowDropdown(true)}>
                                <i className="fa fa-caret-down"></i>
                            </span>
                        </span>
                        {showDropdown ? <Dropdown show={showDropdown} resetShow={setShowDropdown}/>: ''}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;