# Deployment Guide - TradeBench (Netlify + Supabase)

## 🚀 Quick Deploy to Netlify + Supabase

### Prerequisites
- Netlify account
- Supabase project
- (Optional) Google AdSense account

### Step 1: Configure Supabase
1. Create a new Supabase project
2. Run the SQL migration from `VERCEL-SUPABASE-MIGRATION.md`
3. Get your Project URL and Anon Key from Supabase Settings

### Step 2: Deploy to Netlify
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Set environment variables in Netlify:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_ADSENSE_PUBLISHER_ID=ca-pub-xxxxxxxxxxxxxxxx (optional)
   VITE_ADSENSE_ENABLED=true (optional)
   ```
4. Deploy!

### Step 3: Configure AdSense (Optional)
1. Get your AdSense Publisher ID
2. Update ad slots in `src/components/ads/AdProvider.jsx`
3. Set environment variables in Netlify

## 🔧 Local Development

### Setup
```bash
# Copy environment template
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_ADSENSE_PUBLISHER_ID`: Your AdSense publisher ID
- `VITE_ADSENSE_ENABLED`: Enable/disable ads

## 🎯 Features Implemented

### ✅ Smart API Client
- Automatically switches between local and Supabase modes
- Zero UI changes required
- Backward compatible

### ✅ AdSense Integration
- Sticky header and footer ads
- User-friendly close buttons
- Session memory for preferences
- Context-aware (hides during quizzes)

### ✅ Netlify Optimization
- Build optimizations
- Environment variable support
- SPA routing configuration
- Security headers
- Asset caching

## 📱 Ad Placement Strategy

### Header Ad
- Sticky at top
- Auto-hides on scroll down
- 90px height on desktop
- Close button with session memory

### Footer Ad
- Fixed at bottom
- Always visible
- Prevents content overlap
- Responsive sizing

### Smart Features
- Quiz mode detection
- Mobile-optimized
- Performance optimized
- Error handling

## 🔒 Security & Compliance

### Supabase RLS
- Row Level Security enabled
- User data isolation
- Secure API access

### AdSense Compliance
- Privacy policy required
- Terms of service required
- No more than 3 ads per page
- Mobile-first design

### Netlify Security
- Security headers configured
- HTTPS enforced
- Asset caching optimized
- XSS protection

## 🚨 Troubleshooting

### Common Issues
1. **Ads not showing**: Check environment variables
2. **Auth not working**: Verify Supabase configuration
3. **Build errors**: Check all environment variables are set
4. **Routing issues**: Check netlify.toml redirects

### Debug Mode
```bash
# Check API mode
# Look for console logs: "🔧 API Client: Running in Supabase/Local mode"

# Check AdSense
# Look for AdSense errors in console
```

## 📊 Performance

### Optimizations
- Code splitting for vendors
- Lazy loading for ads
- Optimized build configuration
- Minimal bundle size
- Asset caching

### Monitoring
- Ad performance tracking
- User interaction analytics
- Error monitoring ready

## 🌐 Netlify Features

### Build Settings
- Automatic builds on git push
- Preview deployments for PRs
- Branch deployments
- Rollback capability

### Performance
- Global CDN
- Automatic HTTPS
- Asset optimization
- Edge caching

### Environment Management
- Multiple environments (prod/staging/dev)
- Environment-specific variables
- Secure secret management

## 🎉 Ready to Deploy!

Your application is now fully configured for:
- ✅ Netlify deployment
- ✅ Supabase backend
- ✅ AdSense integration
- ✅ Production optimization
- ✅ User-friendly ads
- ✅ Security headers
- ✅ Performance optimization

Deploy now and start monetizing! 🚀

## 🔄 Migration from Vercel

If you're migrating from Vercel:
1. Remove `vercel.json` (already done)
2. Add `netlify.toml` (already configured)
3. Update environment variables in Netlify dashboard
4. Deploy!

The migration is seamless - all your existing functionality will work exactly the same.
