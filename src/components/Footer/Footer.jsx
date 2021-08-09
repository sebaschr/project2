import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { checkIfSignedIn, signOut } from '../../services/user-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from '../../store/user/UserContext';
import {
  faTwitter,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
export default function Footer(props) {
  const { clearCart } = useContext(UserContext);
  const [logged, setLogged] = useState();
  useEffect(() => {
    let auth = checkIfSignedIn();
    setLogged(auth);
  }, []);
  return (
    <section className="footer">
      <div className="footer__links">
        <Link className="footer__link" to="/">
          ALL
        </Link>
        <Link
          to={{
            pathname: '/products',
            search: '?=tops',
            state: 1,
          }}
          className="footer__link"
        >
          TOPS
        </Link>
        <Link
          to={{
            pathname: '/products',
            search: '?=bottoms',
            state: 2,
          }}
          className="footer__link"
        >
          BOTTOM
        </Link>
        <Link
          to={{
            pathname: '/products',
            search: '?=accessories',
            state: 3,
          }}
          className="footer__link"
        >
          ACCESSORIES
        </Link>
        <Link className="footer__link" to="/cart">
          SHOPPING CART
        </Link>
        {logged ? (
          <Link
            to="/"
            className="footer__link --sign"
            onClick={(e) => {
              signOut();
              clearCart();
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
