// CS6223 Course Homepage JavaScript

// Global variables
let studentsData = [];
let filteredStudents = [];

// Sample data - replace with your actual data source
const sampleStudents = [
    { 
        name: "Alice Chen", 
        score: 95, 
        assignments: 8, 
        totalAssignments: 10,
        rank: 1, 
        progress: 95, 
        lastActivity: "2025-01-15",
        id: "student1"
    },
    { 
        name: "Bob Wilson", 
        score: 92, 
        assignments: 8, 
        totalAssignments: 10,
        rank: 2, 
        progress: 92, 
        lastActivity: "2025-01-14",
        id: "student2"
    },
    { 
        name: "Carol Zhang", 
        score: 89, 
        assignments: 7, 
        totalAssignments: 10,
        rank: 3, 
        progress: 87, 
        lastActivity: "2025-01-13",
        id: "student3"
    },
    { 
        name: "David Lee", 
        score: 87, 
        assignments: 7, 
        totalAssignments: 10,
        rank: 4, 
        progress: 85, 
        lastActivity: "2025-01-12",
        id: "student4"
    },
    { 
        name: "Emma Garcia", 
        score: 85, 
        assignments: 6, 
        totalAssignments: 10,
        rank: 5, 
        progress: 82, 
        lastActivity: "2025-01-11",
        id: "student5"
    },
    { 
        name: "Frank Kumar", 
        score: 83, 
        assignments: 6, 
        totalAssignments: 10,
        rank: 6, 
        progress: 80, 
        lastActivity: "2025-01-10",
        id: "student6"
    },
    { 
        name: "Grace Wong", 
        score: 81, 
        assignments: 5, 
        totalAssignments: 10,
        rank: 7, 
        progress: 78, 
        lastActivity: "2025-01-09",
        id: "student7"
    },
    { 
        name: "Henry Chen", 
        score: 79, 
        assignments: 5, 
        totalAssignments: 10,
        rank: 8, 
        progress: 75, 
        lastActivity: "2025-01-08",
        id: "student8"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load student data
    loadStudentData();
    
    // Update homepage top performers if on homepage
    updateTopPerformers();
    
    // Initialize leaderboard if on leaderboard page
    if (document.getElementById('leaderboard-table')) {
        loadLeaderboard();
    }
    
    // Update last updated timestamp
    updateTimestamp();
}

function loadStudentData() {
    // In a real application, this would fetch data from an API
    // For now, we'll use the sample data
    studentsData = [...sampleStudents];
    filteredStudents = [...studentsData];
    
    // Sort by rank
    studentsData.sort((a, b) => a.rank - b.rank);
    filteredStudents.sort((a, b) => a.rank - b.rank);
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
                    scoreSpan.textContent = student.score;
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
        const average = studentsData.reduce((sum, student) => sum + student.score, 0) / studentsData.length;
        averageScoreEl.textContent = average.toFixed(1);
    }
    
    if (highestScoreEl && studentsData.length > 0) {
        const highest = Math.max(...studentsData.map(student => student.score));
        highestScoreEl.textContent = highest;
    }
}

function renderLeaderboardTable() {
    const tableBody = document.getElementById('leaderboard-body');
    
    if (!tableBody) return;
    
    if (filteredStudents.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="no-data">
                    <div style="text-align: center; padding: 2rem; color: #6c757d;">
                        No students found.
                    </div>
                </td>
            </tr>
        `;
        return;
    }
    
    const rows = filteredStudents.map(student => {
        const progressPercentage = (student.assignments / student.totalAssignments) * 100;
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
                <td class="score-cell">
                    <span class="score-value">${student.score}</span>
                </td>
                <td class="assignments-cell">
                    <span class="assignments-count">${student.assignments}/${student.totalAssignments}</span>
                </td>
                <td class="progress-cell">
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                        </div>
                        <span class="progress-text">${progressPercentage.toFixed(0)}%</span>
                    </div>
                </td>
                <td class="activity-cell">
                    <span class="activity-date">${lastActivityFormatted}</span>
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
            case 'score':
                return b.score - a.score;
            case 'assignments':
                return b.assignments - a.assignments;
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
    if (!studentData.name || !studentData.score) {
        console.error('Invalid student data');
        return false;
    }
    
    const newStudent = {
        ...studentData,
        id: `student_${Date.now()}`,
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
    // Sort by score descending
    studentsData.sort((a, b) => b.score - a.score);
    
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
