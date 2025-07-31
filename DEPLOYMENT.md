# Deployment Guide - Clemen Ong Portfolio

This guide will help you deploy the portfolio website to various platforms.

## 🚀 Quick Deploy to Vercel (Recommended)

### Option 1: Deploy from GitHub
1. Push your code to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will automatically detect it's a Vite project
6. Click "Deploy"

### Option 2: Deploy from Local
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to deploy

## 🌐 Other Deployment Options

### Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to [netlify.com](https://netlify.com)
3. Or connect your GitHub repository

### GitHub Pages
1. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Run: `npm run deploy`

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 🔧 Environment Variables

If you need to add environment variables:

### Vercel
1. Go to your project dashboard
2. Navigate to Settings > Environment Variables
3. Add your variables

### Netlify
1. Go to Site settings > Environment variables
2. Add your variables

## 📱 Custom Domain Setup

### Vercel
1. Go to your project dashboard
2. Navigate to Settings > Domains
3. Add your custom domain
4. Update DNS records as instructed

### Netlify
1. Go to Site settings > Domain management
2. Add custom domain
3. Update DNS records

## 🔍 SEO Optimization

The website includes:
- Meta tags for social sharing
- Open Graph tags
- Twitter Card tags
- Proper heading structure
- Alt text for images

## 📊 Performance Optimization

The build includes:
- Code splitting
- Minification
- Gzip compression
- Optimized assets

## 🔒 Security Headers

The `vercel.json` includes security headers:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

## 📈 Analytics (Optional)

To add Google Analytics:
1. Get your tracking ID from Google Analytics
2. Add to `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🐛 Troubleshooting

### Build Errors
- Check Node.js version (v16+ required)
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check for TypeScript errors: `npm run build`

### Deployment Issues
- Ensure all files are committed to git
- Check build logs in deployment platform
- Verify environment variables are set correctly

### Performance Issues
- Run `npm run build` locally to check bundle size
- Use Lighthouse to audit performance
- Optimize images and assets

## 📞 Support

For deployment issues:
- Check the platform's documentation
- Review build logs
- Contact platform support

---

**Note**: The website is optimized for Vercel deployment and includes all necessary configuration files. 