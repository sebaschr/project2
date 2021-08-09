import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../store/user/UserContext';
import { useHistory, Link } from 'react-router-dom';
import {
  faBars,
  faTimes,
  faCartPlus,
  faSignOutAlt,
  faSignInAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Navbar(props) {
  const { checkIfSignedIn, signOut } = useContext(UserContext);
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const [logged, setLogged] = useState();
  useEffect(() => {
    let auth = checkIfSignedIn();
    setLogged(auth);
  }, [checkIfSignedIn]);
  return (
    <nav className="navbar">
      {windowDimensions.width < 1200 ? (
        <>
          <div className="navbar__content">
            {isOpen ? (
              <FontAwesomeIcon
                className="navbar__icon"
                icon={faTimes}
                onClick={(e) => {
                  setIsOpen(false);
                }}
              />
            ) : (
              <FontAwesomeIcon
                className="navbar__icon"
                icon={faBars}
                onClick={(e) => {
                  setIsOpen(true);
                }}
              />
            )}
            <Link to="/" className="navbar__link navbar__logo">
              ad meliora.
            </Link>
            <Link to="/cart" className="navbar__item --sign">
              <FontAwesomeIcon className="navbar__icon" icon={faCartPlus} />
            </Link>
          </div>
          {isOpen && (
            <div className="navbar__links">
              <Link to="/products" className="navbar__item">
                ALL
              </Link>

              <Link
                to={{
                  pathname: '/products',
                  search: '?=tops',
                  state: 1,
                }}
                className="navbar__item"
              >
                TOPS
              </Link>

              <Link
                to={{
                  pathname: '/products',
                  search: '?=bottoms',
                  state: 2,
                }}
                className="navbar__item"
              >
                BOTTOMS
              </Link>

              <Link
                to={{
                  pathname: '/products',
                  search: '?=accessories',
                  state: 3,
                }}
                className="navbar__item"
              >
                ACCESSORIES
              </Link>

              {logged ? (
                <Link
                  to="/"
                  className="navbar__item --sign"
                  onClick={(e) => {
                    signOut();
                  }}
                >
                  Sign Out
                </Link>
              ) : (
                <Link to="/signin" className="navbar__item --sign">
                  Sign In
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="navbar__content">
          <Link to="/" className="navbar__link navbar__logo">
            ad meliora.
          </Link>

          <div className="navbar__links">
            <Link to="/products" className="navbar__item">
              ALL
            </Link>

            <Link
              to={{
                pathname: '/products',
                search: '?=tops',
                state: 1,
              }}
              className="navbar__item"
            >
              TOPS
            </Link>

            <Link
              to={{
                pathname: '/products',
                search: '?=bottoms',
                state: 2,
              }}
              className="navbar__item"
            >
              BOTTOMS
            </Link>

            <Link
              to={{
                pathname: '/products',
                search: '?=accessories',
                state: 3,
              }}
              className="navbar__item"
            >
              ACCESSORIES
            </Link>
          </div>
          <Link to="/cart" className="navbar__item --sign">
            <FontAwesomeIcon className="navbar__icon" icon={faCartPlus} />
          </Link>
          {logged ? (
            <Link
              to="/"
              className="navbar__item --sign"
              onClick={(e) => {
                signOut();
              }}
            >
              <FontAwesomeIcon className="navbar__icon" icon={faSignOutAlt} />
            </Link>
          ) : (
            <Link to="/signIn" className="navbar__item --sign">
              <FontAwesomeIcon className="navbar__icon" icon={faSignInAlt} />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
