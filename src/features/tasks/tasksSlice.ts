import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate: string; // ISO date
}

interface TasksState {
  tasks: Task[];
  filter: TaskStatus | "All";
  sortAsc: boolean;
}

const STORAGE_KEY = "task_manager_tasks_v1";

function loadFromStorage(): Task[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Task[];
  } catch (e) {
    return [];
  }
}

const initialState: TasksState = {
  tasks: loadFromStorage(),
  filter: "All",
  sortAsc: true,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action: PayloadAction<Task>) {
      const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (idx >= 0) state.tasks[idx] = action.payload;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    setFilter(state, action: PayloadAction<TasksState["filter"]>) {
      state.filter = action.payload;
    },
    setSort(state, action: PayloadAction<boolean>) {
      state.sortAsc = action.payload;
    },
    replaceAll(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  setFilter,
  setSort,
  replaceAll,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const STORAGE = STORAGE_KEY;
