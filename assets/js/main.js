// CS6223 Course Homepage JavaScript

// Global variables
let studentsData = [];
let filteredStudents = [];
let leaderboardMetadata = null;

// Pagination variables
let currentPage = 1;
let itemsPerPage = 20;
let totalPages = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

async function initializeApp() {
    console.log('Initializing app...');
    
    // Load student data
    await loadStudentData();
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

async function loadStudentData() {
    try {
        // Fetch data from JSON file
        const response = await fetch('/assets/data/leaderboard.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Store metadata for timestamp display
        leaderboardMetadata = data.metadata;
        
        // Use the groups array from the JSON data
        studentsData = [...data.groups];
        
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
        
    } catch (error) {
        console.error('Error loading student data:', error);
        
        // Fallback to empty data if JSON loading fails
        studentsData = [];
        filteredStudents = [];
    }
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
        updatePaginationInfo();
        return;
    }
    
    // Calculate pagination
    calculatePagination();
    
    // Get items for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = itemsPerPage === 'all' ? filteredStudents.length : startIndex + itemsPerPage;
    const currentPageStudents = itemsPerPage === 'all' ? filteredStudents : filteredStudents.slice(startIndex, endIndex);
    
    const rows = currentPageStudents.map(student => {
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
    
    // Update pagination controls
    updatePaginationControls();
    updatePaginationInfo();
    
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
    
    // Reset to first page when filtering
    currentPage = 1;
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
    
    // Reset to first page when sorting
    currentPage = 1;
    renderLeaderboardTable();
}

function refreshLeaderboard() {
    const refreshBtn = document.getElementById('refresh-btn');
    
    if (refreshBtn) {
        refreshBtn.disabled = true;
        refreshBtn.textContent = '🔄 Refreshing...';
        
        // Reload data from JSON file
        loadStudentData().then(() => {
            loadLeaderboard();
            updateTimestamp();
            
            refreshBtn.disabled = false;
            refreshBtn.textContent = '🔄 Refresh';
        }).catch(error => {
            console.error('Error refreshing leaderboard:', error);
            refreshBtn.disabled = false;
            refreshBtn.textContent = '🔄 Refresh';
        });
    }
}

function updateTimestamp() {
    const timestampEl = document.querySelector('.timestamp');
    
    if (timestampEl && leaderboardMetadata && leaderboardMetadata.lastUpdated) {
        // Use the timestamp from the JSON metadata
        const lastUpdated = new Date(leaderboardMetadata.lastUpdated);
        timestampEl.textContent = lastUpdated.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } else if (timestampEl) {
        // Fallback to current time if metadata is not available
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

// Pagination functions
function calculatePagination() {
    if (itemsPerPage === 'all') {
        totalPages = 1;
        currentPage = 1;
    } else {
        totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
        // Ensure current page is within bounds
        if (currentPage > totalPages) {
            currentPage = totalPages || 1;
        }
    }
}

function updatePaginationInfo() {
    const paginationInfo = document.getElementById('pagination-info');
    if (!paginationInfo) return;
    
    const totalItems = filteredStudents.length;
    
    if (totalItems === 0) {
        paginationInfo.textContent = 'No submissions found';
        return;
    }
    
    if (itemsPerPage === 'all') {
        paginationInfo.textContent = `Showing all ${totalItems} submissions`;
    } else {
        const startIndex = (currentPage - 1) * itemsPerPage + 1;
        const endIndex = Math.min(currentPage * itemsPerPage, totalItems);
        paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalItems} submissions`;
    }
}

function updatePaginationControls() {
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const pageNumbers = document.getElementById('page-numbers');
    
    if (!prevBtn || !nextBtn || !pageNumbers) return;
    
    // Update previous/next buttons
    prevBtn.disabled = currentPage <= 1 || itemsPerPage === 'all';
    nextBtn.disabled = currentPage >= totalPages || itemsPerPage === 'all';
    
    // Generate page numbers
    if (itemsPerPage === 'all') {
        pageNumbers.innerHTML = '';
        return;
    }
    
    let pagesHtml = '';
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    // Add first page and ellipsis if needed
    if (startPage > 1) {
        pagesHtml += `<button class="page-number" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) {
            pagesHtml += `<span class="page-number ellipsis">...</span>`;
        }
    }
    
    // Add visible page numbers
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        pagesHtml += `<button class="page-number ${activeClass}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    // Add last page and ellipsis if needed
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pagesHtml += `<span class="page-number ellipsis">...</span>`;
        }
        pagesHtml += `<button class="page-number" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }
    
    pageNumbers.innerHTML = pagesHtml;
}

function changePage(direction) {
    const newPage = currentPage + direction;
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderLeaderboardTable();
    }
}

function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderLeaderboardTable();
    }
}

function changeItemsPerPage() {
    const select = document.getElementById('items-per-page');
    if (!select) return;
    
    const newItemsPerPage = select.value === 'all' ? 'all' : parseInt(select.value);
    itemsPerPage = newItemsPerPage;
    currentPage = 1; // Reset to first page
    renderLeaderboardTable();
}

// Export functions for external use
window.addStudent = addStudent;
window.updateStudent = updateStudent;
window.refreshLeaderboard = refreshLeaderboard;
window.filterStudents = filterStudents;
window.sortLeaderboard = sortLeaderboard;
window.changePage = changePage;
window.goToPage = goToPage;
window.changeItemsPerPage = changeItemsPerPage;
