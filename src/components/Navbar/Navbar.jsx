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
  const { checkIfSignedIn } = useContext(UserContext);
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
  const history = useHistory();
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
              Sloth & Co
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

              <Link to="/" className="navbar__item">
                TOPS
              </Link>

              <Link to="/" className="navbar__item">
                BOTTOMS
              </Link>

              <Link to="/" className="navbar__item">
                ACCESSORIES
              </Link>

              {logged ? (
                <Link to="/" className="navbar__item --sign">
                  Sign Out
                </Link>
              ) : (
                <Link
                  className="navbar__button"
                  onClick={(e) => {
                    history.push(`/signin`);
                  }}
                >
                  Sign In
                </Link>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="navbar__content">
          <Link to="/" className="navbar__link navbar__logo">
            Sloth & Co
          </Link>

          <div className="navbar__links">
            <Link to="/products" className="navbar__item">
              ALL
            </Link>

            <Link to="/" className="navbar__item">
              TOPS
            </Link>

            <Link to="/" className="navbar__item">
              BOTTOMS
            </Link>

            <Link to="/" className="navbar__item">
              ACCESSORIES
            </Link>
          </div>
          <Link to="/cart" className="navbar__item --sign">
            <FontAwesomeIcon className="navbar__icon" icon={faCartPlus} />
          </Link>
          {logged ? (
            <Link to="/" className="navbar__item --sign">
              <FontAwesomeIcon className="navbar__icon" icon={faSignOutAlt} />
            </Link>
          ) : (
            <Link to="/" className="navbar__item --sign">
              <FontAwesomeIcon className="navbar__icon" icon={faSignInAlt} />
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
