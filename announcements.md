---
layout: default
title: "Announcements"
permalink: /announcements/
---

<div class="announcements-header">
    <h1>📢 Course Announcements</h1>
    <p class="subtitle">Stay updated with the latest course news and updates</p>
</div>

<div class="announcements-container">
    {% if site.announcements.size > 0 %}
        {% for announcement in site.announcements reversed %}
        <article class="announcement-card">
            <header class="announcement-header">
                <h2><a href="{{ announcement.url | relative_url }}">{{ announcement.title }}</a></h2>
                <div class="announcement-meta">
                    <span class="date">{{ announcement.date | date: "%B %d, %Y" }}</span>
                    {% if announcement.important %}
                    <span class="important-badge">Important</span>
                    {% endif %}
                </div>
            </header>
            <div class="announcement-content">
                {{ announcement.excerpt }}
                <a href="{{ announcement.url | relative_url }}" class="read-more">Read more →</a>
            </div>
        </article>
        {% endfor %}
    {% else %}
        <div class="no-announcements">
            <h3>No announcements yet</h3>
            <p>Check back later for course updates and important information.</p>
        </div>
    {% endif %}
</div>

<style>
.announcements-header {
    text-align: center;
    margin-bottom: 2rem;
    background: var(--white);
    padding: 2rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.announcements-header h1 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.subtitle {
    color: var(--medium-gray);
}

.announcements-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.announcement-card {
    background: var(--white);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    padding: 2rem;
    transition: var(--transition);
}

.announcement-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.announcement-header {
    margin-bottom: 1rem;
}

.announcement-header h2 {
    margin-bottom: 0.5rem;
}

.announcement-header h2 a {
    color: var(--primary-color);
    text-decoration: none;
}

.announcement-header h2 a:hover {
    color: var(--secondary-color);
}

.announcement-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.date {
    color: var(--medium-gray);
    font-size: 0.9rem;
}

.important-badge {
    background: var(--accent-color);
    color: var(--white);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
}

.announcement-content {
    color: var(--dark-gray);
    line-height: 1.6;
}

.read-more {
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.5rem;
}

.read-more:hover {
    text-decoration: underline;
}

.no-announcements {
    text-align: center;
    background: var(--white);
    padding: 3rem;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.no-announcements h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.no-announcements p {
    color: var(--medium-gray);
}
</style>
