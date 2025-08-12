---
layout: default
title: "CS6223 Hackathon Leaderboard"
---

<div class="leaderboard-header">
    <div class="last-updated">
        <span id="last-updated">Last updated: <span class="timestamp">Loading...</span></span>
        <button id="refresh-btn" class="refresh-btn" onclick="refreshLeaderboard()">🔄 Refresh</button>
    </div>
</div>

<div class="leaderboard-stats">
    <div class="stat-card">
        <h3>Total Submissions</h3>
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
            <input type="text" id="student-search" placeholder="Search groups..." onkeyup="filterStudents()">
        </div>
        <div class="sort-options">
            <label for="sort-by">Sort by:</label>
            <select id="sort-by" onchange="sortLeaderboard()">
                <option value="rank">Rank</option>
                <option value="name">Group Name</option>
                <option value="tag">Tag</option>
                <option value="total">Total</option>
                <option value="task1">Task 1</option>
                <option value="task2">Task 2</option>
                <option value="task3">Task 3</option>
            </select>
        </div>
    </div>

    <div class="leaderboard-table-container">
        <table class="leaderboard-table" id="leaderboard-table">
            <thead>
                <tr>
                    <th class="rank-col">Rank</th>
                    <th class="name-col">Group Name</th>
                    <th class="tag-col">Tag</th>
                    <th class="total-col">Total</th>
                    <th class="task1-col">Task 1</th>
                    <th class="task2-col">Task 2</th>
                    <th class="task3-col">Task 3</th>
                </tr>
            </thead>
            <tbody id="leaderboard-body">
                <!-- Leaderboard data will be populated here -->
                <tr class="loading-row">
                    <td colspan="7">
                        <div class="loading-spinner">Loading leaderboard data...</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="pagination-container">
        <div class="pagination-info">
            <span id="pagination-info">Showing 1-20 of 0 submissions</span>
        </div>
        <div class="pagination-controls">
            <button id="prev-page" class="pagination-btn" onclick="changePage(-1)" disabled>
                ← Previous
            </button>
            <div class="page-numbers" id="page-numbers">
                <!-- Page numbers will be populated here -->
            </div>
            <button id="next-page" class="pagination-btn" onclick="changePage(1)" disabled>
                Next →
            </button>
        </div>
        <div class="items-per-page">
            <label for="items-per-page">Items per page:</label>
            <select id="items-per-page" onchange="changeItemsPerPage()">
                <option value="10">10</option>
                <option value="20" selected>20</option>
                <option value="50">50</option>
                <option value="all">All</option>
            </select>
        </div>
    </div>
</div>

<div class="leaderboard-footer">
    <p><strong>Note:</strong> Scores are updated automatically. If you believe there's an error in your score, please contact the course staff.</p>
</div>

<script src="{{ '/assets/js/main.js' | relative_url }}"></script>
