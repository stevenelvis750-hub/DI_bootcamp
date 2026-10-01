import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

const emptyForm = { name: '', email: '', message: '' };

const details = [
  { icon: faLocationDot, text: '123 Example Street, Your City' },
  { icon: faEnvelope, text: 'hello@example.com' },
  { icon: faPhone, text: '+1 234 567 890' },
];

const socials = [
  { icon: faFacebook, label: 'Facebook' },
  { icon: faXTwitter, label: 'X (Twitter)' },
  { icon: faInstagram, label: 'Instagram' },
  { icon: faLinkedin, label: 'LinkedIn' },
];

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const isComplete = Object.values(form).every((v) => v.trim() !== '');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isComplete) return;
    // No backend here: connect this to your API or a form service to actually send the message
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <section id="contact" className="section contact">
      <h2>Contact Us</h2>
      <p className="section-intro">Have a question? Send us a message and we'll get back to you.</p>

      <div className="contact-grid">
        <div className="contact-info">
          <ul>
            {details.map(({ icon, text }) => (
              <li key={text}>
                <FontAwesomeIcon icon={icon} fixedWidth /> <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="socials">
            {socials.map(({ icon, label }) => (
              <a key={label} href="#contact" aria-label={label}>
                <FontAwesomeIcon icon={icon} size="lg" />
              </a>
            ))}
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" type="text" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
          <label>
            Message
            <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
          </label>
          <button type="submit" disabled={!isComplete}>
            <FontAwesomeIcon icon={faPaperPlane} /> Send message
          </button>
          <p className="form-status" role="status">
            {sent ? 'Thanks! Your message has been sent.' : ''}
          </p>
        </form>
      </div>
    </section>
  );
}