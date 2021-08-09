import { Link } from 'react-router-dom';

export default function LandingPage(props) {
  const { img, text, title } = props;
  return (
    <div>
      <div
        className={props.size ? 'banner__container --sm' : 'banner__container'}
        style={{ backgroundImage: `url(${img})` }}
      ></div>
      <div className={props.size ? 'banner --sm' : 'banner'}>
        <h2 className="banner__title">{title}</h2>
        <p className="banner__text">{text}</p>

        {props.button && (
          <Link to="/products">
            <button className="banner__button">{props.button}</button>
          </Link>
        )}
      </div>
    </div>
  );
}
