# CS6223 Course Homepage

A modern, responsive Jekyll-based website for the CS6223 Advanced Topics in Database Systems course at NUS.

## Features

- 🏆 **Interactive Leaderboard** - Real-time student rankings with filtering and sorting
- 📢 **Announcements System** - Course updates and important notices
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- ⚡ **Fast Loading** - Optimized for GitHub Pages

## Quick Start

1. **Enable GitHub Pages**
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save the settings

2. **Customize Course Information**
   - Edit `_config.yml` to update course details
   - Modify instructor name, semester, and other course info

3. **Update Student Data**
   - Edit `/assets/js/main.js`
   - Replace the `sampleStudents` array with your actual student data
   - See `_data/README.md` for detailed instructions

## Project Structure

```
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html         # Main page template
├── _announcements/          # Course announcements
├── assets/
│   ├── css/style.css       # Styling
│   └── js/main.js          # JavaScript functionality
├── index.md                # Homepage
├── leaderboard.md          # Leaderboard page
├── announcements.md        # Announcements page
└── Gemfile                 # Ruby dependencies
```

## Customization

### Adding Announcements
Create new markdown files in `_announcements/` folder:

```markdown
---
title: "Your Announcement Title"
date: 2025-01-15
important: true  # Optional: adds "Important" badge
---

Your announcement content here...
```

### Updating Student Data
Replace the sample data in `/assets/js/main.js`:

```javascript
const sampleStudents = [
    {
        name: "Student Name",
        score: 95,
        assignments: 8,
        totalAssignments: 10,
        rank: 1,
        progress: 95,
        lastActivity: "2025-01-15",
        id: "student1"
    },
    // Add more students...
];
```

### Styling Changes
Modify `/assets/css/style.css` to customize:
- Colors (CSS variables at the top)
- Layout and spacing
- Fonts and typography
- Responsive breakpoints

## Local Development

### Prerequisites
- Ruby 3.1+ (check with `ruby --version`)
- Bundler gem (`gem install bundler`)

### Setup and Run
1. **Install dependencies:**
   ```bash
   bundle install
   ```

2. **Start the development server:**
   ```bash
   bundle exec jekyll serve
   ```
   Or with live reload:
   ```bash
   bundle exec jekyll serve --livereload
   ```

3. **View your site:**
   - Open `http://localhost:4000` in your browser
   - The site will automatically reload when you make changes

### Troubleshooting
- If you get permission errors, try: `bundle install --path vendor/bundle`
- For Ruby version issues, use a Ruby version manager like rbenv or RVM
- On Ubuntu/Debian: `sudo apt-get install ruby-dev build-essential`
- On macOS: `brew install ruby` or use the system Ruby

## Data Management

For real-world usage, consider:
- **CSV Import**: Convert spreadsheet data to JavaScript format
- **API Integration**: Fetch data from your LMS or database
- **GitHub Actions**: Automate data updates
- **Privacy**: Use student IDs instead of full names for public sites

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Internet Explorer 11+ (with limited features)

## License

This project is open source and available under the [MIT License](LICENSE).
