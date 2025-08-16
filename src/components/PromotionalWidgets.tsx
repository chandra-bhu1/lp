import React from 'react';
import { Code2, Network, LayoutTemplate, Sparkles, ArrowRight } from 'lucide-react';

const widgetData = [
  {
    icon: <Code2 size={24} className="text-blue-400" />,
    title: 'AI Powered DSA Masterclass',
    subtitle: 'Master Data Structures &amp; Algorithms with AI-guided lessons',
  },
  {
    icon: <Network size={24} className="text-purple-400" />,
    title: 'Crack System Design interviews',
    subtitle: 'Practice real mock interviews &amp; sharpen your design skills',
  },
  {
    icon: <LayoutTemplate size={24} className="text-pink-400" />,
    title: 'Vibe-code Full-Stack web applications',
    subtitle: 'Generate and customize websites instantly with AI',
  },
  {
    icon: <Sparkles size={24} className="text-green-400" />,
    title: 'Analyze your progress...',
    subtitle: 'Your AI mentor analyzes your progress and gives you personalized feedback.',
  },
];

const PromotionalWidgets = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {widgetData.map((widget, index) => (
        <div
          key={index}
          className="group relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/50 via-purple-500/50 to-pink-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
        >
          <div className="relative bg-gray-900/95 backdrop-blur-sm h-full w-full rounded-[15px] px-6 py-5 flex items-center space-x-4">
            <div className="flex-shrink-0 p-2 bg-gray-800/70 rounded-lg">
              {widget.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-base">{widget.title}</h3>
              <p className="text-sm text-gray-400">{widget.subtitle}</p>
            </div>
            <button className="text-xs font-semibold text-gray-400 bg-gray-800/70 px-3 py-1.5 rounded-full transition-colors hover:bg-gray-700/90 hover:text-white flex items-center space-x-1.5 flex-shrink-0">
              <span>Preview</span>
              <ArrowRight size={12} />
            </button>
          </div>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
        </div>
      ))}
    </div>
  );
};

export default PromotionalWidgets;
