import React, { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  addTask,
  updateTask,
  deleteTask,
  setFilter,
  setSort,
  Task,
  TaskStatus,
} from "../features/tasks/tasksSlice";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filter, sortAsc } = useSelector((s: RootState) => s.tasks);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Task | null>(null);

  const counts = useMemo(() => {
    const c = { Pending: 0, "In Progress": 0, Completed: 0 } as Record<
      TaskStatus | string,
      number
    >;
    tasks.forEach((t) => (c[t.status] = (c[t.status] || 0) + 1));
    return c;
  }, [tasks]);

  const visible = useMemo(() => {
    let list = tasks.slice();
    if (filter !== "All") list = list.filter((t) => t.status === filter);
    list.sort((a, b) =>
      sortAsc
        ? a.dueDate.localeCompare(b.dueDate)
        : b.dueDate.localeCompare(a.dueDate)
    );
    return list;
  }, [tasks, filter, sortAsc]);

  function openAdd() {
    setEditing(null);
    setShowModal(true);
  }

  function handleSave(task: Task) {
    if (editing) {
      dispatch(updateTask(task));
    } else {
      dispatch(addTask({ ...task, id: `${Date.now()}` }));
    }
    setShowModal(false);
  }

  function handleEdit(t: Task) {
    setEditing(t);
    setShowModal(true);
  }

  function handleDelete(id: string) {
    if (confirm("Delete this task?")) dispatch(deleteTask(id));
  }

  return (
    <div className="container pt-20 pb-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Task Dashboard</h3>
        <div>
          <button className="btn btn-primary" onClick={openAdd}>
            + Add Task
          </button>
        </div>
      </div>

      <div className="row gap-3 gap-sm-0 mb-4">
        <div className="col-md-4">
          <div className="rounded p-3 bg-red-100 text-red-800">
            <h6>Pending</h6>
            <div className="fs-4">{counts["Pending"] || 0}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="rounded p-3 bg-yellow-100 text-yellow-800">
            <h6>In Progress</h6>
            <div className="fs-4">{counts["In Progress"] || 0}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="rounded p-3 bg-green-100 text-green-800">
            <h6>Completed</h6>
            <div className="fs-4">{counts["Completed"] || 0}</div>
          </div>
        </div>
      </div>

      <FilterBar
        filter={filter}
        setFilter={(f) => dispatch(setFilter(f))}
        sortAsc={sortAsc}
        setSortAsc={(v) => dispatch(setSort(v))}
      />

      <TaskList tasks={visible} onEdit={handleEdit} onDelete={handleDelete} />

      {showModal && (
        <>
          <div className="modal show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editing ? "Edit Task" : "Add Task"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                <div className="modal-body">
                  <TaskForm
                    initial={editing || undefined}
                    onCancel={() => setShowModal(false)}
                    onSave={handleSave}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop show"></div>
        </>
      )}
    </div>
  );
};

export default Home;
