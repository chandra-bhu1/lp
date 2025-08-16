import React, { useState } from 'react';
import { 
  Paperclip, 
  Settings, 
  Menu, 
  Atom,
  ArrowUp,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PromotionalWidgets from './components/PromotionalWidgets';

function App() {
  const [selectedModel, setSelectedModel] = useState('v1.5');
  const [showModelSelector, setShowModelSelector] = useState(false);
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();

  const models = [
    { id: 'v1.5', name: 'v1.5 Beta', available: true, selected: true },
    { id: 'v2', name: 'v2', available: false, selected: false }
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedExtensions = ['.txt', '.js', '.py', '.cpp', '.c', '.java', '.html', '.css', '.md', '.json', '.xml', '.ts', '.tsx', '.jsx'];
    const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

    if (!allowedExtensions.includes(fileExtension)) {
      alert(`Unsupported file type: ${fileExtension}\nPlease upload one of the following: ${allowedExtensions.join(', ')}`);
      event.target.value = ''; // Reset file input
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('File size must be less than 5MB');
      event.target.value = ''; // Reset file input
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target?.result as string;
      const formattedContent = `\n\n--- ${file.name} ---\n${fileContent}`;
      setMessage(prevMessage => prevMessage + formattedContent);
    };
    reader.onerror = () => {
      alert('Error reading file.');
    };
    reader.readAsText(file);

    // Reset file input to allow re-uploading the same file
    event.target.value = '';
  };

  const handleSubmit = async () => {
    if (!message.trim()) return;

    // Navigate to the chat thread page with the message content.
    navigate('/chat', { state: { message } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative">
      {/* Model Selector Dropdown - Positioned at top level */}
      {showModelSelector && (
        <div className="fixed inset-0 z-[9999]" onClick={() => setShowModelSelector(false)}>
          <div 
            className="absolute top-[180px] right-[calc(50%-384px+60px)] bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-600/50 shadow-xl min-w-48"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 border-b border-gray-600/50">
              <h3 className="font-medium text-sm text-gray-300">Select Model</h3>
            </div>
            <div className="p-2">
              {models.map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    if (model.available) {
                      setSelectedModel(model.id);
                      setShowModelSelector(false);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    model.available 
                      ? 'hover:bg-gray-700/50' 
                      : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {model.id === 'v2' ? (
                      <div className="w-4 h-4 flex items-center justify-center">
                        <Atom size={16} style={{
                          background: 'linear-gradient(45deg, #60a5fa, #f472b6)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }} />
                      </div>
                    ) : (
                      <div className="w-4 h-4 flex items-center justify-center">
                        <div className={`w-2 h-2 rounded-full ${
                          selectedModel === model.id ? 'bg-green-500' : 'bg-gray-600'
                        }`} />
                      </div>
                    )}
                    <span className="text-sm font-bold text-white">
                      {model.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!model.available && (
                      <div className="flex items-center text-xs">
                        <span className={model.id === 'v2' ? 'font-medium' : 'text-gray-400'} style={model.id === 'v2' ? {
                          background: 'linear-gradient(45deg, #60a5fa, #f472b6)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        } : {}}>
                          Coming Soon{model.id === 'v2' ? '...' : ''}
                        </span>
                      </div>
                    )}
                    {selectedModel === model.id && model.available && (
                      <Check size={14} className="text-green-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-medium">Project Stealth</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl">
            <Atom size={16} />
            <span>Join v2 Waitlist</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-16 min-h-[calc(100vh-80px)]">
        {/* Spacer to push content down */}
        <div className="h-24"></div>
        
        {/* Title and Chat Input grouped together */}
        <div className="w-full max-w-3xl mx-auto mb-20">
          {/* Title positioned just above input */}
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-semibold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent leading-tight pb-3">
              What are we solving today?
            </h2>
          </div>

          {/* Chat Input Container */}
          <div className="relative">
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-600/50 shadow-2xl">
              <div className="flex items-end p-4 space-x-3">
                {/* File Upload */}
                <div className="flex-shrink-0">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".txt,.js,.py,.cpp,.c,.java,.html,.css,.md,.json,.xml,.ts,.tsx,.jsx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer transition-colors bg-gray-700/50 hover:bg-gray-600/50"
                  >
                    <Paperclip size={18} />
                  </label>
                </div>

                {/* Text Input */}
                <div className="flex-1">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask anything, or attach a file..."
                    className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[24px] max-h-96"
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = `${target.scrollHeight}px`;
                    }}
                  />
                </div>

                {/* Model Selector */}
                <div className="flex-shrink-0">
                  <button
                    onClick={() => setShowModelSelector(!showModelSelector)}
                    className="flex items-center justify-center w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-lg transition-colors"
                  >
                    <Settings size={18} />
                  </button>
                </div>

                {/* Send Button */}
                <button 
                  onClick={handleSubmit}
                  className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                    message.trim()
                      ? 'bg-white text-black hover:bg-gray-200' 
                      : 'bg-gray-700/50 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={!message.trim()}
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </div>

            {/* Model Indicator */}
            <div className="absolute -bottom-8 left-4 flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Using {models.find(m => m.id === selectedModel)?.name}</span>
            </div>
          </div>
        </div>

        {/* Promotional Widgets in their own wider container */}
        <div className="w-full max-w-7xl mx-auto">
          <PromotionalWidgets />
        </div>
      </main>
    </div>
  );
}

export default App;
