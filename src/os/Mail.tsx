import ContactForm from '../components/ContactForm';
import { profile, sections } from '../data/content';
import { CopyEmail } from './pages';

/** The contact form, dressed as a new message. The form itself and how it submits are unchanged. */
export default function MailApp() {
  const copy = sections.mail;
  return (
    <div className="mail">
      <div className="mail__head">
        <h2 className="mail__title">{copy.title}</h2>
        <div className="mail__to">
          <span className="mail__label">{copy.toLabel}</span>
          <span className="mail__recipient">{profile.name}</span>
          <CopyEmail />
        </div>
      </div>
      <div className="window__body">
        <p className="mail__lead">{copy.lead}</p>
        <ContactForm />
      </div>
    </div>
  );
}
