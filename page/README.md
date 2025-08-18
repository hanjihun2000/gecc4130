# HK Scam Research Website

A modern, educational static website about telephone scams in Hong Kong, built for public awareness and academic research.

## Setup Instructions

### Google Analytics Configuration

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Replace `GA_MEASUREMENT_ID` in `index.html` with your actual measurement ID

Example:

```javascript
gtag("config", "G-XXXXXXXXXX");
```

### Netlify Deployment

1. Connect your repository to Netlify
2. Set build settings:
   - Build command: (none needed)
   - Publish directory: `page`

### YouTube Video Integration

When your team creates the video:

1. Upload to YouTube and get the video ID from the URL
2. Replace the placeholder section in `index.html`:

```html
<!-- Replace the video-placeholder div with: -->
<div class="video-container">
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
</div>
```

## File Structure

```
page/
├── index.html          # Main website file
├── style.css          # All styling
├── script.js          # Interactive functionality
├── favicon.ico        # Website icon
└── assets/
    ├── deception-chart.png      # Chart showing scam trends
    └── prevention-measures.png  # Survey results chart
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Google Analytics**: Track visitor engagement
- **Smooth Scrolling**: Enhanced navigation experience
- **Animated Statistics**: Engaging number counters
- **Accessibility**: Proper focus states and semantic HTML
- **SEO Optimized**: Meta tags and structured content

## Content Sections

1. **Hero**: Key statistics and call-to-action
2. **Overview**: Problem introduction with key insights
3. **Research**: Data analysis and trends from 2014-2024
4. **Survey**: Results from 53 participants
5. **Interviews**: Personal stories from 5 interviewees
6. **Prevention**: Practical advice and resources
7. **Video**: Placeholder for future YouTube content

## Customization

- Colors can be changed in the CSS variables at the top of `style.css`
- Content can be updated directly in `index.html`
- Charts can be replaced in the `assets/` folder
- Additional sections can be added following the existing pattern

## Performance

- Optimized images
- Minimal external dependencies
- Clean, semantic HTML
- Efficient CSS with minimal JavaScript

The website is designed to be educational, accessible, and engaging for university students and the general public.
