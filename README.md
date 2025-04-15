# 🔁 About the PR & Integration Setup

This project integrates **GitHub Actions**, **Discord**, and **Google Sheets** to **automatically assign Discord roles** to contributors based on their GitHub activity such as merged PRs, opened issues, and commits.

It also supports secure **GitHub–Discord user verification** using **GitHub OAuth** and maps verified users into Google Sheets.

---

### Demo Video (updated)
https://drive.google.com/file/d/1G0ZvFuw5wlbjIjeiRPrmUpEwVu0dG4HH/view?usp=drive_link

---
### 📌 Features

-  **OAuth-based GitHub–Discord Verification**
-  **Automatic Role Assignment on PRs, Issues, and Commits**
-  **Google Sheets Mapping** of GitHub usernames to Discord IDs(temporary)
-  **GitHub Actions workflow that assigns roles automatically on**:
          - Pull request merged
          - Issue opened
          - Push to develop branch (commit)
- **/contributions Discord Command**: Let users check their GitHub stats in the GitHub organization
---

### 🧪 Secrets Required (in the repo using the Action)

Add these secrets in your repository settings (`Settings → Secrets → Actions`):

| Secret Key              | Description                                       |
|-------------------------|---------------------------------------------------|
| `DISCORD_BOT_TOKEN`     | Discord bot token                                 |
| `DISCORD_CLIENT_ID`     | Your Discord server's client ID                    |
| `GH_CLIENT_ID  `        | Github Client Id for OAuth                       |
| `GH_CLIENT_SECRET`      | Github Client secret               |
| `GOOGLE_SHEET_ID`       | ID of the Google Sheet storing mappings          |
| `GOOGLE_CREDENTIALS_JSON`| Service account credentials (as JSON string)     |

---

### 💬 Slash Commands

#### `/verify`
Securely links a Discord account with a GitHub username.

**How it works:**
1. User types `/verify` in the Discord server.
2. Bot replies with a GitHub OAuth link.
3. User logs into GitHub.
4. GitHub username is retrieved and linked with the user's Discord ID.
---

#### `/contributions <discord_username>`
Fetches GitHub contribution stats for a user in the GitHub organization.

**Usage Example:**
```bash
/contributions yashitz07
```
**How it works:**
1. Bot fetches the GitHub username linked to the provided Discord tag.
2. It then queries the GitHub API for: i)Pull Requests ii)Issues iii)Commits
3. Responds in Discord with a summary of contributions.
---

### ⚙️ Major Action Flow

1. **User makes a contribution** (commit, PR, or issue) on GitHub.
2. **GitHub Action** is triggered in the consuming repo.
3. The action invokes a **workflow_call** to this repo’s role assignment logic.
4. Inside `assign_discord_role.js`:
   - GitHub username is used to look up the Discord ID from Google Sheets.
   - If matched, the bot assigns a corresponding Discord role.
5. **Console logs** are printed inside GitHub Actions for transparency and debugging.


---

### 📌 Status & Future Scope

This is my work so far for **Feature 1: Automated Role Assignment**.  
The GitHub ↔ Discord user mapping is currently stored in a **Google Sheet** using a service account for ease of setup and testing.

#### 🔄 Future Scalability:
- This mapping system is **temporary** and can be **migrated to a more scalable solution** such as:
  - **Firebase Firestore**
  - Or any other secure cloud-based database

This would enable real-time updates, advanced queries, and improved performance as the community scales.

Thank You 🙏


