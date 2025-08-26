import React, { useState } from 'react';
import { Check, X, Edit3, Save, AlertTriangle, Zap, Clock, Target } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Pick<Todo, 'text' | 'priority'>>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { text: editText.trim(), priority: editPriority });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const priorityConfig = {
    low: { color: 'neon-green', icon: Clock, label: 'LOW' },
    medium: { color: 'neon-cyan', icon: Target, label: 'MED' },
    high: { color: 'neon-yellow', icon: Zap, label: 'HIGH' },
    critical: { color: 'neon-pink', icon: AlertTriangle, label: 'CRIT' },
  };

  const config = priorityConfig[todo.priority];
  const PriorityIcon = config.icon;

  return (
    <div className={`group relative transition-all duration-300 ${todo.completed ? 'opacity-60' : ''}`}>
      {/* Glowing border effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-${config.color}/20 to-transparent rounded-lg blur-sm ${!todo.completed ? 'opacity-100' : 'opacity-30'}`}></div>
      
      <div className={`relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border transition-all duration-300 ${
        todo.completed 
          ? 'border-gray-600/30' 
          : `border-${config.color}/30 hover:border-${config.color}/60 hover:shadow-${config.color}/20 hover:shadow-lg`
      }`}>
        <div className="flex items-center gap-4">
          {/* Completion Toggle */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
              todo.completed
                ? `bg-${config.color} border-${config.color} shadow-${config.color}/50 shadow-md`
                : `border-${config.color}/50 hover:border-${config.color} hover:shadow-${config.color}/30 hover:shadow-md`
            }`}
          >
            {todo.completed && <Check className="w-4 h-4 text-cyber-dark" />}
          </button>

          {/* Priority Indicator */}
          <div className={`flex-shrink-0 flex items-center gap-2 text-${config.color} font-cyber text-xs`}>
            <PriorityIcon className="w-4 h-4" />
            <span>{config.label}</span>
          </div>

          {/* Todo Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 bg-cyber-dark/50 border border-neon-cyan/50 rounded px-3 py-2 text-white focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan/50 focus:shadow-sm transition-all duration-300"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                    if (e.key === 'Escape') handleCancel();
                  }}
                  autoFocus
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value as Todo['priority'])}
                  className="bg-cyber-dark/50 border border-neon-cyan/50 rounded px-3 py-2 text-neon-cyan focus:outline-none focus:border-neon-cyan font-cyber text-sm"
                >
                  <option value="low" className="bg-cyber-dark text-neon-green">LOW</option>
                  <option value="medium" className="bg-cyber-dark text-neon-cyan">MED</option>
                  <option value="high" className="bg-cyber-dark text-neon-yellow">HIGH</option>
                  <option value="critical" className="bg-cyber-dark text-neon-pink">CRIT</option>
                </select>
              </div>
            ) : (
              <p className={`font-exo transition-all duration-300 ${
                todo.completed 
                  ? 'line-through text-gray-400' 
                  : 'text-white'
              }`}>
                {todo.text}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex-shrink-0 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 text-neon-green hover:bg-neon-green/20 rounded transition-colors duration-300"
                  title="Save changes"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-gray-400 hover:bg-gray-400/20 rounded transition-colors duration-300"
                  title="Cancel editing"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-neon-cyan hover:bg-neon-cyan/20 rounded transition-colors duration-300"
                  title="Edit task"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-neon-pink hover:bg-neon-pink/20 rounded transition-colors duration-300"
                  title="Delete task"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <div className="mt-3 text-xs text-gray-500 font-cyber">
          <span>CREATED: {todo.createdAt.toLocaleString()}</span>
          {todo.completedAt && (
            <span className="ml-4">COMPLETED: {todo.completedAt.toLocaleString()}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
