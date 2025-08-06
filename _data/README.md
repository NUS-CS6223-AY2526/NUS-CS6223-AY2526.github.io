# CS6223 Course Data Management

This repository contains sample data structures and functions for managing student data in the CS6223 course website.

## Data Structure

Each student record contains the following fields:

```javascript
{
    name: "Student Name",          // Full name of the student
    score: 95,                     // Total score (0-100)
    assignments: 8,                // Number of completed assignments
    totalAssignments: 10,          // Total number of assignments
    rank: 1,                       // Current rank in class
    progress: 95,                  // Overall progress percentage
    lastActivity: "2025-01-15",    // Last activity date (YYYY-MM-DD)
    id: "student1"                 // Unique student identifier
}
```

## Updating Student Data

To update the leaderboard with real student data, you have several options:

### Option 1: Manual Data Entry
Edit the `sampleStudents` array in `/assets/js/main.js` and replace it with your actual student data.

### Option 2: CSV Import
Create a CSV file with student data and use a script to convert it to the JavaScript format:

```csv
name,score,assignments,totalAssignments,lastActivity
Alice Chen,95,8,10,2025-01-15
Bob Wilson,92,8,10,2025-01-14
```

### Option 3: API Integration
Replace the sample data loading with actual API calls to your student management system:

```javascript
async function loadStudentData() {
    try {
        const response = await fetch('/api/students');
        const data = await response.json();
        studentsData = data.map(student => ({
            ...student,
            rank: 0 // Will be calculated
        }));
        updateRanks();
    } catch (error) {
        console.error('Failed to load student data:', error);
        // Fallback to sample data
        studentsData = [...sampleStudents];
    }
}
```

### Option 4: GitHub Actions Integration
Set up a GitHub Action to automatically update student data from an external source (e.g., Google Sheets, LMS export).

## Functions Available

- `addStudent(studentData)` - Add a new student
- `updateStudent(studentId, updatedData)` - Update existing student data
- `refreshLeaderboard()` - Refresh the leaderboard display
- `filterStudents()` - Filter students by search term
- `sortLeaderboard()` - Sort leaderboard by different criteria

## Security Considerations

If using real student data:
1. Ensure GDPR/privacy compliance
2. Consider using student IDs instead of full names
3. Implement proper access controls
4. Store sensitive data securely (not in public repositories)

## Customization

You can customize the leaderboard by:
1. Modifying the CSS in `/assets/css/style.css`
2. Updating the scoring system in the JavaScript
3. Adding new fields to the student data structure
4. Creating additional views or filters
