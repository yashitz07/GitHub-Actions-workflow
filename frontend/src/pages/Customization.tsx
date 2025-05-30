
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Copy, Settings, Database, GitBranch, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Customization = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: `${label} has been copied to your clipboard.`,
    });
  };

  const roleConfig = `// config/roles.js
export const ROLE_THRESHOLDS = {
  'Contributor': {
    minPRs: 5,
    minCommits: 10,
    roleId: '123456789012345678'
  },
  'Active Contributor': {
    minPRs: 15,
    minCommits: 30,
    roleId: '123456789012345679'
  },
  'Maintainer': {
    minPRs: 50,
    minCommits: 100,
    roleId: '123456789012345680'
  }
};

export const EXCLUDED_REPOS = [
  'test-repo',
  'private-experiments'
];`;
// Run every Monday at 9 AM UTC
  const workflowConfig = `# .github/workflows/discord-role.yml
name: Trigger Weekly Digest Workflow
# Run every Sunday at 9 AM UTC
on:
  schedule:
    - cron: '0 9 * * 0'  
  workflow_dispatch:     

jobs:
  weekly-digest:
    uses: yashitz07/GitHub-Actions-workflow/.github/workflows/weekly-digest.yml@main
    secrets:
      DISCORD_BOT_TOKEN: \${{ secrets.DISCORD_BOT_TOKEN }}
      FIREBASE_CREDENTIALS_JSON: \${{ secrets.FIREBASE_CREDENTIALS_JSON }}
      GUILD_ID: \${{ secrets.GUILD_ID }}
      GH_STATS_TOKEN: \${{ secrets.GH_STATS_TOKEN }}
      WEEKLY_DIGEST_CHANNEL_ID: \${{ secrets.WEEKLY_DIGEST_CHANNEL_ID }}`;

  const firestoreRules = `// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Contributions collection - read-only for authenticated users
    match /contributions/{contributionId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
    
    // Role assignments - admin only
    match /roleAssignments/{assignmentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.admin == true;
    }
  }
}`;

  const customizations = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Role Thresholds",
      description: "Customize contribution requirements for different Discord roles",
      category: "Configuration"
    },
    {
      icon: <GitBranch className="w-6 h-6 text-green-600" />,
      title: "Repository Filtering",
      description: "Include or exclude specific repositories from contribution counting",
      category: "GitHub"
    },
    {
      icon: <Settings className="w-6 h-6 text-purple-600" />,
      title: "Workflow Scheduling",
      description: "Modify when and how often the role assignment runs",
      category: "Automation"
    },
    {
      icon: <Database className="w-6 h-6 text-orange-600" />,
      title: "Database Rules",
      description: "Configure Firestore security rules for your data",
      category: "Security"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-100 text-green-800">
            Customization Guide
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Customize Your Integration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailor the Discord role assignment system to fit your community's specific needs
            and contribution requirements.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {customizations.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {item.icon}
                </div>
                <Badge variant="outline" className="mb-2">
                  {item.category}
                </Badge>
                <CardTitle className="text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detailed Customization Options */}
        <div className="space-y-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="role-thresholds">
              <AccordionTrigger className="text-xl font-semibold">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Role Thresholds Configuration</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Customize the contribution requirements for different Discord roles. 
                    Modify the thresholds based on your community's activity level.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Role Configuration</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(roleConfig, "Role configuration")}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <pre className="bg-white p-4 rounded border text-sm overflow-x-auto">
                      <code>{roleConfig}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Configuration Tips:</h4>
                    <ul className="list-disc list-inside text-blue-800 space-y-1">
                      <li>Set realistic thresholds based on your repository activity</li>
                      <li>Consider both PR count and commit count for balanced evaluation</li>
                      <li>Use Discord's Developer Portal to get role IDs</li>
                      <li>Test with a small group before rolling out community-wide</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="repository-filtering">
              <AccordionTrigger className="text-xl font-semibold">
                <div className="flex items-center space-x-2">
                  <GitBranch className="w-5 h-5 text-green-600" />
                  <span>Repository Filtering</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Control which repositories are included in contribution calculations. 
                    Exclude test repositories or include only specific projects.
                  </p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Include Specific Repos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-100 p-3 rounded text-sm">
{`// Only count these repositories
const INCLUDED_REPOS = [
  'main-project',
  'documentation',
  'community-tools'
];`}
                        </pre>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Exclude Specific Repos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <pre className="bg-gray-100 p-3 rounded text-sm">
{`// Exclude these repositories
const EXCLUDED_REPOS = [
  'test-repo',
  'experiments',
  'private-tools'
];`}
                        </pre>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="workflow-scheduling">
              <AccordionTrigger className="text-xl font-semibold">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span>Workflow Scheduling</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Customize when and how often the role assignment workflow runs. 
                    Adjust the schedule based on your community's activity patterns.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Workflow Configuration</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(workflowConfig, "Workflow configuration")}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <pre className="bg-white p-4 rounded border text-sm overflow-x-auto">
                      <code>{workflowConfig}</code>
                    </pre>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Daily</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <code className="text-sm">cron: '0 9 * * *'</code>
                        <p className="text-gray-600 mt-2">Runs every day at 9 AM UTC</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Weekly</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <code className="text-sm">cron: '0 9 * * 1'</code>
                        <p className="text-gray-600 mt-2">Runs every Monday at 9 AM UTC</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Monthly</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <code className="text-sm">cron: '0 9 1 * *'</code>
                        <p className="text-gray-600 mt-2">Runs on the 1st of each month</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="firestore-rules">
              <AccordionTrigger className="text-xl font-semibold">
                <div className="flex items-center space-x-2">
                  <Database className="w-5 h-5 text-orange-600" />
                  <span>Firestore Security Rules</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Configure Firestore security rules to control access to user data 
                    and contribution records. Ensure proper authentication and authorization.
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold">Security Rules</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(firestoreRules, "Firestore rules")}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <pre className="bg-white p-4 rounded border text-sm overflow-x-auto">
                      <code>{firestoreRules}</code>
                    </pre>
                  </div>
                  
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-900 mb-2">Security Best Practices:</h4>
                    <ul className="list-disc list-inside text-orange-800 space-y-1">
                      <li>Always require authentication for data access</li>
                      <li>Implement role-based access control for admin functions</li>
                      <li>Validate data structure and content in rules</li>
                      <li>Regularly review and update security rules</li>
                      <li>Test rules thoroughly before deploying to production</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Additional Resources */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Need Help with Customization?
            </h2>
            <p className="text-blue-100 mb-6">
              Check out our additional resources or contribute to the project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <a href="/faq">
                  View FAQ
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
                <a href="/contribute">
                  Contribute
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customization;
