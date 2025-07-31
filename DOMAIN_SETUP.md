# Domain Setup Guide - www.clemenong.com

This guide will help you set up your custom domain `www.clemenong.com` for your portfolio website on Vercel.

## 🚀 Quick Setup Steps

### 1. Add Domain in Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to **Settings** → **Domains**
4. Click **"Add Domain"**
5. Enter: `www.clemenong.com`
6. Click **"Add"**

### 2. Configure DNS Records

You need to add DNS records at your domain registrar (where you purchased clemenong.com).

#### Option A: If you want www.clemenong.com as primary

Add these DNS records:

```
Type: A
Name: @
Value: 76.76.19.19
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

#### Option B: If you want clemenong.com (without www) as primary

Add these DNS records:

```
Type: A
Name: @
Value: 76.76.19.19
TTL: 3600

Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

Then in Vercel, also add `clemenong.com` as a domain and set up redirects.

### 3. Verify Domain

After adding DNS records:
1. Wait 5-10 minutes for DNS propagation
2. Go back to Vercel dashboard
3. Check if the domain shows as "Valid" (green checkmark)
4. If not, click "Verify" to re-check

## 🔧 Common Domain Registrars Setup

### GoDaddy
1. Log into GoDaddy account
2. Go to **My Products** → **DNS**
3. Find clemenong.com and click **"DNS"**
4. Add the A and CNAME records above

### Namecheap
1. Log into Namecheap account
2. Go to **Domain List** → **Manage**
3. Go to **Advanced DNS**
4. Add the A and CNAME records above

### Google Domains
1. Log into Google Domains
2. Select clemenong.com
3. Go to **DNS** → **Custom records**
4. Add the A and CNAME records above

### Cloudflare
1. Log into Cloudflare
2. Select clemenong.com
3. Go to **DNS** → **Records**
4. Add the A and CNAME records above
5. Make sure DNS is set to "DNS only" (not proxied)

## 🔄 Redirects Setup (Optional)

If you want to redirect `clemenong.com` to `www.clemenong.com`:

1. Add `clemenong.com` as another domain in Vercel
2. In Vercel dashboard, go to **Settings** → **Domains**
3. Click on `clemenong.com`
4. Set up redirect to `https://www.clemenong.com`

## 📱 SSL Certificate

Vercel automatically provides SSL certificates for custom domains. Once your domain is verified, you'll have:
- `https://www.clemenong.com` (secure)
- Automatic HTTPS redirect

## 🔍 Testing Your Domain

After setup, test these URLs:
- `https://www.clemenong.com` (should work)
- `http://www.clemenong.com` (should redirect to HTTPS)
- `https://clemenong.com` (if you set up redirects)

## 🐛 Troubleshooting

### Domain Not Working
1. **Check DNS propagation**: Use [whatsmydns.net](https://whatsmydns.net)
2. **Verify DNS records**: Make sure they match exactly
3. **Wait longer**: DNS can take up to 48 hours to propagate

### SSL Issues
1. Wait for Vercel to provision SSL certificate (usually 5-10 minutes)
2. Check if domain is properly verified in Vercel

### Redirect Issues
1. Clear browser cache
2. Check if redirects are set up correctly in Vercel
3. Test in incognito/private browsing mode

## 📧 Email Setup (Optional)

If you want email with your domain:

### Option 1: Google Workspace
1. Sign up for Google Workspace
2. Add MX records as provided by Google
3. Verify domain ownership

### Option 2: Zoho Mail
1. Sign up for Zoho Mail
2. Add MX records as provided by Zoho
3. Verify domain ownership

## 🔒 Security Considerations

Your domain now has:
- ✅ SSL/HTTPS encryption
- ✅ Security headers (configured in vercel.json)
- ✅ Automatic HTTPS redirects
- ✅ Protection against common attacks

## 📊 Analytics Setup (Optional)

To track visitors to your domain:

### Google Analytics
1. Create Google Analytics account
2. Add tracking code to your website
3. Set up goals and conversions

### Vercel Analytics
1. Enable Vercel Analytics in your project
2. Get insights about performance and visitors

## 🎯 Next Steps

After domain setup:
1. **Test all pages** on your new domain
2. **Update social media profiles** with new URL
3. **Update business cards** and resume
4. **Set up email forwarding** if needed
5. **Monitor performance** and analytics

---

**Need Help?** If you encounter issues:
- Check Vercel's [domain documentation](https://vercel.com/docs/concepts/projects/custom-domains)
- Contact your domain registrar's support
- Check DNS propagation with online tools 