// CS6223 Course Homepage JavaScript

// Global variables
let studentsData = [];
let filteredStudents = [];

// Sample data - replace with your actual data source
const sampleStudents = [
    { 
        name: "Alpha", 
        task1: 18, 
        task2: 19, 
        task3: 17.5,
        tag: "v1.2.0",
        rank: 1, 
        lastActivity: "2025-01-15",
        id: "group1"
    },
    { 
        name: "Beta", 
        task1: 16, 
        task2: 18, 
        task3: 18.0,
        tag: "v2.1.1",
        rank: 2, 
        lastActivity: "2025-01-14",
        id: "group2"
    },
    { 
        name: "Gamma", 
        task1: 17, 
        task2: 16, 
        task3: 16.5,
        tag: "v1.0.0",
        rank: 3, 
        lastActivity: "2025-01-13",
        id: "group3"
    },
    { 
        name: "Delta", 
        task1: 15, 
        task2: 17, 
        task3: 16.0,
        tag: "v3.0.0",
        rank: 4, 
        lastActivity: "2025-01-12",
        id: "group4"
    },
    { 
        name: "Epsilon", 
        task1: 14, 
        task2: 16, 
        task3: 17.5,
        tag: "v1.5.2",
        rank: 5, 
        lastActivity: "2025-01-11",
        id: "group5"
    },
    { 
        name: "Zeta", 
        task1: 16, 
        task2: 15, 
        task3: 15.0,
        tag: "v2.0.0",
        rank: 6, 
        lastActivity: "2025-01-10",
        id: "group6"
    },
    { 
        name: "Eta", 
        task1: 13, 
        task2: 15, 
        tag: "v1.1.0",
        task3: 16.5,
        rank: 7, 
        lastActivity: "2025-01-09",
        id: "group7"
    },
    { 
        name: "Theta", 
        task1: 12, 
        task2: 14, 
        task3: 15.0,
        tag: "v2.2.0",
        rank: 8, 
        lastActivity: "2025-01-08",
        id: "group8"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    console.log('Initializing app...');
    
    // Load student data
    loadStudentData();
    console.log('Student data loaded:', studentsData.length, 'students');
    
    // Update homepage top performers if on homepage
    updateTopPerformers();
    
    // Initialize leaderboard if on leaderboard page
    const leaderboardTable = document.getElementById('leaderboard-table');
    if (leaderboardTable) {
        console.log('Found leaderboard table, loading leaderboard...');
        loadLeaderboard();
    } else {
        console.log('No leaderboard table found on this page');
    }
    
    // Update last updated timestamp
    updateTimestamp();
}

function loadStudentData() {
    // In a real application, this would fetch data from an API
    // For now, we'll use the sample data
    studentsData = [...sampleStudents];
    
    // Calculate total scores and update ranks
    studentsData.forEach(student => {
        student.totalScore = student.task1 + student.task2 + student.task3;
    });
    
    // Sort by total score descending and update ranks
    studentsData.sort((a, b) => b.totalScore - a.totalScore);
    studentsData.forEach((student, index) => {
        student.rank = index + 1;
    });
    
    filteredStudents = [...studentsData];
}

function updateTopPerformers() {
    const topPerformers = document.querySelectorAll('.performer-item');
    
    if (topPerformers.length > 0 && studentsData.length > 0) {
        topPerformers.forEach((performer, index) => {
            if (index < studentsData.length) {
                const student = studentsData[index];
                const nameSpan = performer.querySelector('.name');
                const scoreSpan = performer.querySelector('.score');
                
                if (nameSpan && scoreSpan) {
                    nameSpan.textContent = student.name;
                    scoreSpan.textContent = student.totalScore.toFixed(1);
                }
            }
        });
    }
}

function loadLeaderboard() {
    updateLeaderboardStats();
    renderLeaderboardTable();
}

function updateLeaderboardStats() {
    const totalStudentsEl = document.getElementById('total-students');
    const averageScoreEl = document.getElementById('average-score');
    const highestScoreEl = document.getElementById('highest-score');
    
    if (totalStudentsEl) {
        totalStudentsEl.textContent = studentsData.length;
    }
    
    if (averageScoreEl && studentsData.length > 0) {
        const average = studentsData.reduce((sum, student) => sum + student.totalScore, 0) / studentsData.length;
        averageScoreEl.textContent = average.toFixed(1);
    }
    
    if (highestScoreEl && studentsData.length > 0) {
        const highest = Math.max(...studentsData.map(student => student.totalScore));
        highestScoreEl.textContent = highest.toFixed(1);
    }
}

function renderLeaderboardTable() {
    const tableBody = document.getElementById('leaderboard-body');
    
    if (!tableBody) {
        console.error('leaderboard-body element not found');
        return;
    }
    
    // Clear any existing loading content
    tableBody.innerHTML = '';
    
    if (filteredStudents.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="no-data">
                    <div style="text-align: center; padding: 2rem; color: #6c757d;">
                        No groups found.
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    const rows = filteredStudents.map(student => {
        const rankDisplay = getRankDisplay(student.rank);
        const lastActivityFormatted = formatDate(student.lastActivity);
        
        return `
            <tr class="student-row" data-student-id="${student.id}">
                <td class="rank-cell">
                    <span class="rank-badge ${getRankClass(student.rank)}">${rankDisplay}</span>
                </td>
                <td class="name-cell">
                    <div class="student-info">
                        <span class="student-name">${student.name}</span>
                    </div>
                </td>
                <td class="tag-cell">
                    <span class="submission-tag">${student.tag || 'N/A'}</span>
                </td>
                <td class="total-cell">
                    <span class="total-score">${student.totalScore.toFixed(1)}</span>
                </td>
                <td class="task1-cell">
                    <span class="task-score">${student.task1}</span>
                </td>
                <td class="task2-cell">
                    <span class="task-score">${student.task2}</span>
                </td>
                <td class="task3-cell">
                    <span class="task-score">${student.task3.toFixed(1)}</span>
                </td>
            </tr>
        `;
    }).join('');
    
    tableBody.innerHTML = rows;
    
    // Add fade-in animation
    setTimeout(() => {
        const studentRows = document.querySelectorAll('.student-row');
        studentRows.forEach((row, index) => {
            setTimeout(() => {
                row.classList.add('fade-in');
            }, index * 50);
        });
    }, 100);
}

function getRankDisplay(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
}

function getRankClass(rank) {
    if (rank <= 3) return 'top-rank';
    if (rank <= 10) return 'high-rank';
    return 'normal-rank';
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    });
}

