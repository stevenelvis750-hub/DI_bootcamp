import Header from './components/Header';
import Card from './components/Card';
import Contact from './components/contact';
import { faBolt, faShieldHalved, faHeadset } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const cards = [
  {
    icon: faBolt,
    title: 'Fast & Reliable',
    text: 'Pages load quickly and stay online, so your visitors never wait around.',
  },
  {
    icon: faShieldHalved,
    title: 'Secure by Design',
    text: 'Your data is protected with modern security practices from day one.',
  },
  {
    icon: faHeadset,
    title: 'Friendly Support',
    text: 'A real person is always ready to help whenever you get stuck.',
  },
];

export default function App() {
  return (
    <>
      <Header />

      <main>
        <section id="home" className="hero">
          <h1>Build something people love</h1>
          <p>A simple, responsive starting point for your next idea.</p>
          <a href="#contact" className="btn">Get in touch</a>
        </section>

        <section id="features" className="section">
          <h2>Why choose us</h2>
          <div className="card-grid">
            {cards.map((card) => (
              <Card key={card.title} {...card} />
            ))}
          </div>
        </section>

        <Contact />
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Launchpad. All rights reserved.</p>
      </footer>
    </>
  );
}