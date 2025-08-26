export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  completedAt?: Date;
}
