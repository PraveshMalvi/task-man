import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasksSlice";
import { STORAGE } from "./features/tasks/tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

store.subscribe(() => {
  try {
    const state = store.getState();
    const tasks = state.tasks.tasks;
    localStorage.setItem(STORAGE, JSON.stringify(tasks));
  } catch (e) {
    // ignore
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
