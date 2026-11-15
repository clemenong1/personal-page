import { Download } from 'lucide-react';
import { profile, sections } from '../data/content';

/** The resume as a page image (it displays on every device), with the real PDF one click away. */
export default function PreviewApp() {
  const copy = sections.preview;
  return (
    <div className="preview">
      <div className="preview__toolbar">
        <span className="preview__name">{profile.resume.fileName}</span>
        <a href={profile.resume.pdf} download={profile.resume.fileName} className="preview__download">
          <Download size={14} /> {copy.downloadLabel}
        </a>
      </div>
      <div className="window__body preview__body">
        <img className="preview__page" src={profile.resume.preview} alt={copy.imageAlt} />
      </div>
    </div>
  );
}
