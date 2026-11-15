import { Briefcase, Compass, FileText, Mail, Rocket, Sparkles, User } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import { findProject, profile, sections } from '../data/content';
import type { AppId, PageId, SocialKind } from '../data/content';

export interface AppDefinition {
  id: AppId;
  label: string;
  icon: LucideIcon;
  color: string;
  /** Preferred window size; the desktop shrinks it to fit. */
  size?: { w: number; h: number };
}

export const APPS: AppDefinition[] = [
  { id: 'browser', label: sections.browser.label, icon: Compass, color: '#6aa8ff' },
  { id: 'mail', label: sections.mail.label, icon: Mail, color: '#ff7a6b', size: { w: 560, h: 660 } },
  { id: 'preview', label: sections.preview.label, icon: FileText, color: '#ffc857', size: { w: 660, h: 900 } },
];

export interface PageDefinition {
  id: PageId;
  path: string;
  label: string;
  icon: LucideIcon;
  color: string;
}

/** The site's pages, in the order they appear in the favourites bar and on the desktop. */
export const PAGES: PageDefinition[] = [
  { id: 'about', path: '/about', label: sections.about.label, icon: User, color: '#ffc857' },
  { id: 'experience', path: '/experience', label: sections.experience.label, icon: Briefcase, color: '#c89bff' },
  { id: 'projects', path: '/projects', label: sections.projects.label, icon: Rocket, color: '#7ee06a' },
  { id: 'skills', path: '/skills', label: sections.skills.label, icon: Sparkles, color: '#6aa8ff' },
];

export const HOME_PATH = '/about';

export const projectPath = (slug: string) => `/projects/${slug}`;

/** What the address bar shows for a path. */
export const displayUrl = (path: string) => `${profile.website}${path}`;

export function parsePath(path: string): { page: PageId; project?: string } {
  const [, first, second] = path.split('/');
  const page = PAGES.find((item) => item.id === first)?.id ?? 'about';
  return page === 'projects' && second ? { page, project: second } : { page };
}

/** The tab title: the project's name when one is open, otherwise the page's. */
export function pathTitle(path: string): string {
  const { page, project } = parsePath(path);
  return (project && findProject(project)?.title) || sections[page].label;
}

export interface PageProps {
  path: string;
  /** Go somewhere in the current tab. */
  navigate: (path: string) => void;
  /** Open a path in a new tab (or switch to the tab already showing it). */
  openTab: (path: string) => void;
}

export const SOCIAL_ICONS: Record<SocialKind, IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
};
