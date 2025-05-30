
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink, Users, Award, MessageSquare } from "lucide-react";

const Demo = () => {
  const demoSteps = [
    {
      icon: <MessageSquare className="w-6 h-6 text-blue-600" />,
      title: "User runs /verify command",
      description: "Discord user initiates the verification process",
      timestamp: "00:15"
    },
    {
      icon: <ExternalLink className="w-6 h-6 text-green-600" />,
      title: "OAuth authentication",
      description: "User authenticates with GitHub via OAuth",
      timestamp: "00:45"
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Contribution analysis",
      description: "System analyzes GitHub contributions and pull requests",
      timestamp: "01:20"
    },
    {
      icon: <Award className="w-6 h-6 text-orange-600" />,
      title: "Role assignment",
      description: "Discord role automatically assigned based on contributions",
      timestamp: "01:45"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-purple-100 text-purple-800">
            Live Demo
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            See GitCord in Action
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how the automated Discord role assignment works in real-time, 
            from user verification to role assignment.
          </p>
        </div>

        {/* Video Section */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                {/* Placeholder for demo video */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Demo Video</h3>
                  <p className="text-gray-300 mb-4">Complete workflow demonstration</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                </div>
                
                {/* YouTube embed would go here */}
                <iframe width="560" height="315"
                        src="https://www.youtube.com/embed/HxevzBryUqA"
                        frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                </iframe>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* How it Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoSteps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {step.timestamp}
                  </Badge>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Demo Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>User Experience</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Simple <code>/verify</code> command in Discord</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Secure OAuth authentication with GitHub</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Instant role assignment based on contributions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Automatic updates when reaching new milestones</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span>Admin Benefits</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Automated community management</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Real-time contribution tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Weekly contribution digest reports</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>Customizable role thresholds</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to implement this in your community?
          </h2>
          <p className="text-blue-100 mb-6">
            Follow our step-by-step setup guide to get started in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
              <a href="/setup">
                Start Setup Guide
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
              <a href="https://github.com/yashitz07/GSOC-25-Ruxailab" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Source Code
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
