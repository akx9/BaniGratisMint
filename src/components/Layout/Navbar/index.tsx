import React from 'react';
import { Navbar as BsNavbar, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { logout } from 'helpers';
import { useGetIsLoggedIn } from 'hooks';
import { routeNames } from 'routes';

export const Navbar = () => {
  const isLoggedIn = useGetIsLoggedIn();

  const handleLogout = () => {
    logout(`${window.location.origin}/unlock`);
  };

  const discordLink = "https://discord.gg/Uw3gQunWGv"; // Replace with your Discord invite link

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
          <NavItem>
            {isLoggedIn ? (
              <button className='joinButton' onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <a href={discordLink} className='joinButton' target='_blank' rel='noopener noreferrer'>
                Join Discord
              </a>
            )}
          </NavItem>
        </Nav>
      </div>
    </BsNavbar>
  );
};
