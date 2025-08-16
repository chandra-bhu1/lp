import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';

export const BACKEND_URL = "http://34.131.157.210:8080";

interface ChatMessage {
    id: string;
    sender: 'user' | 'bot';
    text?: string;
    imageUrl?: string; // Keep for type consistency, but won't be used for text prompts
    timestamp: string;
    isThinking?: boolean;
}

function ChatThreadPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { message } = location.state || {}; // Only expect message

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    
    // State for Follow-up Chat
    const [initialPrompt, setInitialPrompt] = useState<string>('');
    const [lastAnswer, setLastAnswer] = useState<string>('');
    const [userFollowup, setUserFollowup] = useState('');
    const [followupHistory, setFollowupHistory] = useState<ChatMessage[]>([]);

    // Effect to handle initial text prompt
    useEffect(() => {
        if (!message) {
            // If no message, maybe redirect or show an error
            navigate('/');
            return;
        }

        const userMessage: ChatMessage = {
            id: 'user-initial',
            sender: 'user',
            text: message,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const botThinkingMessage: ChatMessage = {
            id: 'bot-thinking-initial',
            sender: 'bot',
            text: 'Thinking...',
            isThinking: true,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatMessages([userMessage, botThinkingMessage]);
        setInitialPrompt(message);

        const sendTextMessage = async () => {
            try {
                // NOTE: Assuming a new endpoint `/chat/text` for text-based prompts.
                // The backend needs to support this.
                const response = await fetch(`${BACKEND_URL}/chat/text`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: message })
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ detail: 'Invalid JSON response' }));
                    throw new Error(errorData.detail || `HTTP error ${response.status}`);
                }

                const data = await response.json();
                if (!data.answer) {
                    throw new Error("Invalid response format from server.");
                }

                const botResponseMessage: ChatMessage = {
                    id: 'bot-response-initial',
                    sender: 'bot',
                    text: data.answer,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                
                setChatMessages(prev => [...prev.filter(m => m.id !== 'bot-thinking-initial'), botResponseMessage]);
                setLastAnswer(data.answer);

            } catch (error) {
                const errorMessage: ChatMessage = {
                    id: 'bot-error-initial',
                    sender: 'bot',
                    text: `❌ Error: ${(error as Error).message}`,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setChatMessages(prev => [...prev.filter(m => m.id !== 'bot-thinking-initial'), errorMessage]);
            }
        };

        sendTextMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, navigate]);

    const handleSendFollowup = async () => {
        const question = userFollowup.trim();
        if (!question || !lastAnswer) return;

        const newUserMessage: ChatMessage = { id: `user-fup-${Date.now()}`, sender: 'user', text: question, timestamp: new Date().toLocaleTimeString() };
        const botThinkingMessage: ChatMessage = { id: `bot-fup-thinking-${Date.now()}`, sender: 'bot', text: "Thinking...", isThinking: true, timestamp: new Date().toLocaleTimeString() };
        
        setFollowupHistory(prev => [...prev, newUserMessage, botThinkingMessage]);
        setUserFollowup('');

        try {
            const resp = await fetch(`${BACKEND_URL}/chat/followup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    original_vision_text: initialPrompt, // Sending initial prompt here
                    last_answer: lastAnswer,
                    user_followup: question
                })
            });
            
            if (!resp.ok) {
                const errorData = await resp.json().catch(() => ({ detail: 'Invalid JSON response' }));
                throw new Error(errorData.detail || "Follow-up request failed");
            }
            
            const data = await resp.json();
            const finalAnswer: ChatMessage = { id: `bot-fup-${Date.now()}`, sender: 'bot', text: data.answer, timestamp: new Date().toLocaleTimeString() };
            
            setFollowupHistory(prev => [...prev.filter(msg => !msg.isThinking), finalAnswer]);
            setLastAnswer(data.answer);

        } catch (e) {
            const errorMessage: ChatMessage = {id: `bot-fup-error-${Date.now()}`, sender: 'bot', text: `❌ Error: ${e instanceof Error ? e.message : String(e)}`, timestamp: new Date().toLocaleTimeString()};
            setFollowupHistory(prev => [...prev.filter(msg => !msg.isThinking), errorMessage]);
        }
    };

    const isFinalAnswerShown = !!lastAnswer;

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b border-gray-700/50">
                <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"><ArrowLeft size={20} /></button>
                <h1 className="text-lg font-medium">Chat Thread</h1>
                <div className="w-10" /> {/* Spacer */}
            </header>

            {/* Main Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 space-y-4">
                {[...chatMessages, ...followupHistory].map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs md:max-w-md lg:max-w-2xl p-3 rounded-2xl shadow-md ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-700 text-white rounded-bl-none'}`}>
                            {msg.text && (
                                <p className="text-sm whitespace-pre-wrap break-words">
                                    {msg.isThinking ? <span className="flex items-center">{msg.text}<span className="spinner ml-2"></span></span> : msg.text}
                                </p>
                            )}
                            <span className="block text-right text-xs text-gray-300 mt-1">{msg.timestamp}</span>
                        </div>
                    </div>
                ))}
            </main>
            
            {/* Follow-up Input */}
            {isFinalAnswerShown && (
                <footer className="p-4 border-t border-gray-700/50">
                     <div className="relative flex items-end p-2 bg-gray-800/80 rounded-2xl border border-gray-600/50">
                        <textarea
                            value={userFollowup}
                            onChange={e => setUserFollowup(e.target.value)}
                            placeholder="Ask a follow-up question..."
                            onKeyPress={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendFollowup(); } }}
                            className="w-full bg-transparent text-white placeholder-gray-400 resize-none focus:outline-none min-h-[24px] max-h-32 pl-2"
                            rows={1}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement;
                                target.style.height = 'auto';
                                target.style.height = `${target.scrollHeight}px`;
                            }}
                        />
                        <button onClick={handleSendFollowup} disabled={!userFollowup.trim()} className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg transition-colors bg-white text-black disabled:bg-gray-700 disabled:text-gray-400">
                            <Send size={18} />
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
}

export default ChatThreadPage;
