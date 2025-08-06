# Leaderboard Data

This directory contains the leaderboard data in JSON format.

## Files

- `leaderboard.json` - Main leaderboard data file

## Data Structure

### leaderboard.json

```json
{
  "metadata": {
    "lastUpdated": "ISO 8601 timestamp",
    "version": "string version number",
    "totalGroups": "number of groups",
    "competitionName": "name of competition/hackathon"
  },
  "groups": [
    {
      "name": "Group name (string)",
      "task1": "Task 1 score (integer, 0-20)",
      "task2": "Task 2 score (integer, 0-20)", 
      "task3": "Task 3 score (float, 0-20)",
      "tag": "Submission tag/version (string)",
      "lastActivity": "Last activity date (YYYY-MM-DD)",
      "id": "Unique group identifier (string)"
    }
  ]
}
```

## Updating Data

To update the leaderboard:

1. Edit the `leaderboard.json` file
2. Update group scores, tags, or add new groups
3. Update the `metadata.lastUpdated` timestamp
4. The leaderboard will automatically refresh when users reload the page

## Notes

- Total scores and rankings are calculated automatically from task scores
- Task scores should be within the range [0-20]
- The `tag` field is optional and can contain version numbers, commit hashes, or other identifiers
- Groups are automatically sorted by total score (highest to lowest)
