import React from 'react';
import { TrendingUp, Clock, Target, Zap, Calendar, Award } from 'lucide-react';

interface ProductivityInsightsProps {
  todos: Array<{
    id: string;
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high' | 'critical';
    createdAt: Date;
    completedAt?: Date;
  }>;
}

const ProductivityInsights: React.FC<ProductivityInsightsProps> = ({ todos }) => {
  // Calculate insights
  const completedTodos = todos.filter(todo => todo.completed);
  const todayCompleted = completedTodos.filter(todo => 
    todo.completedAt && new Date(todo.completedAt).toDateString() === new Date().toDateString()
  );
  
  const avgCompletionTime = completedTodos.length > 0 
    ? Math.round(completedTodos.reduce((acc, todo) => {
        if (todo.completedAt) {
          return acc + (todo.completedAt.getTime() - todo.createdAt.getTime()) / (1000 * 60);
        }
        return acc;
      }, 0) / completedTodos.length)
    : 0;

  const priorityBreakdown = {
    critical: todos.filter(t => t.priority === 'critical' && t.completed).length,
    high: todos.filter(t => t.priority === 'high' && t.completed).length,
    medium: todos.filter(t => t.priority === 'medium' && t.completed).length,
    low: todos.filter(t => t.priority === 'low' && t.completed).length,
  };

  const streak = calculateStreak(completedTodos);
  const bestDay = getBestProductivityDay(completedTodos);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-cyber text-neon-cyan mb-2">NEURAL ANALYTICS</h2>
        <p className="text-gray-400 font-exo text-sm">Advanced productivity metrics and behavioral patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Today's Performance */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-transparent rounded-lg blur-sm"></div>
          <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-neon-green/30">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-neon-green" />
              <span className="font-cyber text-neon-green text-sm">TODAY'S OUTPUT</span>
            </div>
            <div className="text-2xl font-cyber font-bold text-white mb-1">{todayCompleted.length}</div>
            <div className="text-xs text-gray-400">missions completed</div>
          </div>
        </div>

        {/* Average Completion Time */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-transparent rounded-lg blur-sm"></div>
          <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-neon-cyan/30">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-neon-cyan" />
              <span className="font-cyber text-neon-cyan text-sm">AVG EXECUTION</span>
            </div>
            <div className="text-2xl font-cyber font-bold text-white mb-1">{avgCompletionTime}m</div>
            <div className="text-xs text-gray-400">per mission</div>
          </div>
        </div>

        {/* Completion Streak */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-yellow/20 to-transparent rounded-lg blur-sm"></div>
          <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-neon-yellow/30">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-5 h-5 text-neon-yellow" />
              <span className="font-cyber text-neon-yellow text-sm">STREAK</span>
            </div>
            <div className="text-2xl font-cyber font-bold text-white mb-1">{streak}</div>
            <div className="text-xs text-gray-400">consecutive days</div>
          </div>
        </div>
      </div>

      {/* Priority Breakdown */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/10 via-neon-cyan/10 to-neon-green/10 rounded-lg blur-sm"></div>
        <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-6 border border-neon-cyan/20">
          <h3 className="font-cyber text-neon-cyan mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            PRIORITY MATRIX
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(priorityBreakdown).map(([priority, count]) => {
              const colors = {
                critical: 'neon-pink',
                high: 'neon-yellow', 
                medium: 'neon-cyan',
                low: 'neon-green'
              };
              const color = colors[priority as keyof typeof colors];
              
              return (
                <div key={priority} className="text-center">
                  <div className={`text-2xl font-cyber font-bold text-${color} mb-1`}>{count}</div>
                  <div className="text-xs font-cyber text-gray-400 uppercase">{priority}</div>
                  <div className="mt-2 h-1 bg-cyber-dark rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-${color} transition-all duration-1000`}
                      style={{ width: `${Math.min(100, (count / Math.max(1, completedTodos.length)) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Best Performance Day */}
      {bestDay && (
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-neon-cyan/20 rounded-lg blur-sm"></div>
          <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-neon-green/30 text-center">
            <TrendingUp className="w-6 h-6 text-neon-green mx-auto mb-2" />
            <div className="font-cyber text-neon-green text-sm mb-1">PEAK PERFORMANCE</div>
            <div className="text-white font-exo">
              {bestDay.date} - {bestDay.count} missions completed
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions
function calculateStreak(completedTodos: Array<{ completedAt?: Date }>): number {
  if (completedTodos.length === 0) return 0;
  
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);
  
  while (streak < 30) { // Max 30 days to prevent infinite loop
    const dayTodos = completedTodos.filter(todo => 
      todo.completedAt && 
      new Date(todo.completedAt).toDateString() === currentDate.toDateString()
    );
    
    if (dayTodos.length > 0) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
}

function getBestProductivityDay(completedTodos: Array<{ completedAt?: Date }>) {
  if (completedTodos.length === 0) return null;
  
  const dayCount: { [key: string]: number } = {};
  
  completedTodos.forEach(todo => {
    if (todo.completedAt) {
      const dateStr = new Date(todo.completedAt).toDateString();
      dayCount[dateStr] = (dayCount[dateStr] || 0) + 1;
    }
  });
  
  const bestDay = Object.entries(dayCount).reduce((best, [date, count]) => 
    count > best.count ? { date, count } : best
  , { date: '', count: 0 });
  
  return bestDay.count > 0 ? bestDay : null;
}

export default ProductivityInsights;
