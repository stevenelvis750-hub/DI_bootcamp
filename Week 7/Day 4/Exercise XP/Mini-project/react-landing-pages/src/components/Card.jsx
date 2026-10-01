import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Reusable card: pass an icon, a title, some text and (optionally) a link
export default function Card({ icon, title, text, linkLabel = 'Learn more', href = '#contact' }) {
  return (
    <article className="card">
      <div className="card-icon">
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href={href} className="card-link">
        {linkLabel} <FontAwesomeIcon icon={faArrowRight} />
      </a>
    </article>
  );
}