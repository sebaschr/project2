import Navbar from '../Navbar/Navbar';
import Banner from '../General/Banner';

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <Banner
        img="https://images.pexels.com/photos/4937222/pexels-photo-4937222.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
        title="Ad meliora."
        text="More than just a brand, our goal is to change your perspective on life and live in the present."
        button="SHOP NOW"
      />

      <section className="quotes">
        <p className="quotes__title">Ad meliora.</p>
        <p className="quotes__text"> Always ' towards better things '. </p>
      </section>

      <section className="images">
        <div className="images__container">
          <div className="images__content">
            <p className="images__title">Lorem Ipsum</p>
            <p className="images__text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus, corporis!
            </p>
          </div>
          <img
            className="images__image"
            src="https://images.unsplash.com/photo-1613728455120-d00493b5e77e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
            alt=""
          />
        </div>
      </section>
    </>
  );
}
