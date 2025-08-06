---
layout: default
title: "Course Homepage"
---

<div class="hero-section">
    <h1>Welcome to {{ site.course.number }}</h1>
    <h2>{{ site.course.title }}</h2>
    <p class="lead">{{ site.course.semester }}</p>
</div>

<div class="content-grid">
    <div class="main-content-area">
        <section class="course-info">
            <h2>Course Information</h2>
            <div class="info-grid">
                <div class="info-item">
                    <h3>Instructor</h3>
                    <p>{{ site.course.instructor }}</p>
                </div>
                <div class="info-item">
                    <h3>Course Code</h3>
                    <p>{{ site.course.number }}</p>
                </div>
                <div class="info-item">
                    <h3>Semester</h3>
                    <p>{{ site.course.semester }}</p>
                </div>
            </div>
        </section>

        <section class="quick-links">
            <h2>Quick Links</h2>
            <div class="links-grid">
                <a href="{{ '/leaderboard' | relative_url }}" class="link-card">
                    <h3>📊 Leaderboard</h3>
                    <p>View current student rankings and scores</p>
                </a>
                <a href="{{ '/announcements' | relative_url }}" class="link-card">
                    <h3>📢 Announcements</h3>
                    <p>Latest course updates and news</p>
                </a>
                <a href="#assignments" class="link-card">
                    <h3>📝 Assignments</h3>
                    <p>Assignment details and deadlines</p>
                </a>
                <a href="#resources" class="link-card">
                    <h3>📚 Resources</h3>
                    <p>Course materials and references</p>
                </a>
            </div>
        </section>
    </div>

    <aside class="sidebar">
        <div class="sidebar-widget">
            <h3>Latest Announcements</h3>
            <div class="announcement-list">
                {% for announcement in site.announcements limit:3 %}
                <div class="announcement-item">
                    <h4><a href="{{ announcement.url | relative_url }}">{{ announcement.title }}</a></h4>
                    <p class="date">{{ announcement.date | date: "%B %d, %Y" }}</p>
                </div>
                {% else %}
                <p>No announcements yet.</p>
                {% endfor %}
            </div>
        </div>

        <div class="sidebar-widget">
            <h3>Top Performers</h3>
            <div class="top-performers">
                <div class="performer-item">
                    <span class="rank">🥇</span>
                    <span class="name">Loading...</span>
                    <span class="score">---</span>
                </div>
                <div class="performer-item">
                    <span class="rank">🥈</span>
                    <span class="name">Loading...</span>
                    <span class="score">---</span>
                </div>
                <div class="performer-item">
                    <span class="rank">🥉</span>
                    <span class="name">Loading...</span>
                    <span class="score">---</span>
                </div>
            </div>
            <a href="{{ '/leaderboard' | relative_url }}" class="view-all-btn">View Full Leaderboard</a>
        </div>
    </aside>
</div>
