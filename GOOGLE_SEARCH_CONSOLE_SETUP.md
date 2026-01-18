# Google Search Console Setup Guide

## Overview
Google Search Console helps you monitor and maintain your site's presence in Google Search results. This guide will walk you through setting it up for your portfolio website.

## Step 1: Access Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Sign in with your Google account
3. Click "Add Property" or "Add a property"

## Step 2: Add Your Website Property

1. Choose "URL prefix" as your property type
2. Enter your website URL: `https://gilmer-perez.vercel.app`
3. Click "Continue"

## Step 3: Verify Ownership

Google will provide several verification methods. The easiest for Next.js sites is:

### Option A: HTML Tag Verification (Recommended)

1. Google will provide an HTML tag like:
   ```html
   <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
   ```

2. Add this verification code to your `src/app/layout.jsx` file in the metadata object:
   ```javascript
   verification: {
     google: "YOUR_VERIFICATION_CODE",
   },
   ```

3. Deploy the changes to Vercel
4. Return to Google Search Console and click "Verify"

### Option B: HTML File Upload

1. Download the HTML verification file from Google
2. Place it in your `public/` directory
3. Deploy to Vercel
4. Verify in Google Search Console

## Step 4: Submit Your Sitemap

1. Once verified, go to "Sitemaps" in the left sidebar
2. Enter your sitemap URL: `https://gilmer-perez.vercel.app/sitemap.xml`
3. Click "Submit"
4. Google will start crawling your site (this may take a few days)

## Step 5: Monitor Your Site

After setup, you can:
- **Performance**: See which queries bring users to your site
- **Coverage**: Check which pages are indexed and any errors
- **Enhancements**: View structured data and mobile usability
- **URL Inspection**: Test individual URLs for indexing

## Important Notes

- **Indexing Time**: It can take several days to weeks for Google to fully index your site
- **Regular Updates**: Submit your sitemap after major content updates
- **Monitor Errors**: Check the Coverage report regularly for crawl errors
- **Request Indexing**: Use URL Inspection tool to request indexing for new/updated pages

## Additional SEO Tips

1. **Backlinks**: Get other websites to link to your portfolio
2. **Content Updates**: Regularly update your projects and content
3. **Page Speed**: Ensure fast loading times (Next.js helps with this)
4. **Mobile-Friendly**: Your site should be responsive (already implemented)
5. **Social Sharing**: Share your portfolio on LinkedIn, Twitter, etc.

## Troubleshooting

- **Not Indexed**: Be patient, indexing can take time. Use URL Inspection to request indexing.
- **Verification Failed**: Ensure the meta tag is in the `<head>` section and deployed
- **Sitemap Errors**: Check that `/sitemap.xml` is accessible and returns valid XML
