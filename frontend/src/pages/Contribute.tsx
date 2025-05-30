
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Heart, Code, BookOpen, Bug, Star, GitPullRequest, Users, Coffee } from "lucide-react";

const Contribute = () => {
  const contributionTypes = [
    {
      icon: <Code className="w-6 h-6 text-blue-600" />,
      title: "Code Contributions",
      description: "Help improve the codebase with bug fixes and new features",
      examples: ["Fix Discord bot issues", "Add new role assignment rules", "Improve error handling"]
    },
    {
      icon: <BookOpen className="w-6 h-6 text-green-600" />,
      title: "Documentation",
      description: "Enhance guides, tutorials, and API documentation",
      examples: ["Update setup guides", "Add troubleshooting tips", "Improve code comments"]
    },
    {
      icon: <Bug className="w-6 h-6 text-red-600" />,
      title: "Bug Reports",
      description: "Help identify and report issues to improve stability",
      examples: ["Report Discord bot crashes", "Document API errors", "Share configuration problems"]
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Community Support",
      description: "Help other users in discussions and forums",
      examples: ["Answer questions in issues", "Share configuration examples", "Mentor new contributors"]
    }
  ];

  const goodFirstIssues = [
    {
      title: "Add role hierarchy validation",
      labels: ["good first issue", "enhancement"],
      difficulty: "Easy",
      description: "Check if bot role is higher than assigned roles before attempting assignment"
    },
    {
      title: "Improve error messages in Discord responses",
      labels: ["good first issue", "UX"],
      difficulty: "Easy",
      description: "Make error messages more user-friendly and actionable"
    },
    {
      title: "Add configuration validation script",
      labels: ["good first issue", "tooling"],
      difficulty: "Medium",
      description: "Create a script to validate configuration files before deployment"
    },
    {
      title: "Implement rate limiting for API calls",
      labels: ["enhancement", "performance"],
      difficulty: "Medium",
      description: "Add proper rate limiting to prevent API quota exhaustion"
    }
  ];

  const stats = [
    { icon: <Star className="w-5 h-5" />, label: "Stars", value: "1.2k" },
    { icon: <GitPullRequest className="w-5 h-5" />, label: "Pull Requests", value: "156" },
    { icon: <Users className="w-5 h-5" />, label: "Contributors", value: "42" },
    { icon: <Bug className="w-5 h-5" />, label: "Issues Resolved", value: "203" }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-red-100 text-red-800">
            <Heart className="w-4 h-4 mr-1" />
            Open Source
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contribute to GitCord
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us build the best Discord-GitHub integration for open-source communities. 
            Every contribution, big or small, makes a difference!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-2 text-blue-600">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Quick Start for Contributors
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  1
                </div>
                <CardTitle>Fork & Clone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Fork the repository and clone it to your local machine to start developing.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    Fork Repository
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  2
                </div>
                <CardTitle>Find an Issue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Browse open issues and pick one that matches your skills and interests.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Bug className="w-4 h-4 mr-2" />
                    Browse Issues
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200">
              <CardHeader>
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                  3
                </div>
                <CardTitle>Submit PR</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Make your changes, test thoroughly, and submit a pull request for review.
                </p>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <GitPullRequest className="w-4 h-4 mr-2" />
                    Create PR
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contribution Types */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Ways to Contribute
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contributionTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {type.icon}
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm text-gray-700">Examples:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {type.examples.map((example, idx) => (
                        <li key={idx} className="text-sm text-gray-600">{example}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Good First Issues */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Good First Issues
          </h2>
          
          <div className="space-y-4">
            {goodFirstIssues.map((issue, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                        <Badge 
                          variant={issue.difficulty === 'Easy' ? 'default' : 'secondary'}
                          className={issue.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                        >
                          {issue.difficulty}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{issue.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {issue.labels.map((label, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {label}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button asChild variant="outline" size="sm">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Issue
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contribution Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Contribution Guidelines
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="w-5 h-5 text-blue-600" />
                  <span>Code Standards</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Follow existing code style and conventions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Write clear, descriptive commit messages</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Add tests for new features and bug fixes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Update documentation for API changes</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GitPullRequest className="w-5 h-5 text-green-600" />
                  <span>Pull Request Process</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Create feature branches from main</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Ensure all tests pass before submitting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Link related issues in PR description</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Be responsive to code review feedback</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <Coffee className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            Ready to Contribute?
          </h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join our community of contributors and help make GitCord better for everyone. 
            Every contribution is valued and appreciated!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Start Contributing
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <Users className="w-4 h-4 mr-2" />
                Join Discord
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