function filterStudents() {
    const searchTerm = document.getElementById('student-search')?.value.toLowerCase() || '';
    
    filteredStudents = studentsData.filter(student => 
        student.name.toLowerCase().includes(searchTerm)
    );
    
    renderLeaderboardTable();
}

function sortLeaderboard() {
    const sortBy = document.getElementById('sort-by')?.value || 'rank';
    
    filteredStudents.sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'task1':
                return b.task1 - a.task1;
            case 'task2':
                return b.task2 - a.task2;
            case 'task3':
                return b.task3 - a.task3;
            case 'total':
                return b.totalScore - a.totalScore;
            case 'tag':
                return (a.tag || '').localeCompare(b.tag || '');
            case 'rank':
            default:
                return a.rank - b.rank;
        }
    });
    
    renderLeaderboardTable();
}

function refreshLeaderboard() {
    const refreshBtn = document.getElementById('refresh-btn');
    
    if (refreshBtn) {
        refreshBtn.disabled = true;
        refreshBtn.textContent = '🔄 Refreshing...';
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, this would fetch new data
            loadStudentData();
            loadLeaderboard();
            updateTimestamp();
            
            refreshBtn.disabled = false;
            refreshBtn.textContent = '🔄 Refresh';
        }, 1500);
    }
}

function updateTimestamp() {
    const timestampEl = document.querySelector('.timestamp');
    
    if (timestampEl) {
        const now = new Date();
        timestampEl.textContent = now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Utility functions for data management
function addStudent(studentData) {
    // Add validation here
    if (!studentData.name || studentData.task1 === undefined || studentData.task2 === undefined || studentData.task3 === undefined) {
        console.error('Invalid group data');
        return false;
    }
    
    // Validate score ranges
    if (studentData.task1 < 0 || studentData.task1 > 20 || 
        studentData.task2 < 0 || studentData.task2 > 20 || 
        studentData.task3 < 0 || studentData.task3 > 20) {
        console.error('Task scores must be between 0 and 20');
        return false;
    }
    
    const newStudent = {
        ...studentData,
        id: `group_${Date.now()}`,
        lastActivity: new Date().toISOString().split('T')[0]
    };
    
    studentsData.push(newStudent);
    updateRanks();
    loadLeaderboard();
    
    return true;
}

function updateStudent(studentId, updatedData) {
    const studentIndex = studentsData.findIndex(student => student.id === studentId);
    
    if (studentIndex === -1) {
        console.error('Student not found');
        return false;
    }
    
    studentsData[studentIndex] = {
        ...studentsData[studentIndex],
        ...updatedData,
        lastActivity: new Date().toISOString().split('T')[0]
    };
    
    updateRanks();
    loadLeaderboard();
    
    return true;
}

function updateRanks() {
    // Calculate total scores
    studentsData.forEach(student => {
        student.totalScore = student.task1 + student.task2 + student.task3;
    });
    
    // Sort by total score descending
    studentsData.sort((a, b) => b.totalScore - a.totalScore);
    
    // Update ranks
    studentsData.forEach((student, index) => {
        student.rank = index + 1;
    });
    
    // Update filtered students
    filteredStudents = [...studentsData];
}

// Export functions for external use
window.addStudent = addStudent;
window.updateStudent = updateStudent;
window.refreshLeaderboard = refreshLeaderboard;
window.filterStudents = filterStudents;
window.sortLeaderboard = sortLeaderboard;
