import React from 'react';
import { List, CheckCircle, Clock, Trash2 } from 'lucide-react';

interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ 
  filter, 
  onFilterChange, 
  onClearCompleted, 
  hasCompleted 
}) => {
  const filters = [
    { key: 'all' as const, label: 'ALL TASKS', icon: List, color: 'neon-cyan' },
    { key: 'active' as const, label: 'ACTIVE', icon: Clock, color: 'neon-yellow' },
    { key: 'completed' as const, label: 'COMPLETED', icon: CheckCircle, color: 'neon-green' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
      <div className="flex gap-2">
        {filters.map((filterItem) => {
          const Icon = filterItem.icon;
          const isActive = filter === filterItem.key;
          
          return (
            <button
              key={filterItem.key}
              onClick={() => onFilterChange(filterItem.key)}
              className={`px-4 py-2 rounded-md font-cyber text-sm transition-all duration-300 flex items-center gap-2 ${
                isActive
                  ? `bg-${filterItem.color}/20 text-${filterItem.color} border border-${filterItem.color}/50 shadow-${filterItem.color}/30 shadow-md neon-glow`
                  : `text-gray-400 hover:text-${filterItem.color} hover:bg-${filterItem.color}/10 border border-transparent hover:border-${filterItem.color}/30`
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{filterItem.label}</span>
            </button>
          );
        })}
      </div>

      {hasCompleted && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 rounded-md font-cyber text-sm text-neon-pink hover:bg-neon-pink/20 border border-transparent hover:border-neon-pink/50 transition-all duration-300 flex items-center gap-2 group"
        >
          <Trash2 className="w-4 h-4 group-hover:animate-pulse" />
          <span>PURGE COMPLETED</span>
        </button>
      )}
    </div>
  );
};

export default TodoFilters;
