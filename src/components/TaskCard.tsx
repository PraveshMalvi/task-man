import React from "react";
import { Task } from "../features/tasks/tasksSlice";

interface Props {
  task: Task;
  onEdit: (t: Task) => void;
  onDelete: (id: string) => void;
  disableEdit?: boolean;
}

const badgeColor = (status: Task["status"]) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const TaskCard: React.FC<Props> = ({
  task,
  onEdit,
  onDelete,
  disableEdit = false,
}) => {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">{task.description}</p>
        </div>
        <div className="text-right">
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm ${badgeColor(
              task.status
            )}`}
          >
            {task.status}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          className={`btn btn-sm btn-outline-primary ${
            disableEdit ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => !disableEdit && onEdit(task)}
          disabled={disableEdit}
        >
          Edit
        </button>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
