# CS6223 Hackathon Leaderboard

A modern, responsive Jekyll-based website for the CS6223 Hackathon Leaderboard at NUS.

## Features

- 🏆 **Interactive Leaderboard** - Real-time hackathon rankings with filtering and sorting
- � **Live Statistics** - Total groups, average scores, and highest scores
- 📱 **Responsive Design** - Works perfectly on desktop and mobile devices
- 🎨 **Modern UI** - Clean, professional design with smooth animations
- ⚡ **Fast Loading** - Optimized for GitHub Pages
- 🔄 **Auto Refresh** - Dynamic data loading from JSON file

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

3. **Update Leaderboard Data**
   - Edit `/assets/data/leaderboard.json`
   - Update group information, scores, and metadata
   - See `assets/data/README.md` for detailed instructions

## Project Structure

```
├── _config.yml              # Jekyll configuration
├── _layouts/
│   └── default.html         # Main page template
├── assets/
│   ├── css/style.css       # Styling
│   ├── js/main.js          # JavaScript functionality
│   └── data/
│       └── leaderboard.json # Leaderboard data
├── index.md                # Homepage with leaderboard
└── Gemfile                 # Ruby dependencies
```

## Customization

### Updating Leaderboard Data
Edit the `/assets/data/leaderboard.json` file:

```json
{
  "metadata": {
    "lastUpdated": "2025-01-15T10:30:00Z",
    "version": "1.0",
    "totalGroups": 8,
    "competitionName": "CS6223 Hackathon"
  },
  "groups": [
    {
      "name": "Alpha",
      "task1": 18,
      "task2": 19,
      "task3": 17.5,
      "tag": "v1.2.0",
      "lastActivity": "2025-01-15",
      "id": "group1"
    }
  ]
}
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
- **Automated Updates**: Use GitHub Actions to update `leaderboard.json`
- **API Integration**: Fetch data from your scoring system
- **Privacy**: Use group names or IDs instead of personal information
- **Monitoring**: Set up monitoring script using `scripts/monitor-leaderboard.sh`

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Internet Explorer 11+ (with limited features)

## License

This project is open source and available under the [MIT License](LICENSE).
