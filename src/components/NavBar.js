import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark rounded-3'>
        <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className='navbar-nav'>
                    <li>
                        <NavLink to="/" className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }`}>
                            Counter
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/fetcher" className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }`}>
                            Data Fetcher
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/filter" className={ ({ isActive }) => `nav-link ${ isActive ? 'active' : '' }`}>
                            Data Fetcher Filter
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}

export default NavBar;
