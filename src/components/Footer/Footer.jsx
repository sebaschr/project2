import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../store/user/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
export default function Footer(props) {
  const { checkIfSignedIn, signOut } = useContext(UserContext);
  const [logged, setLogged] = useState();
  useEffect(() => {
    let auth = checkIfSignedIn();
    setLogged(auth);
  }, [checkIfSignedIn]);
  return (
    <section className="footer">
      <div className="footer__links">
        <Link className="footer__link" to="/">
          ALL
        </Link>
        <Link className="footer__link" to="/">
          TOPS
        </Link>
        <Link className="footer__link" to="/">
          BOTTOM
        </Link>
        <Link className="footer__link" to="/">
          ACCESSORIES
        </Link>
        <Link className="footer__link" to="/">
          SHOPPING CART
        </Link>
        {logged ? (
          <Link
            to="/"
            className="footer__link --sign"
            onClick={(e) => {
              signOut();
            }}
          >
            Sign Out
          </Link>
        ) : (
          <Link to="/signin" className="footer__link --sign">
            Sign In
          </Link>
        )}
      </div>

      <section className="footer__socialsDiv">
        <a href="https://www.facebook.com" className="footer__socials">
          <FontAwesomeIcon className="footer__icon" icon={faFacebook} />
        </a>

        <a href="https://www.twitter.com" className="footer__socials">
          <FontAwesomeIcon className="footer__icon" icon={faTwitter} />
        </a>

        <a href="https://www.instagram.com" className="footer__socials">
          <FontAwesomeIcon className="footer__icon" icon={faInstagram} />
        </a>
      </section>
    </section>
  );
}
