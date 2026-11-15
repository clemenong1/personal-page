import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Copy, Download, ImageIcon, Mail, MapPin } from 'lucide-react';
import {
  activities,
  education,
  experiences,
  featuredProjects,
  findProject,
  otherProjects,
  profile,
  sections,
  skillGroups,
} from '../data/content';
import type { Project } from '../data/content';
import { SOCIAL_ICONS, parsePath, projectPath } from './routes';
import type { PageProps } from './routes';

function Tags({ tags }: { tags: string[] }) {
  if (tags.length === 0) return null;
  return (
    <ul className="tag-list">
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function ProjectImage({ project, full }: { project: Project; full?: boolean }) {
  if (project.image) {
    return (
      <img
        className={`project-shot ${full ? 'project-shot--full' : ''}`}
        src={project.image.src}
        alt={project.image.alt}
        loading="lazy"
      />
    );
  }
  return (
    <div className="project-shot project-shot--empty" role="img" aria-label={sections.projects.placeholderLabel}>
      <ImageIcon size={22} />
      <span>{project.event}</span>
    </div>
  );
}

export function CopyEmail() {
  const copy = sections.about;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // Older browsers and insecure contexts: fall back to a hidden field and the copy command.
      const field = document.createElement('textarea');
      field.value = profile.email;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      field.remove();
    }
    setCopied(true);
  };

  return (
    <div className="email-row">
      <Mail size={15} aria-hidden="true" />
      <span className="email-row__address">{profile.email}</span>
      <button type="button" className={`email-row__copy ${copied ? 'is-copied' : ''}`} onClick={onCopy}>
        {copied ? <Check size={13} /> : <Copy size={13} />}
        <span aria-live="polite">{copied ? copy.copiedLabel : copy.copyLabel}</span>
      </button>
    </div>
  );
}

export function AboutPage() {
  return (
    <div className="about-grid">
      <div>
        <p className="app-eyebrow">
          <MapPin size={14} /> {profile.location}
        </p>
        <h2 className="app-title">{profile.greeting}</h2>
        {profile.bio.map((paragraph) => (
          <p key={paragraph} className="app-lead">
            {paragraph}
          </p>
        ))}
        <p className="currently">
          <span className="currently__label">{sections.about.currentlyLabel}</span>
          {profile.currently}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={profile.resume.pdf} download={profile.resume.fileName} className="btn-primary flex items-center gap-2 text-sm">
            <Download size={15} /> {profile.resume.label}
          </a>
          {profile.socials
            .filter((social) => social.kind !== 'email')
            .map((social) => {
              const Icon = SOCIAL_ICONS[social.kind];
              return (
                <a
                  key={social.kind}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2 text-sm"
                >
                  <Icon size={15} /> {social.label}
                </a>
              );
            })}
        </div>
        <CopyEmail />
      </div>
      <div className="about-photo">
        <img src={profile.photo} alt={profile.name} />
      </div>
    </div>
  );
}

