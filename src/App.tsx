import React, { useState, useMemo } from 'react';
import { Terminal, Cpu, Wifi, BarChart3, Eye, EyeOff } from 'lucide-react';
import { useTodos } from './hooks/useTodos';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem';
import TodoStats from './components/TodoStats';
import TodoFilters from './components/TodoFilters';
import ProductivityInsights from './components/ProductivityInsights';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted, stats } = useTodos();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [showInsights, setShowInsights] = useState(false);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const sortedTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => {
      // Sort by completion status first (incomplete first)
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      
      // Then by priority
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      
      // Finally by creation date (newest first)
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [filteredTodos]);

  return (
    <div className="min-h-screen bg-cyber-dark circuit-pattern scan-lines">
      {/* Background Effects */}
      <div className="fixed inset-0 hologram-effect opacity-30 pointer-events-none"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="relative inline-block">
            <h1 
              className="text-6xl md:text-8xl font-cyber font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-pink via-neon-cyan to-neon-green glitch-text animate-pulse-neon"
              data-text="CYBERTASK"
            >
              CYBERTASK
            </h1>
            <div className="absolute -top-2 -right-2">
              <Terminal className="w-8 h-8 text-neon-cyan animate-pulse" />
            </div>
          </div>
          <p className="text-gray-400 font-exo mt-4 text-lg">
            Neural Task Management System v2.077
          </p>
          
          {/* System Status */}
          <div className="flex justify-center items-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-neon-green text-sm font-cyber">
              <Cpu className="w-4 h-4 animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="flex items-center gap-2 text-neon-cyan text-sm font-cyber">
              <Wifi className="w-4 h-4 animate-pulse" />
              <span>NEURAL LINK ACTIVE</span>
            </div>
            <button
              onClick={() => setShowInsights(!showInsights)}
              className="flex items-center gap-2 text-neon-yellow text-sm font-cyber hover:text-neon-pink transition-colors duration-300"
            >
              {showInsights ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showInsights ? 'HIDE' : 'SHOW'} ANALYTICS</span>
            </button>
          </div>
        </header>

        {/* Analytics Panel */}
        {showInsights && (
          <div className="mb-8">
            <ProductivityInsights todos={todos} />
          </div>
        )}

        {/* Stats Dashboard */}
        <div className="mb-8">
          <TodoStats stats={stats} />
        </div>

        {/* Task Input */}
        <div className="mb-8">
          <TodoInput onAdd={addTodo} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <TodoFilters
            filter={filter}
            onFilterChange={setFilter}
            onClearCompleted={clearCompleted}
            hasCompleted={stats.completed > 0}
          />
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {sortedTodos.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-neon-pink/20 rounded-lg blur-lg"></div>
                <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-8 border border-neon-cyan/30">
                  <Terminal className="w-16 h-16 text-neon-cyan mx-auto mb-4 animate-pulse" />
                  <h3 className="text-xl font-cyber text-neon-cyan mb-2">
                    {filter === 'all' ? 'NO ACTIVE MISSIONS' : 
                     filter === 'active' ? 'NO PENDING TASKS' : 
                     'NO COMPLETED MISSIONS'}
                  </h3>
                  <p className="text-gray-400 font-exo">
                    {filter === 'all' ? 'Deploy your first task to begin the operation' :
                     filter === 'active' ? 'All tasks completed. System ready for new missions.' :
                     'Complete some tasks to see them here'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            sortedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center">
          <div className="inline-block bg-cyber-darker/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-neon-cyan/20">
            <p className="text-gray-500 font-cyber text-sm">
              POWERED BY NEURAL NETWORKS • DATA ENCRYPTED • QUANTUM SECURED
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
