import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // required carousel styles
import './App.css';

const destinations = [
  {
    name: 'Hong Kong',
    src: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/jrfyzvgzvhs1iylduuhj.jpg',
  },
  {
    name: 'Macao',
    src: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/c1cklkyp6ms02tougufx.webp',
  },
  {
    name: 'Japan',
    src: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/e8fnw35p6zgusq218foj.webp',
  },
  {
    name: 'Las Vegas',
    src: 'https://res.klook.com/image/upload/fl_lossy.progressive,q_65/c_fill,w_480,h_384/cities/liw377az16sxmp9a6ylg.webp',
  },
];

export default function App() {
  return (
    <main className="app">
      <h1>Popular Destinations</h1>

      <div className="carousel-wrapper">
        <Carousel
          autoPlay
          infiniteLoop
          interval={3000}
          transitionTime={500}
          stopOnHover
          swipeable
          emulateTouch
          showStatus={false}
        >
          {destinations.map(({ name, src }) => (
            <div key={name}>
              <img src={src} alt={name} />
              <p className="legend">{name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </main>
  );
}