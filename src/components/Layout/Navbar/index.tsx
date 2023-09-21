import React from 'react';
import {
  faChartSimple,
  faFileSignature
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dAppName } from 'config';
import { logout } from 'helpers';
import { useGetIsLoggedIn } from 'hooks';
import { routeNames } from 'routes';

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  return (
    <BsNavbar className='bg-white border-bottom px-4 py-3'>
      <div className='container-fluid'>
        <Link
          className='d-flex align-items-center navbar-brand mr-0'
          to={isLoggedIn ? routeNames.dashboard : routeNames.home}
        >
          <div className='multiversx-logo' />
        </Link>

        <Nav className='ml-auto'>
          {isLoggedIn && (
            <>
              <NavItem>
                <button className='joinButton' onClick={handleLogout}>
                  Logout
                </button>
              </NavItem>
            </>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};
