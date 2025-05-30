
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Copy, Download, ExternalLink } from "lucide-react";
import Stepper from "@/components/Stepper";
import { useToast } from "@/hooks/use-toast";

const SetupWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    orgName: "",
    repoName: "",
    botToken: "",
    guildId: "",
    clientId: "",
    clientSecret: "",
    redirectUri: "",
    firebaseJson: "",
    ghClientId: "", 
    digestChan: "",
    ghClientSecret: "",
    ghStatsToken: "",
    rolePr1: "", 
    rolePr5: "",
    rolePr10: "",
    roleIssue1: "",
    roleIssue5: "",
    roleCommit1: "",
    roleCommit15: "",
    baseUrl: "",
  
  });

  // Utility to download a file with given content and filename
  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const { toast } = useToast();
  
  const totalSteps = 7;
  const steps = ["GitHub", "Discord", "Environment Variables","OAuth", "Secrets",  "Workflow", "Done"];

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };


  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">GitHub Organization Setup</h2>
            <p className="text-gray-600">Configure your GitHub organization and repository settings</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="orgName">Organization Name</Label>
              <Input
                id="orgName"
                placeholder="your-org-name"
                value={formData.orgName}
                onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="repoName">Repository Name</Label>
              <Input
                id="repoName"
                placeholder="your-repo-name"
                value={formData.repoName}
                onChange={(e) => setFormData({ ...formData, repoName: e.target.value })}
              />
            </div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Installation Requirements:</h3>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Install the GitHub App in your organization</li>
              <li>Grant access to the repository specified above</li>
              <li>Ensure you have admin permissions</li>
            </ul>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Discord Bot Setup</h2>
            <p className="text-gray-600">Configure your Discord bot and server settings</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="botToken">Bot Token</Label>
              <Input
                id="botToken"
                type="password"
                placeholder="Your Discord bot token"
                value={formData.botToken}
                onChange={(e) => setFormData({ ...formData, botToken: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="guildId">Guild ID</Label>
              <Input
                id="guildId"
                placeholder="Your Discord server ID"
                value={formData.guildId}
                onChange={(e) => setFormData({ ...formData, guildId: e.target.value })}
              />
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Bot Invitation:</h3>
            <p className="text-green-800 mb-2">Use this URL to invite your bot:</p>
            <code className="bg-green-100 p-2 rounded text-sm block">
              https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&permissions=268435456&scope=bot
            </code>
          </div>
        </div>
      );

    case 3:
      return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Environment Variables
        </h2>
        <p className="text-gray-600">
          Fill in these values for your setup.
        </p>
      </div>
      <div className="space-y-4">
        {[
          { id: "baseUrl",         label: "BASE_URL",                  type: "text",     placeholder: "https://your-app.com" },
          { id: "firebaseJson",    label: "FIREBASE_CREDENTIALS_JSON",  type: "textarea", placeholder: "{...your JSON...}" },
          { id: "botToken",        label: "DISCORD_BOT_TOKEN",         type: "password", placeholder: "Your Discord bot token" },
          { id: "clientId",        label: "DISCORD_CLIENT_ID",         type: "text",     placeholder: "Discord application (client) ID" },
          { id: "guildId",         label: "GUILD_ID",                  type: "text",     placeholder: "Your Discord server’s guild ID" },
          { id: "digestChan",      label: "WEEKLY_DIGEST_CHANNEL_ID",   type: "text",     placeholder: "Channel ID for weekly digest" },
          { id: "ghClientId",      label: "GH_CLIENT_ID",              type: "text",     placeholder: "GitHub OAuth App client ID" },
          { id: "ghClientSecret",  label: "GH_CLIENT_SECRET",          type: "password", placeholder: "GitHub OAuth App client secret" },
          { id: "ghStatsToken",    label: "GH_STATS_TOKEN",            type: "password", placeholder: "GitHub personal access token" },
          { id: "rolePr1",         label: "ROLE_ID_PR_1 (optional)",              type: "text",     placeholder: "Role ID for ≥1 PR" },
          { id: "rolePr5",         label: "ROLE_ID_PR_5 (optional)",              type: "text",     placeholder: "Role ID for ≥5 PRs" },
          { id: "rolePr10",        label: "ROLE_ID_PR_10 (optional)",             type: "text",     placeholder: "Role ID for ≥10 PRs" },
          { id: "roleIssue1",      label: "ROLE_ID_ISSUE_1 (optional)",           type: "text",     placeholder: "Role ID for ≥1 Issue" },
          { id: "roleIssue5",      label: "ROLE_ID_ISSUE_5 (optional)",           type: "text",     placeholder: "Role ID for ≥5 Issues" },
          { id: "roleCommit1",     label: "ROLE_ID_COMMIT_1 (optional)",          type: "text",     placeholder: "Role ID for ≥1 Commit" },
          { id: "roleCommit15",    label: "ROLE_ID_COMMIT_15 (optional)",         type: "text",     placeholder: "Role ID for ≥15 Commits" },
        ].map(({ id, label, type, placeholder }) => (
          <div key={id}>
            <Label htmlFor={id}>{label}</Label>
            {type === "textarea" ? (
              <Textarea
                id={id}
                placeholder={placeholder}
                rows={6}
                value={formData[id]}
                onChange={e =>
                  setFormData({ ...formData, [id]: e.target.value })
                }
              />
            ) : (
              <Input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={e =>
                  setFormData({ ...formData, [id]: e.target.value })
                }
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );


    case 4:
      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">OAuth Integration</h2>
            <p className="text-gray-600">Set up GitHub OAuth for user verification</p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="clientId">GitHub Client ID</Label>
              <Input
                id="clientId"
                placeholder="Your GitHub Client ID"
                value={formData.clientId}
                onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="clientSecret">GitHub Client Secret</Label>
              <Input
                id="clientSecret"
                type="password"
                placeholder="Your GitHub Client Secret"
                value={formData.clientSecret}
                onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
              />
            </div>
          </div>
        </div>
      );

      case 5:
      // Secrets Configuration
      return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Secrets Configuration
        </h2>
        <p className="text-gray-600">
          Copy these values into your GitHub repository secrets
        </p>
      </div>
      <div className="space-y-4">
        {[
          { key: "BASE_URL",                  value: formData.baseUrl },
          { key: "FIREBASE_CREDENTIALS_JSON", value: formData.firebaseJson },
          { key: "DISCORD_BOT_TOKEN",         value: formData.botToken },
          { key: "DISCORD_CLIENT_ID",         value: formData.clientId },
          { key: "GUILD_ID",                  value: formData.guildId },
          { key: "WEEKLY_DIGEST_CHANNEL_ID",  value: formData.digestChan },
          { key: "GH_CLIENT_ID",              value: formData.ghClientId },
          { key: "GH_CLIENT_SECRET",          value: formData.ghClientSecret },
          { key: "GH_STATS_TOKEN",            value: formData.ghStatsToken },
          { key: "ROLE_ID_PR_1",              value: formData.rolePr1 },
          { key: "ROLE_ID_PR_5",              value: formData.rolePr5 },
          { key: "ROLE_ID_PR_10",             value: formData.rolePr10 },
          { key: "ROLE_ID_ISSUE_1",           value: formData.roleIssue1 },
          { key: "ROLE_ID_ISSUE_5",           value: formData.roleIssue5 },
          { key: "ROLE_ID_COMMIT_1",          value: formData.roleCommit1 },
          { key: "ROLE_ID_COMMIT_15",         value: formData.roleCommit15 },
        ].map(secret => (
          <div key={secret.key} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <Label className="font-medium">{secret.key}</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(secret.value, secret.key)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <code className="bg-gray-100 p-2 rounded text-sm block">
              {secret.value}
            </code>
          </div>
        ))}
      </div>
    </div>
  );


      case 6:
      const discordRoleYaml = `# .github/workflows/discord-role.yml
name: Trigger Assign Discord Role Workflow

on:
  pull_request:
    types: [opened]
  issues:
    types: [opened]
  push:
    branches:
      - feature/discord-role-assignment
#test1
jobs:
  assign-role:
    uses: yashitz07/GitHub-Actions-workflow/.github/workflows/discord-role.yml@main
    with:
      ACTOR: \${{ github.actor }}
      GITHUB_EVENT_NAME: \${{ github.event_name }}
      GITHUB_EVENT_ACTION: \${{ github.event.action }}
    secrets:
      DISCORD_BOT_TOKEN: \${{ secrets.DISCORD_BOT_TOKEN }}
      FIREBASE_CREDENTIALS_JSON: \${{ secrets.FIREBASE_CREDENTIALS_JSON }}
      GUILD_ID: \${{ secrets.GUILD_ID }}
      GH_STATS_TOKEN: \${{ secrets.GH_STATS_TOKEN }}

      ROLE_ID_PR_1: \${{ secrets.ROLE_ID_PR_1 }}
      ROLE_ID_PR_5: \${{ secrets.ROLE_ID_PR_5 }}
      ROLE_ID_PR_10: \${{ secrets.ROLE_ID_PR_10 }}

      ROLE_ID_ISSUE_1: \${{ secrets.ROLE_ID_ISSUE_1 }}
      ROLE_ID_ISSUE_5: \${{ secrets.ROLE_ID_ISSUE_5 }}

      ROLE_ID_COMMIT_1: \${{ secrets.ROLE_ID_COMMIT_1 }}
      ROLE_ID_COMMIT_15: \${{ secrets.ROLE_ID_COMMIT_15 }}`;

      const weeklyDigestYaml = `# .github/workflows/weekly-digest.yml
name: Trigger Weekly Digest Workflow

on:
  schedule:
    - cron: '0 9 * * 0'  # Every Sunday at 9:00 AM UTC
  workflow_dispatch:      # Optional: for manual testing via "Run workflow" button

jobs:
  weekly-digest:
    uses: yashitz07/GitHub-Actions-workflow/.github/workflows/weekly-digest.yml@main
    secrets:
      DISCORD_BOT_TOKEN: \${{ secrets.DISCORD_BOT_TOKEN }}
      FIREBASE_CREDENTIALS_JSON: \${{ secrets.FIREBASE_CREDENTIALS_JSON }}
      GUILD_ID: \${{ secrets.GUILD_ID }}
      GH_STATS_TOKEN: \${{ secrets.GH_STATS_TOKEN }}
      WEEKLY_DIGEST_CHANNEL_ID: \${{ secrets.WEEKLY_DIGEST_CHANNEL_ID }}`;

      return (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Workflow Files</h2>
            <p className="text-gray-600">Copy these into <code>.github/workflows/</code></p>
          </div>

          {[{ name: 'discord-role.yml', content: discordRoleYaml },
            { name: 'weekly-digest.yml', content: weeklyDigestYaml }
          ].map((wf) => (
            <div key={wf.name} className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">{wf.name}</h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(wf.content, wf.name)}>
                    <Copy className="w-4 h-4 mr-2"/>Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => downloadFile(wf.content, wf.name)}>
                    <Download className="w-4 h-4 mr-2"/>Download
                  </Button>
                </div>
              </div>
              <pre className="bg-white p-4 rounded border text-sm overflow-x-auto">
                <code>{wf.content}</code>
              </pre>
            </div>
          ))}
        </div>
      );

      case 7:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Setup Complete!</h2>
              <p className="text-gray-600">Your GitHub-Discord integration is now configured</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Test the Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Have your Discord users run the <code>/verify</code> command to link their accounts.
                  </p>
                  <Badge className="bg-green-100 text-green-800">Ready to use</Badge>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monitor Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Check the Actions tab in your GitHub repository to monitor workflow runs.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://github.com/${formData.orgName}/${formData.repoName}/actions`} target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Actions
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Wizard</h1>
          <p className="text-lg text-gray-600">
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1]}
          </p>
        </div>
        
        <Stepper currentStep={currentStep} totalSteps={totalSteps} steps={steps} />
        
        <Card className="mt-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>
        
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="flex items-center">
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <a href="/">
                Complete Setup
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetupWizard;
