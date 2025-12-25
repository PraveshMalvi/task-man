import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import TaskList from "../components/TaskList";
import { deleteTask } from "../features/tasks/tasksSlice";

const Completed = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((s: RootState) =>
    s.tasks.tasks.filter((t) => t.status === "Completed")
  );

  function handleDelete(id: string) {
    if (window.confirm("Delete this task?")) dispatch(deleteTask(id));
  }

  return (
    <div className="container py-4">
      <h2 className="mb-3">Completed Tasks</h2>
      <TaskList
        tasks={tasks}
        onEdit={() => {}}
        onDelete={handleDelete}
        disableEdit={true}
      />
    </div>
  );
};

export default Completed;
