export type AppId = 'about' | 'work' | 'skills' | 'contact';

/** What the avatar says when the laptop opens and when each app is launched. */
export const intros: Record<AppId | 'welcome', string> = {
  welcome: "Hey, I'm Clemen! Welcome to my laptop. Pick an app and I'll walk you through it.",
  about: "This one's all about me: who I am and what I like building.",
  work: "Here's what I've been building. Hackathon projects, apps, and a machine learning model too.",
  skills: 'These are the tools I reach for most. Hover the logos, they like the attention.',
  contact: 'Want to chat? Drop me a message here and it lands straight in my inbox.',
};
