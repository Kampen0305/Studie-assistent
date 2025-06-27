import React, { useState, useCallback, useRef, useEffect } from 'react';
import { getAnswer } from './services/geminiService';
import type { ChatMessage } from './types';
import Header from './components/Header';
import ChatMessageComponent from './components/ChatMessage';
import Loader from './components/Loader';
import { KENNISBANK } from './data/kennisbank';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Hallo! Ik ben je Studie Assistent. Stel me een vraag over het lesmateriaal.' }
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const userMessage = input.trim();
    if (!userMessage || isLoading) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const assistantResponse = await getAnswer(userMessage, KENNISBANK);
      setMessages(prev => [...prev, { role: 'assistant', content: assistantResponse }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Een onbekende fout is opgetreden.';
      setMessages(prev => [...prev, { role: 'error', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <Header />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <ChatMessageComponent key={index} message={msg} />
          ))}
          {isLoading && 
            <div className="flex justify-start mb-4">
               <div className="bg-gray-700/80 text-white rounded-2xl p-4 shadow-md">
                 <Loader/>
               </div>
            </div>
          }
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-4 bg-gray-900/80 backdrop-blur-sm border-t border-white/10">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Stel een vraag..."
            aria-label="Stel een vraag aan de studie assistent"
            className="flex-1 w-full p-3 bg-gray-800 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300 ease-in-out text-white placeholder-gray-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-lg hover:from-sky-600 hover:to-cyan-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-sky-500"
          >
            Verstuur
          </button>
        </form>
      </footer>
    </div>
  );
};

export default App;