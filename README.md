### GitHub–Discord Role Automation for RUXAILAB

This project automates Discord role assignment and provides GitHub contribution analytics by connecting Discord users with their GitHub accounts via OAuth. It's designed for open-source organizations like **RUXAILAB** to easily manage and reward contributors based on PRs, issues, and commits.

---
### 🚀 Features

| Feature                    | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| 🔐 OAuth-Based Verification | Securely links GitHub usernames with Discord IDs using GitHub OAuth.        |
| 📊 GitHub Contribution Stats | Fetches PRs, issues, and commit counts from organization repositories.      |
| 🧠 Smart Role Assignment     | Automatically assigns roles based on thresholds (e.g., 1 PR → Beginner).     |
| ⚡ Cached Contribution Stats | Uses Firestore to cache GitHub stats for faster role assignment.            |
| ☁️ Cloud Firestore Integration | Stores GitHub–Discord mapping and contribution history.                    |
| 🧾 Slack-like Slash Commands | Easy `/verify` and `/contributions` commands for users.                     |
| 📢 Weekly Digest            | Posts a weekly summary every Sunday at 9AM showing top contributors of the week. |
---

### 📌 Role Assignment Table

| Contribution Type | Threshold | Discord Role Example     |
|-------------------|-----------|---------------------------|
| PRs               | 1         | 🔧PR  Code Initiate       |
| PRs               | 5         | 🔩PR Merge Apprentice     |
| PRs               | 10        | ⚙️ Pull Request Pro       |
| Issues            | 1         | 🧐 Issue Reporter         |
| Issues            | 5         | 🔍 Issue Investigator     |
| Commits           | 1         | 🔁 Commit Pushed          |
| Commits           | 15        | 🗂️ Commit Champion        |


### 🛠 Slash Commands

| Command                                | Description                                                   |
|----------------------------------------|---------------------------------------------------------------|
| `/verify`                              | Sends the user a GitHub OAuth link to connect accounts.       |
| `/contributions <discord_username>`    | Shows contribution stats for any Discord user.                |

### ⚙️ Setup for Organization

To use this system in **RUXAILAB** organization, you must set up the following secrets in the repository:

| Secret Name                  | Description                                                              |
|-----------------------------|--------------------------------------------------------------------------|
| `DISCORD_BOT_TOKEN`         | Token of your bot from Discord Developer Portal                          |
| `DISCORD_CLIENT_ID`         | Client ID of your bot                                                    |
| `GUILD_ID`                  | Discord server ID                                                        |
| `FIREBASE_CREDENTIALS_JSON` | JSON string of your Firebase Admin SDK credentials                       |
| `GH_CLIENT_ID`, `GH_CLIENT_SECRET` | GitHub OAuth App credentials                                      |
| `ROLE_ID_PR_1`, `ROLE_ID_PR_5`, `ROLE_ID_PR_10`         | Role IDs for PR milestones                    |
| `ROLE_ID_ISSUE_1`, `ROLE_ID_ISSUE_5`                   | Role IDs for issue milestones                |
| `ROLE_ID_COMMIT_1`, `ROLE_ID_COMMIT_15`               | Role IDs for commit milestones               |
| `WEEKLY_DIGEST_CHANNEL_ID`               | Channel ID where weekly digest message should be posted               |
### 🗂 Folder Structure & Major Files

| File / Folder                            | Description                                                             |
|------------------------------------------|-------------------------------------------------------------------------|
| `.github/workflows/discord-role.yml`     | Main GitHub Actions workflow triggered on PR, issue, push              |
| `.github/workflows/weekly-digest.yml`     | Workflow that triggers the weekly digest report on Sundays              |
| `scripts/assign_discord_role.js`         | Main script that determines and assigns roles                          |
| `scripts/oauthServer.js`                 | Express server handling GitHub OAuth callback                          |
| `scripts/discordBot.js`                  | Starts the bot and listens to slash commands                           |
| `scripts/registerCommands.js`            | Registers slash commands to Discord                                    |
| `scripts/weeklyDigest.js`            | Posts weekly contributor highlights every Sunday at 9 AM                                     |
| `utils/firestore.js`                     | Firebase Firestore setup and logic to save mappings & stats            |
| `utils/githubStats.js`                   | Fetches contribution stats from GitHub API                             |
| `utils/discordAPI.js`                    | Assigns Discord roles based on contribution counts                     |


### 📹 Demo

A short video will be added here demonstrating:

- `/verify` flow with GitHub OAuth
- `/contributions` command usage
- Role assignment via GitHub Actions workflow on PR/Issue/Commit
https://drive.google.com/file/d/1onHVW486p7pzkJ_WbuVmbDD_bT7hhcV0/view?usp=sharing

While doing this project work I have tried to maintain some of the things keeping it with respect to organization or companies perspective like:
- I have tried to follow a well-structured, modular Node.js implementation ensuring scalability and clean project structure.
- Implements proper error handling and detailed logging across all modules for easy debugging and reliability.
- Keep focused on code reusability and extensibility to easily add more features in the future.
- Introduced exciting features like real-time contribution stats and automated Weekly Digests to boost engagement in the RUXAILAB community.

Thank You 🙏


