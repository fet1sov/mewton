import { create } from 'zustand';
import { createTask } from '../helpers/tasks';

interface Task {
  id: number;
  cannelLink: string;
}
interface TaskInterface {
  tasks: Task[];

  setTasks: (tasks: Task[]) => void;
  createTask: (cannelLink: string) => void;
}

export const useTaskStore = create<TaskInterface>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  createTask: async (cannelLink: string) => {
    const res = await createTask(cannelLink);
    set({ tasks: res });
  },
}));
