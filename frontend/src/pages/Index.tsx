
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Github, ArrowRight, CheckCircle, RefreshCw, Settings, Users, Zap, Shield } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      title: "Automatic Role Assignment",
      description: "Assign Discord roles based on GitHub contribution levels automatically"
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
      title: "Weekly Contribution Digest",
      description: "Get automated weekly reports of team contributions and achievements"
    },
    {
      icon: <Settings className="w-6 h-6 text-purple-600" />,
      title: "Easy OAuth-based Verification",
      description: "Secure GitHub-Discord account linking with OAuth authentication"
    },
    {
      icon: <Users className="w-6 h-6 text-orange-600" />,
      title: "Community Management",
      description: "Streamline open-source community engagement and recognition"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "Real-time Sync",
      description: "Instant updates when contributors reach new milestones"
    },
    {
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Secure & Reliable",
      description: "Built with security best practices and reliable infrastructure"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            Open Source Community Tool
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Automated Discord Role Assignment
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              via GitHub Contributions
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Streamline your open-source community management with automated Discord role assignment 
            based on GitHub contributions. Perfect for maintainers and community managers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
              <Link to="/setup">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <a href="https://github.com/yashitz07/GSOC-25-Ruxailab" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </a>
            </Button>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to automate your community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with modern tools and best practices to ensure reliability and security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to get your community automated
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Setup Integration</h3>
              <p className="text-gray-600">
                Follow our step-by-step guide to connect GitHub Actions with Discord Bot
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Configure Rules</h3>
              <p className="text-gray-600">
                Set contribution thresholds and customize role assignment criteria
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enjoy Automation</h3>
              <p className="text-gray-600">
                Watch as roles are automatically assigned based on GitHub activity
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to automate your community?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of open-source organizations already using GitCord
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-8">
            <Link to="/setup">
              Start Setup Guide
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
