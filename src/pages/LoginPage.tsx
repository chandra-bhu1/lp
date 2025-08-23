import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, Network, LayoutTemplate, Sparkles, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const widgetData = [
  {
    icon: <Code2 size={24} className="text-blue-400" />,
    title: 'AI Powered DSA Masterclass',
    subtitle: 'Master Data Structures & Algorithms with AI-guided lessons',
    buttonText: 'Begin Journey',
  },
  {
    icon: <Network size={24} className="text-purple-400" />,
    title: 'Crack System Design interviews',
    subtitle: 'Practice real mock interviews & sharpen your design skills',
    buttonText: 'Explore Now',
  },
  {
    icon: <LayoutTemplate size={24} className="text-pink-400" />,
    title: 'Vibe-code Full-Stack web applications',
    subtitle: 'Generate and customize websites instantly with AI',
    buttonText: "Let's go",
  },
  {
    icon: <Sparkles size={24} className="text-green-400" />,
    title: 'Analyze your progress...',
    subtitle: 'Your AI mentor analyzes your progress and gives you personalized feedback.',
    buttonText: 'Unlock Access',
  },
];

function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    // Simulate loading for demo purposes
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex">
      {/* Left Side - Promotional Cards */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12">
        {/* Logo */}
        <div className="absolute top-8 left-8">
          <img src={logo} alt="NaySigma Logo" className="h-12 max-w-48 object-contain scale-[1.6]" />
        </div>

        {/* Cards Container */}
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {widgetData.map((widget, index) => (
              <div
                key={index}
                className="group relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-pink-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/20 animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both'
                }}
              >
                <div className="relative bg-gray-900/95 backdrop-blur-sm h-full w-full rounded-[15px] px-6 py-5 flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 p-2 bg-gray-800/70 rounded-lg transition-all duration-300 group-hover:bg-gray-700/90">
                      {widget.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm">{widget.title}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{widget.subtitle}</p>
                  <button className="text-xs font-semibold text-gray-400 bg-gray-800/70 px-3 py-1.5 rounded-full transition-all duration-300 hover:bg-gray-700/90 hover:text-white hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center space-x-1.5 w-full">
                    <span>{widget.buttonText}</span>
                    <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-12 relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-l from-gray-900/50 to-transparent" />
        
        <div className="relative z-10 w-full max-w-md animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'both' }}>
          {/* Welcome Text */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight font-sans">
              Welcome back
            </h1>
            <p className="text-lg text-gray-400 font-sans">
              Login to continue your journey.
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="group relative w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-white/10 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              <div className="relative flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="clean-spinner" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </div>
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600/50" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-br from-black via-gray-900 to-black text-gray-400">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-2xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Sign In Button */}
            <button
              onClick={() => navigate('/')}
              className="group relative w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20 overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl" />
              
              <span className="relative">Sign In</span>
            </button>

            {/* Footer Links */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <button className="text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium">
                  Sign up
                </button>
              </p>
              <button className="text-sm text-gray-500 hover:text-gray-400 transition-colors duration-200">
                Forgot your password?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;