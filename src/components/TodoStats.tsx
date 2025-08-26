import React from 'react';
import { Activity, Target, Zap, CheckCircle, TrendingUp, Brain } from 'lucide-react';

interface TodoStatsProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    critical: number;
  };
}

const TodoStats: React.FC<TodoStatsProps> = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const productivity = Math.min(100, completionRate + (stats.completed * 5));
  
  const getSystemStatus = () => {
    if (completionRate >= 90) return { status: 'OPTIMAL', color: 'neon-green', pulse: true };
    if (completionRate >= 70) return { status: 'STABLE', color: 'neon-cyan', pulse: false };
    if (completionRate >= 50) return { status: 'MODERATE', color: 'neon-yellow', pulse: false };
    return { status: 'CRITICAL', color: 'neon-pink', pulse: true };
  };

  const systemStatus = getSystemStatus();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Tasks */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-transparent rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
        <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-neon-cyan/30 hover:border-neon-cyan/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-neon-cyan" />
            <span className="text-2xl font-cyber font-bold text-neon-cyan">{stats.total}</span>
          </div>
          <p className="text-xs font-cyber text-gray-400">TOTAL MISSIONS</p>
          <div className="mt-2 h-1 bg-cyber-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-green transition-all duration-1000"
              style={{ width: `${Math.min(100, (stats.total / 20) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-${systemStatus.color}/20 to-transparent rounded-lg blur-sm group-hover:blur-md transition-all duration-300`}></div>
        <div className={`relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-${systemStatus.color}/30 hover:border-${systemStatus.color}/60 transition-all duration-300`}>
          <div className="flex items-center justify-between mb-2">
            <Target className={`w-5 h-5 text-${systemStatus.color} ${systemStatus.pulse ? 'animate-pulse' : ''}`} />
            <span className={`text-2xl font-cyber font-bold text-${systemStatus.color}`}>{completionRate}%</span>
          </div>
          <p className="text-xs font-cyber text-gray-400">COMPLETION RATE</p>
          <div className="mt-2 h-1 bg-cyber-dark rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r from-${systemStatus.color} to-${systemStatus.color}/60 transition-all duration-1000`}
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Critical Tasks */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink/20 to-transparent rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
        <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-neon-pink/30 hover:border-neon-pink/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <Zap className={`w-5 h-5 text-neon-pink ${stats.critical > 0 ? 'animate-pulse' : ''}`} />
            <span className="text-2xl font-cyber font-bold text-neon-pink">{stats.critical}</span>
          </div>
          <p className="text-xs font-cyber text-gray-400">CRITICAL ALERTS</p>
          <div className="mt-2 h-1 bg-cyber-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-pink to-red-500 transition-all duration-1000"
              style={{ width: `${Math.min(100, (stats.critical / 5) * 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Productivity Score */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 to-transparent rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
        <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-neon-green/30 hover:border-neon-green/60 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <Brain className="w-5 h-5 text-neon-green animate-pulse" />
            <span className="text-2xl font-cyber font-bold text-neon-green">{productivity}</span>
          </div>
          <p className="text-xs font-cyber text-gray-400">NEURAL EFFICIENCY</p>
          <div className="mt-2 h-1 bg-cyber-dark rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-green to-neon-cyan transition-all duration-1000"
              style={{ width: `${productivity}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="col-span-2 lg:col-span-4 relative group">
        <div className={`absolute inset-0 bg-gradient-to-r from-${systemStatus.color}/10 via-${systemStatus.color}/20 to-${systemStatus.color}/10 rounded-lg blur-sm`}></div>
        <div className={`relative bg-cyber-darker/60 backdrop-blur-sm rounded-lg p-3 border border-${systemStatus.color}/30 flex items-center justify-center gap-4`}>
          <TrendingUp className={`w-5 h-5 text-${systemStatus.color} ${systemStatus.pulse ? 'animate-pulse' : ''}`} />
          <span className={`font-cyber text-${systemStatus.color} font-bold`}>
            SYSTEM STATUS: {systemStatus.status}
          </span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full bg-${systemStatus.color} ${systemStatus.pulse ? 'animate-pulse' : ''}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoStats;
