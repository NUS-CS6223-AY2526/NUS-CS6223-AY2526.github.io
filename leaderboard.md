---
layout: default
title: "Leaderboard"
permalink: /leaderboard/
---

<div class="leaderboard-header">
    <h1>🏆 Course Leaderboard</h1>
    <p class="subtitle">Current student rankings for {{ site.course.number }}</p>
    <div class="last-updated">
        <span id="last-updated">Last updated: <span class="timestamp">Loading...</span></span>
        <button id="refresh-btn" class="refresh-btn" onclick="refreshLeaderboard()">🔄 Refresh</button>
    </div>
</div>

<div class="leaderboard-stats">
    <div class="stat-card">
        <h3>Total Students</h3>
        <span class="stat-number" id="total-students">--</span>
    </div>
    <div class="stat-card">
        <h3>Average Score</h3>
        <span class="stat-number" id="average-score">--</span>
    </div>
    <div class="stat-card">
        <h3>Highest Score</h3>
        <span class="stat-number" id="highest-score">--</span>
    </div>
</div>

<div class="leaderboard-container">
    <div class="leaderboard-controls">
        <div class="search-box">
            <input type="text" id="student-search" placeholder="Search students..." onkeyup="filterStudents()">
        </div>
        <div class="sort-options">
            <label for="sort-by">Sort by:</label>
            <select id="sort-by" onchange="sortLeaderboard()">
                <option value="rank">Rank</option>
                <option value="name">Name</option>
                <option value="score">Score</option>
                <option value="assignments">Assignments Completed</option>
            </select>
        </div>
    </div>

    <div class="leaderboard-table-container">
        <table class="leaderboard-table" id="leaderboard-table">
            <thead>
                <tr>
                    <th class="rank-col">Rank</th>
                    <th class="name-col">Student Name</th>
                    <th class="score-col">Total Score</th>
                    <th class="assignments-col">Assignments</th>
                    <th class="progress-col">Progress</th>
                    <th class="last-activity-col">Last Activity</th>
                </tr>
            </thead>
            <tbody id="leaderboard-body">
                <!-- Leaderboard data will be populated here -->
                <tr class="loading-row">
                    <td colspan="6">
                        <div class="loading-spinner">Loading leaderboard data...</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<div class="leaderboard-footer">
    <p><strong>Note:</strong> Scores are updated automatically. If you believe there's an error in your score, please contact the course staff.</p>
</div>

<!-- Sample data script (you can replace this with actual data loading) -->
<script>
// Sample student data - replace this with your actual data source
const sampleStudents = [
    { name: "Alice Chen", score: 95, assignments: 8, rank: 1, progress: 95, lastActivity: "2025-01-15" },
    { name: "Bob Wilson", score: 92, assignments: 8, rank: 2, progress: 92, lastActivity: "2025-01-14" },
    { name: "Carol Zhang", score: 89, assignments: 7, rank: 3, progress: 87, lastActivity: "2025-01-13" },
    { name: "David Lee", score: 87, assignments: 7, rank: 4, progress: 85, lastActivity: "2025-01-12" },
    { name: "Emma Garcia", score: 85, assignments: 6, rank: 5, progress: 82, lastActivity: "2025-01-11" },
    // Add more sample data as needed
];

// Initialize leaderboard on page load
document.addEventListener('DOMContentLoaded', function() {
    loadLeaderboard();
});
</script>
