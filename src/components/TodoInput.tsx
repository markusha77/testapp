import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoInputProps {
  onAdd: (text: string, priority: Todo['priority']) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority);
      setText('');
      setPriority('medium');
    }
  };

  const priorityColors = {
    low: 'text-neon-green',
    medium: 'text-neon-cyan',
    high: 'text-neon-yellow',
    critical: 'text-neon-pink',
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 via-neon-cyan/20 to-neon-green/20 rounded-lg blur-sm"></div>
      <form onSubmit={handleSubmit} className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-6 border border-neon-cyan/30">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your mission objective..."
              className="w-full bg-cyber-dark/50 border border-neon-cyan/50 rounded-md px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan/50 focus:shadow-md transition-all duration-300 font-exo"
            />
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
  );
};

export default TodoInput;
