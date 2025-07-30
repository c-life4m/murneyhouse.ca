🏠 Project Overview
Murney House is a charming bed & breakfast website that showcases rooms, amenities, and local attractions. The site features a sophisticated design with smooth animations, dark mode support, and full mobile optimization.

✨ Features
Mobile-First Responsive Design - Optimized for all screen sizes
Dark/Light Mode Toggle - User preference with system detection
Smooth Animations - Intersection Observer API for scroll-triggered animations
Interactive Navigation - Mobile hamburger menu with smooth transitions
Dynamic Content - Guest book and updates loaded from JSON
Performance Optimized - Responsive images with WebP format
Accessibility Focused - Proper ARIA labels and keyboard navigation
Touch-Friendly - Optimized for mobile interactions
📁 Project Structure
Swift
copy
Open in Browser
/root/
├── index.html
├── 404.html
├── /data/
│   ├── Updates.json
│   └── GuestBook.json
├── /src/
│   ├── script.js
│   └── /styles/
│       └── style.css
├── /public/
│   └── /images/
│       └── /assets/
│           ├── /FONTS/
│           ├── /icons/
│           └── /PX/
└── /otherpages/
    ├── rooms.html
    ├── amenities.html
    ├── booking.html
    ├── gallery.html
    ├── contact.html
    └── guest-hub.html
🚀 Getting Started
Prerequisites
Modern web browser
Local web server (for JSON loading)
Installation
Clone or download the project files
Ensure all files maintain the directory structure shown above
Place your images in the /public/images/assets/PX/ directory
Serve the files through a local web server
Running Locally
Bash
copy
Open in Browser
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
Then open http://localhost:8000 in your browser.

🎨 Design Features
Color Scheme
Light Mode: Warm, welcoming tones with subtle pastels
Dark Mode: Deep, elegant colors with proper contrast
Accent Color: Coral (#e57373) for CTAs and highlights
Typography
Headings: Playfair Display (serif)
Body Text: Raleway (sans-serif)
Responsive scaling across all screen sizes
Animations
Button wobble effects on hover
Smooth scroll-triggered animations using Intersection Observer
Mobile-optimized touch feedback
Shimmer effects on buttons and links
📱 Mobile Optimization
Mobile-first CSS with progressive enhancement
Touch-friendly 44px minimum touch targets
Responsive images with multiple breakpoints
Optimized navigation with hamburger menu
Performance considerations for mobile networks
🔧 Configuration
JSON Data Files
data/GuestBook.json

Json
copy
Open in Browser
{
  "entries": [
    {
      "name": "Guest Name",
      "location": "City, State",
      "message": "Review text here"
    }
  ]
}
data/Updates.json

Json
copy
Open in Browser
{
  "notifications": [
    {
      "active": true,
      "message": "Update message"
    }
  ]
}
Image Requirements
Hero images: 800px, 1200px, 1920px widths
Room images: Multiple sizes for responsive loading
WebP format preferred for performance
Fallback formats for older browsers
🎯 Browser Support
Modern browsers (Chrome 60+, Firefox 55+, Safari 12+, Edge 79+)
Mobile browsers (iOS Safari 12+, Chrome Mobile 60+)
Progressive enhancement for older browsers
📝 Customization
Colors
Modify CSS custom properties in :root to change the color scheme:

Css
copy
Open in Browser
:root {
  --cta: #e57373;
  --cta-hover: #c62828;
  /* Add your custom colors */
}
Content
Update room information in the HTML
Modify footer contact details
Replace images with your own (maintaining file structure)
Update JSON files for dynamic content
🔍 SEO Features
Semantic HTML5 structure
Meta tags for social sharing
Alt text for all images
Structured markup ready
Performance optimized for Core Web Vitals
🚧 Development Notes
No build process required - pure vanilla code
Easy to maintain and customize
Well-commented code for easy understanding
Modular CSS with clear sections
📄 License
This project is created for Murney House B&B. All rights reserved.

🤝 Contributing
This is a private project for Murney House. For modifications or improvements, please contact the development team.

📞 Support
For technical support or questions about the website, please contact:

Email: info@murneyhouse.ca
Phone: (555) 123-4567
