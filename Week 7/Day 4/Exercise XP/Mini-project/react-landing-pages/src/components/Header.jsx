import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark, faRocket } from '@fortawesome/free-solid-svg-icons';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav" aria-label="Main navigation">
        <a href="#home" className="brand">
          <FontAwesomeIcon icon={faRocket} /> Launchpad
        </a>

        {/* Hamburger button: only visible on small screens */}
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="nav-links"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} />
        </button>

        <ul id="nav-links" className={`nav-links${open ? ' open' : ''}`}>
          {links.map(({ label, href }) => (
            <li key={href}>
              <a href={href} onClick={() => setOpen(false)}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}