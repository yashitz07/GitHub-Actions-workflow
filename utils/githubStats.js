const axios = require('axios');
const { saveGitHubStats, getGitHubUsername, getCachedStats  } = require('./firestore');

const ORG_NAME = 'RUXAILAB'; 

async function fetchGitHubStats(discordId, forceRefresh = false) {
  const githubUsername = await getGitHubUsername(discordId);
  if (!githubUsername) throw new Error(`GitHub not linked for Discord ID: ${discordId}`);

  if (!forceRefresh) {
    const cached = await getCachedStats(discordId);
    if (cached) {
      console.log("📄 Using cached stats");
      return { ...cached, githubUsername };
    }
  }
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.GH_STATS_TOKEN}`
  };

  let prs = 0, issues = 0, commits = 0;

  // PRs
  const prRes = await axios.get(`https://api.github.com/search/issues?q=author:${githubUsername}+org:${ORG_NAME}+type:pr`, { headers });
  prs = prRes.data.total_count;

  // Issues
  const issueRes = await axios.get(`https://api.github.com/search/issues?q=author:${githubUsername}+org:${ORG_NAME}+type:issue`, { headers });
  issues = issueRes.data.total_count;

  // Commits
  const reposRes = await axios.get(`https://api.github.com/orgs/${ORG_NAME}/repos`, { headers });
  const repos = reposRes.data;

  for (const repo of repos) {
    try {
      const commitRes = await axios.get(`https://api.github.com/repos/${ORG_NAME}/${repo.name}/commits?author=${githubUsername}`, { headers });
      commits += commitRes.data.length;
    } catch (e) {
      console.log(`Skipping repo ${repo.name} due to error.`);
    }
  }

  const stats = { prs, issues, commits, lastUpdated: new Date().toISOString() };
  await saveGitHubStats(discordId, stats);

  return { ...stats, githubUsername };
}

module.exports = { fetchGitHubStats };

