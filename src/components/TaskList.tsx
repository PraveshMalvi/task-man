import React from "react";
import { Task } from "../features/tasks/tasksSlice";
import TaskCard from "./TaskCard";

interface Props {
  tasks: Task[];
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
  disableEdit?: boolean;
}

const TaskList: React.FC<Props> = ({
  tasks,
  onEdit,
  onDelete,
  disableEdit = false,
}) => {
  if (!tasks.length)
    return <div className="text-center text-gray-500">No tasks found.</div>;

  return (
    <div className="row">
      {tasks.map((t) => (
        <div key={t.id} className="col-12 col-sm-6 col-lg-4 mb-3">
          <TaskCard
            task={t}
            onEdit={onEdit}
            onDelete={onDelete}
            disableEdit={disableEdit}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;
