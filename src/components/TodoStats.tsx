import React from 'react';
import { BarChart3, CheckCircle, Clock, AlertTriangle, Target } from 'lucide-react';

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

  const statItems = [
    {
      label: 'TOTAL',
      value: stats.total,
      icon: Target,
      color: 'neon-cyan',
    },
    {
      label: 'COMPLETED',
      value: stats.completed,
      icon: CheckCircle,
      color: 'neon-green',
    },
    {
      label: 'PENDING',
      value: stats.pending,
      icon: Clock,
      color: 'neon-yellow',
    },
    {
      label: 'CRITICAL',
      value: stats.critical,
      icon: AlertTriangle,
      color: 'neon-pink',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.label} className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-br from-${item.color}/20 to-transparent rounded-lg blur-sm group-hover:blur-none transition-all duration-300`}></div>
            <div className={`relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-${item.color}/30 hover:border-${item.color}/60 transition-all duration-300`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-2xl font-bold font-cyber text-${item.color} neon-glow`}>
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-400 font-cyber mt-1">
                    {item.label}
                  </p>
                </div>
                <Icon className={`w-6 h-6 text-${item.color} opacity-60`} />
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Completion Rate Bar */}
      {stats.total > 0 && (
        <div className="col-span-2 lg:col-span-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 via-neon-cyan/20 to-neon-pink/20 rounded-lg blur-sm"></div>
          <div className="relative bg-cyber-darker/80 backdrop-blur-sm rounded-lg p-4 border border-neon-cyan/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-cyber text-neon-cyan">MISSION PROGRESS</span>
              <span className="text-sm font-cyber text-neon-green">{completionRate}%</span>
            </div>
            <div className="w-full bg-cyber-dark/50 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-neon-green to-neon-cyan transition-all duration-500 ease-out relative"
                style={{ width: `${completionRate}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse-neon"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStats;
