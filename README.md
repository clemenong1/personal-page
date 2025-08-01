# Clemen Ong Jun Kai - Portfolio Website

A modern, dark-themed portfolio website built with React, TypeScript, and Tailwind CSS. This website showcases Clemen's professional work, skills, and personal projects.

## 🚀 Features

- **Modern Design**: Dark theme with clean, professional aesthetics
- **Responsive Layout**: Mobile-first approach with responsive design
- **Smooth Animations**: Subtle hover effects and transitions
- **SEO Optimized**: Proper meta tags and structured data
- **Accessibility**: ARIA labels and keyboard navigation support
- **Performance**: Optimized for fast loading and smooth interactions

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Build Tool**: Vite
- **Deployment**: Vercel-ready

## 📋 Sections

1. **Hero Section**: Introduction and social links
2. **Professional Work**: Key projects and experiences
3. **Skills & Technologies**: Technical expertise organized by category
4. **Personal Projects**: Personal coding projects
5. **Education & Activities**: Academic background and community involvement
6. **Contact**: Contact form and information

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/clemenong1/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── ProjectCard.tsx # Project display card
│   ├── SkillBadge.tsx  # Skill display badge
│   ├── ContactForm.tsx # Contact form
│   └── Footer.tsx      # Footer component
├── data/               # Data files
│   ├── projects.ts     # Project information
│   └── skills.ts       # Skills data
├── styles/             # Global styles
│   └── globals.css     # Tailwind and custom styles
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🎨 Customization

### Colors
The color scheme is defined in `tailwind.config.js`:
- `dark-bg`: Main background color
- `dark-card`: Card background color
- `dark-border`: Border colors
- `accent-blue`: Primary accent color

### Content
Update the following files to customize content:
- `src/data/projects.ts`: Add/modify projects
- `src/data/skills.ts`: Update skills and categories
- `src/components/Hero.tsx`: Update personal information
- `src/components/Education.tsx`: Update education and activities

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Deployment

1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting provider

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔧 Development

### Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Tailwind CSS for styling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## �� Contact

- **Email**: clemenongjunkai@gmail.com
- **LinkedIn**: [clemenong1](https://www.linkedin.com/in/clemenong1)
- **GitHub**: [clemenong1](https://github.com/clemenong1)

---

Built with ❤️ by Clemen Ong Jun Kai