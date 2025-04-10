# 🔁 About the PR & Integration Setup

This project integrates **GitHub Actions**, **Discord**, and **Google Sheets** to **automatically assign Discord roles** to contributors based on their GitHub activity such as merged PRs, opened issues, and commits.

It also supports secure **GitHub–Discord user verification** using **GitHub OAuth** and maps verified users into Google Sheets.

---

## Demo Video
https://drive.google.com/file/d/1qEeLsoDKHaRfp8PQu5Pk4oSj3kU8iGSe/view?usp=drive_link

---
## 📌 Features

- 🔐 **OAuth-based GitHub–Discord Verification**
- 🤖 **Automatic Role Assignment on PRs, Issues, and Commits**
- 🧾 **Google Sheets Mapping** of GitHub usernames to Discord IDs(temporary)
- 🤖 **GitHub Actions workflow that assigns roles automatically on**:
          - Pull request merged
          - Issue opened
          - Push to develop branch (commit)
---

## 🧪 Secrets Required (in the repo using the Action)

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

## 💬 `/verify` Slash Command

Users join the Discord server and type `/verify`. The bot will:

1. Redirect them to a GitHub OAuth link.
2. On successful GitHub login, their GitHub username is securely linked with their Discord ID.
3. The mapping is stored in a protected Google Sheet.
4. This mapping is later used by GitHub Actions to identify contributors and assign roles.

---

## ⚙️ Major Action Flow

1. **User makes a contribution** (commit, PR, or issue) on GitHub.
2. **GitHub Action** is triggered in the consuming repo.
3. The action invokes a **workflow_call** to this repo’s role assignment logic.
4. Inside `assign_discord_role.js`:
   - GitHub username is used to look up the Discord ID from Google Sheets.
   - If matched, the bot assigns a corresponding Discord role.
5. **Console logs** are printed inside GitHub Actions for transparency and debugging.


---

## 📌 Status & Future Scope

This is my work so far for **Feature 1: Automated Role Assignment**.  
The GitHub ↔ Discord user mapping is currently stored in a **Google Sheet** using a service account for ease of setup and testing.

### 🔄 Future Scalability:
- This mapping system is **temporary** and can be **migrated to a more scalable solution** such as:
  - **Firebase Firestore**
  - Or any other secure cloud-based database

This would enable real-time updates, advanced queries, and improved performance as the community scales.

Thank You 🙏


