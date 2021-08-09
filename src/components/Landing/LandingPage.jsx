import Navbar from '../Navbar/Navbar';
import Banner from '../General/Banner';
import Footer from '../Footer/Footer';
import InformationBanner from '../InformationBanner/InformationBanner';

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <Banner
        img="https://images.pexels.com/photos/4937222/pexels-photo-4937222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        title="Ad meliora."
        text="More than just a brand our goal is to change your perspective on life and live in the present."
        button="SHOP NOW"
      />

      <section className="quotes">
        <p className="quotes__title">Ad meliora.</p>
        <p className="quotes__text"> Always ' towards better things '. </p>
      </section>

      <section className="infobanners">
        <InformationBanner
          image="https://i.pinimg.com/originals/14/6b/66/146b66a522ee1efeec2700626613a861.jpg"
          alt="Skateboarding Image"
          title="Different Lifestyle"
          text="Feel the empowerment of being who you are."
        />

        <InformationBanner
          image="https://i.pinimg.com/736x/2d/78/85/2d788596cfe1b5c75bba874df43e50e0.jpg"
          alt="Kombi Pink Van"
          title="Anywhere"
          text="Be who you are, wherever."
          right
        />

        <InformationBanner
          image="https://i.pinimg.com/originals/a5/93/a5/a593a5fe191e5d28a6e3a09fdf5337c8.jpg"
          alt="Girl Shirt"
          title="Freedom"
          text="Be yourself with no shame."
        />

        <InformationBanner
          image="https://data.whicdn.com/images/330066630/original.jpg"
          alt="Bedroom"
          title="Dream"
          text="Be whatever you want to be."
          right
        />
      </section>

      <Footer />
    </>
  );
}
