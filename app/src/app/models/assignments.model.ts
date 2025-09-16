export interface Assignment {
  id: number;
  title: string;
  description: string;
  course: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  completed: boolean;
  dueDate: string;
  points: number;
}

export interface DetailedCourse {
  id: string;
  name: string;
  icon: string;
  color: string;
  totalAssignments: number;
  completedAssignments: number;
}