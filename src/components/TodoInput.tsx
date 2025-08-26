import React, { useState } from 'react';
import { Plus, Zap, Mic, MicOff } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string, priority: Todo['priority']) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority);
      setText('');
      setPriority('medium');
    }
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    }
  };

  const priorityColors = {
    low: 'text-neon-green',
    medium: 'text-neon-cyan',
    high: 'text-neon-yellow',
    critical: 'text-neon-pink',
  };

  const quickTasks = [
    'Review quarterly reports',
    'Update security protocols',
    'Sync neural networks',
    'Deploy system patches',
    'Analyze data streams'
  ];

  return (
    <div className="space-y-4">
      {/* Main Input */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 via-neon-cyan/20 to-neon-green/20 rounded-lg blur-sm"></div>
        <form onSubmit={handleSubmit} className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-6 border border-neon-cyan/30">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your mission objective..."
                className="w-full bg-cyber-dark/50 border border-neon-cyan/50 rounded-md px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan/50 focus:shadow-md transition-all duration-300 font-exo"
              />
              
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={startVoiceInput}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-md transition-all duration-300 ${
                  isListening 
                    ? 'text-neon-pink bg-neon-pink/20 animate-pulse' 
                    : 'text-gray-400 hover:text-neon-cyan hover:bg-neon-cyan/20'
                }`}
                title="Voice input"
              >
                {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="flex gap-2">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                className={`bg-cyber-dark/50 border border-neon-cyan/50 rounded-md px-3 py-3 ${priorityColors[priority]} focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan/50 focus:shadow-md transition-all duration-300 font-cyber text-sm`}
              >
                <option value="low" className="bg-cyber-dark text-neon-green">LOW</option>
                <option value="medium" className="bg-cyber-dark text-neon-cyan">MED</option>
                <option value="high" className="bg-cyber-dark text-neon-yellow">HIGH</option>
                <option value="critical" className="bg-cyber-dark text-neon-pink">CRIT</option>
              </select>
              
              <button
                type="submit"
                disabled={!text.trim()}
                className="bg-gradient-to-r from-neon-pink to-neon-cyan px-6 py-3 rounded-md text-white font-cyber font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-neon-pink/50 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                <span className="hidden sm:inline">DEPLOY</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Quick Tasks */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/10 to-neon-cyan/10 rounded-lg blur-sm"></div>
        <div className="relative bg-cyber-darker/60 backdrop-blur-sm rounded-lg p-4 border border-neon-green/20">
          <h3 className="text-sm font-cyber text-neon-green mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            QUICK DEPLOY
          </h3>
          <div className="flex flex-wrap gap-2">
            {quickTasks.map((task, index) => (
              <button
                key={index}
                onClick={() => setText(task)}
                className="px-3 py-1 bg-cyber-dark/50 border border-neon-green/30 rounded-md text-xs font-exo text-gray-300 hover:text-neon-green hover:border-neon-green/60 hover:bg-neon-green/10 transition-all duration-300"
              >
                {task}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
