import React, { useState } from "react";
import { Task, TaskStatus } from "../features/tasks/tasksSlice";

interface Props {
  initial?: Partial<Task>;
  onCancel?: () => void;
  onSave: (task: Task) => void;
}

const statuses: TaskStatus[] = ["Pending", "In Progress", "Completed"];

const TaskForm: React.FC<Props> = ({ initial = {}, onCancel, onSave }) => {
  const [title, setTitle] = useState(initial.title || "");
  const [description, setDescription] = useState(initial.description || "");
  const [status, setStatus] = useState<TaskStatus>(
    (initial.status as TaskStatus) || "Pending"
  );
  const [dueDate, setDueDate] = useState(
    initial.dueDate ? initial.dueDate.slice(0, 10) : ""
  );
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");
    if (!dueDate) return setError("Due date is required");

    const task: Task = {
      id: (initial.id as string) || `${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      status,
      dueDate: new Date(dueDate).toISOString(),
    };
    onSave(task);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="alert alert-danger py-1">{error}</div>}
      <div>
        <label className="form-label">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-control"
        />
      </div>
      <div>
        <label className="form-label">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="row">
        <div className="col">
          <label className="form-label">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="form-select"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-control"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-2 d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
