export default function InformationBanner(props) {
  const { image, alt, title, text, right } = props;

  return (
    <div className={right ? 'infobanners__info --right' : 'infobanners__info'}>
      <img className="infobanners__image" src={image} alt={alt} />
      <div className="infobanners__content">
        <h3 className="infobanners__title">{title}</h3>
        <p className="infobanners__text">{text}</p>
      </div>
    </div>
  );
}
