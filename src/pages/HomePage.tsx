import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Search } from 'lucide-react';
    import PromotionalWidgets from '../components/PromotionalWidgets';
    import logo from '../assets/logo.png';

    function HomePage() {
        const [prompt, setPrompt] = useState('');
        const navigate = useNavigate();

        const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setPrompt(e.target.value);
        };

        const handleFormSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (prompt.trim()) {
                navigate('/thread', { state: { message: prompt.trim() } });
            }
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between p-4 border-b border-gray-700/50">
                    <div className="flex items-center gap-4">
                        <img src={logo} alt="NaySigma Logo" className="h-8" />
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                    <div className="max-w-2xl w-full">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Welcome to Project Stealth</h2>
                        <p className="text-lg text-gray-400 mb-8">Your intelligent assistant for visual and textual analysis. Start by asking a question or uploading an image.</p>

                        {/* Search/Prompt Input */}
                        <form onSubmit={handleFormSubmit} className="relative w-full mb-12">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={prompt}
                                onChange={handlePromptChange}
                                placeholder="Ask me anything about an image or a topic..."
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </form>

                        {/* Promotional Widgets */}
                        <PromotionalWidgets onWidgetClick={(text) => navigate('/thread', { state: { message: text } })} />
                    </div>
                </main>
            </div>
        );
    }

    export default HomePage;