export function ExperiencePage({ openTab }: PageProps) {
  const copy = sections.experience;
  return (
    <div>
      <h2 className="app-title">{copy.title}</h2>
      <p className="app-lead">{copy.lead}</p>

      <ol className="timeline">
        {experiences.map((item) => (
          <li key={item.id} className="timeline__item">
            <div className="timeline__head">
              <h3 className="timeline__role">
                {item.role} <span className="timeline__company">· {item.company}</span>
              </h3>
              <p className="timeline__meta">
                {item.upcoming && <span className="timeline__badge">{copy.upcomingLabel}</span>}
                {item.current && <span className="timeline__badge timeline__badge--current">{copy.currentLabel}</span>}
                {item.dates} · {item.location}
              </p>
            </div>
            {item.summary && <p className="timeline__summary">{item.summary}</p>}
            <ul className="timeline__bullets">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <Tags tags={item.tags} />
            {item.photos && (
              <div className="timeline__photos">
                {item.photos.map((photo) => (
                  <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" />
                ))}
              </div>
            )}
            {item.projects?.map((slug) => {
              const project = findProject(slug);
              return (
                project && (
                  <button
                    key={slug}
                    type="button"
                    className="back-link mt-3"
                    onClick={() => openTab(projectPath(slug))}
                  >
                    {project.title} <ArrowRight size={14} />
                  </button>
                )
              );
            })}
            {item.links?.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="back-link mt-3">
                {link.label} <ArrowUpRight size={14} />
              </a>
            ))}
          </li>
        ))}
      </ol>

      <div className="two-col mt-10">
        <section>
          <h3 className="section-title">{copy.educationTitle}</h3>
          {education.map((item) => (
            <div key={item.school} className="card mt-3">
              <p className="font-semibold text-white">{item.school}</p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{item.degree}</p>
              <p className="timeline__meta mt-2">
                {item.dates} · {item.note}
              </p>
            </div>
          ))}
        </section>
        <section>
          <h3 className="section-title">{copy.activitiesTitle}</h3>
          {activities.map((item) => (
            <div key={item.organisation} className="card mt-3">
              <p className="font-semibold text-white">
                {item.role} <span className="timeline__company">· {item.organisation}</span>
              </p>
              <p className="mt-1 text-sm text-[color:var(--muted)]">{item.description}</p>
              <p className="timeline__meta mt-2">{item.dates}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function ProjectDetail({ project, navigate }: { project: Project; navigate: PageProps['navigate'] }) {
  const copy = sections.projects;
  return (
    <article className="project-detail">
      <button type="button" className="back-link" onClick={() => navigate('/projects')}>
        <ArrowLeft size={14} /> {copy.backLabel}
      </button>
      <p className="app-eyebrow mt-4">
        {project.event} · {project.dates}
      </p>
      <h2 className="app-title">{project.title}</h2>
      <p className="app-lead">
        {project.role}. {project.summary}
      </p>

      <div className="project-detail__grid">
        <div>
          <h3 className="section-title">{copy.problemTitle}</h3>
          <p className="detail-text">{project.problem}</p>

          <h3 className="section-title mt-6">{copy.builtTitle}</h3>
          <ul className="timeline__bullets">
            {project.built.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>

          {project.outcome && (
            <>
              <h3 className="section-title mt-6">{copy.outcomeTitle}</h3>
              <p className="detail-text detail-text--outcome">{project.outcome}</p>
            </>
          )}
        </div>
        <aside>
          <ProjectImage project={project} full />
          <h3 className="section-title mt-6">{copy.stackTitle}</h3>
          <Tags tags={project.tags} />
          {project.links.length > 0 && (
            <>
              <h3 className="section-title mt-6">{copy.linksTitle}</h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2 text-sm"
                  >
                    {link.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
            </>
          )}
        </aside>
      </div>
    </article>
  );
}

function ProjectCard({ project, open, picture }: { project: Project; open: PageProps['openTab']; picture: boolean }) {
  return (
    <button type="button" className="project-card card" onClick={() => open(projectPath(project.slug))}>
      {picture && <ProjectImage project={project} />}
      <span className={`app-eyebrow ${picture ? 'mt-4' : ''}`}>
        {project.event} · {project.dates}
      </span>
      <span className="project-card__title">{project.title}</span>
      <span className="project-card__summary">{project.summary}</span>
      {project.outcome && <span className="project-card__outcome">{project.outcome}</span>}
    </button>
  );
}

export function ProjectsPage({ path, navigate, openTab }: PageProps) {
  const copy = sections.projects;
  const { project: slug } = parsePath(path);
  const selected = slug ? findProject(slug) : undefined;
  if (selected) return <ProjectDetail project={selected} navigate={navigate} />;

  return (
    <div>
      <h2 className="app-title">{copy.title}</h2>
      <p className="app-lead">{copy.lead}</p>

      <div className="project-grid">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} open={openTab} picture />
        ))}
      </div>
      <div className="project-grid project-grid--compact">
        {otherProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} open={openTab} picture={false} />
        ))}
      </div>
    </div>
  );
}

export function SkillsPage() {
  const copy = sections.skills;
  return (
    <div>
      <h2 className="app-title">{copy.title}</h2>
      <p className="app-lead">{copy.lead}</p>

      <div className="skill-groups">
        {skillGroups.map((group) => (
          <section key={group.category} className="card">
            <h3 className="section-title">{group.category}</h3>
            <Tags tags={group.skills.map((skill) => skill.name)} />
          </section>
        ))}
      </div>
    </div>
  );
}
