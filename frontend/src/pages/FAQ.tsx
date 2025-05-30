
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, HelpCircle, MessageSquare, ExternalLink, CheckCircle, XCircle } from "lucide-react";

const FAQ = () => {
  const faqCategories = [
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: "Discord Setup",
      description: "Bot configuration and Discord-related issues",
      count: 6
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-red-600" />,
      title: "Common Errors",
      description: "Troubleshooting frequent problems",
      count: 8
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: "Configuration",
      description: "Setup and customization questions",
      count: 5
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-purple-600" />,
      title: "General Questions",
      description: "About the project and how it works",
      count: 4
    }
  ];

  const faqs = [
    {
      category: "discord",
      question: "Why is the /verify command not working?",
      answer: (
        <div className="space-y-3">
          <p>The /verify command might not work due to several reasons:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Bot permissions:</strong> Ensure the bot has "Use Slash Commands" permission</li>
            <li><strong>Command registration:</strong> Commands may take up to 1 hour to register globally</li>
            <li><strong>Bot online status:</strong> Check if your bot is online and responding</li>
            <li><strong>Server permissions:</strong> Verify the bot has proper role management permissions</li>
          </ul>
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-blue-800"><strong>Quick fix:</strong> Try kicking and re-inviting the bot with the correct permissions.</p>
          </div>
        </div>
      )
    },
    {
      category: "error",
      question: "How do I fix Firestore permission denied errors?",
      answer: (
        <div className="space-y-3">
          <p>Firestore permission errors usually occur due to incorrect security rules:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Check your Firestore security rules in the Firebase Console</li>
            <li>Ensure authenticated users can read/write their own data</li>
            <li>Verify admin users have elevated permissions</li>
            <li>Test rules using the Firebase Console simulator</li>
          </ol>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-yellow-800"><strong>Security note:</strong> Never allow unrestricted access to your database.</p>
          </div>
        </div>
      )
    },
    {
      category: "discord",
      question: "Why is my role not being assigned automatically?",
      answer: (
        <div className="space-y-3">
          <p>Role assignment issues can have multiple causes:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Contribution thresholds:</strong> Check if you meet the minimum requirements</li>
            <li><strong>Repository inclusion:</strong> Ensure your contributions are in monitored repositories</li>
            <li><strong>GitHub linking:</strong> Verify your Discord account is properly linked to GitHub</li>
            <li><strong>Bot hierarchy:</strong> The bot role must be higher than the roles it assigns</li>
            <li><strong>Workflow schedule:</strong> Role updates may only run weekly or on schedule</li>
          </ul>
        </div>
      )
    },
    {
      category: "config",
      question: "How do I change the contribution thresholds?",
      answer: (
        <div className="space-y-3">
          <p>To modify contribution requirements:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Edit the <code className="bg-gray-200 px-1 rounded">config/roles.js</code> file in your repository</li>
            <li>Adjust the <code className="bg-gray-200 px-1 rounded">minPRs</code> and <code className="bg-gray-200 px-1 rounded">minCommits</code> values</li>
            <li>Update the corresponding Discord role IDs</li>
            <li>Commit and push your changes</li>
            <li>The next workflow run will use the new thresholds</li>
          </ol>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-green-800"><strong>Tip:</strong> Test with lower thresholds first to verify the system works correctly.</p>
          </div>
        </div>
      )
    },
    {
      category: "error",
      question: "GitHub Actions workflow is failing. What should I check?",
      answer: (
        <div className="space-y-3">
          <p>When workflows fail, check these common issues:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Secrets configuration:</strong> Verify all required secrets are properly set</li>
            <li><strong>Token permissions:</strong> Ensure GitHub token has necessary repository access</li>
            <li><strong>Dependencies:</strong> Check if all npm packages are correctly installed</li>
            <li><strong>Syntax errors:</strong> Review the workflow YAML for formatting issues</li>
            <li><strong>API limits:</strong> GitHub and Discord APIs have rate limits</li>
          </ul>
          <div className="bg-red-50 p-3 rounded-lg">
            <p className="text-red-800"><strong>Debug tip:</strong> Check the Actions tab in your repository for detailed error logs.</p>
          </div>
        </div>
      )
    },
    {
      category: "general",
      question: "Is my data secure and private?",
      answer: (
        <div className="space-y-3">
          <p>Yes, the system is designed with security and privacy in mind:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>OAuth authentication:</strong> Uses secure GitHub OAuth flow</li>
            <li><strong>Minimal data storage:</strong> Only stores necessary contribution data</li>
            <li><strong>Encrypted secrets:</strong> All sensitive tokens are encrypted in GitHub</li>
            <li><strong>Role-based access:</strong> Firestore rules restrict data access</li>
            <li><strong>Open source:</strong> All code is publicly available for review</li>
          </ul>
        </div>
      )
    },
    {
      category: "config",
      question: "Can I customize the weekly digest messages?",
      answer: (
        <div className="space-y-3">
          <p>Yes, you can customize the digest format:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Modify the <code className="bg-gray-200 px-1 rounded">templates/digest.js</code> file</li>
            <li>Update message formatting, emojis, and content</li>
            <li>Customize the contribution summary layout</li>
            <li>Add or remove sections as needed</li>
          </ol>
        </div>
      )
    },
    {
      category: "discord",
      question: "How do I get Discord role IDs?",
      answer: (
        <div className="space-y-3">
          <p>To find Discord role IDs:</p>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Enable Developer Mode in Discord Settings → Advanced</li>
            <li>Go to your Discord server settings</li>
            <li>Navigate to Roles section</li>
            <li>Right-click on the role and select "Copy ID"</li>
            <li>Use this ID in your configuration file</li>
          </ol>
        </div>
      )
    },
    {
      category: "error",
      question: "The bot is online but not responding to commands",
      answer: (
        <div className="space-y-3">
          <p>If the bot is online but unresponsive:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Intents:</strong> Ensure the bot has proper Gateway Intents enabled</li>
            <li><strong>Permissions:</strong> Check bot permissions in the specific channel</li>
            <li><strong>Command scope:</strong> Verify commands are registered for your guild</li>
            <li><strong>Error logs:</strong> Check your hosting platform for error messages</li>
          </ul>
        </div>
      )
    },
    {
      category: "general",
      question: "Can I use this with private repositories?",
      answer: (
        <div className="space-y-3">
          <p>Yes, but with some considerations:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>GitHub App permissions:</strong> Must have access to private repositories</li>
            <li><strong>Token scope:</strong> GitHub token needs appropriate repository permissions</li>
            <li><strong>Team access:</strong> Contributors must have access to the repositories</li>
            <li><strong>Billing:</strong> Private repositories may have different API limits</li>
          </ul>
        </div>
      )
    }
  ];

  const getIcon = (category: string) => {
    switch (category) {
      case 'discord': return <MessageSquare className="w-5 h-5 text-blue-600" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'config': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'general': return <HelpCircle className="w-5 h-5 text-purple-600" />;
      default: return <HelpCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-yellow-100 text-yellow-800">
            Support & Troubleshooting
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about setting up and troubleshooting 
            the GitHub-Discord role assignment integration.
          </p>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {faqCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {category.icon}
                </div>
                <CardTitle className="text-lg">{category.title}</CardTitle>
                <Badge variant="outline" className="mt-2">
                  {category.count} questions
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-sm">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            All Questions & Answers
          </h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  <div className="flex items-start space-x-3">
                    {getIcon(faq.category)}
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="ml-8">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Still Need Help Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <CardContent className="p-8 text-center">
              <HelpCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Still Need Help?
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Check out these additional resources 
                or reach out to the community for support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    GitHub Issues
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Discord Community
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/contribute">
                    Improve Documentation
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
