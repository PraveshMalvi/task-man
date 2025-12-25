import React from "react";
import { TaskStatus } from "../features/tasks/tasksSlice";

interface Props {
  filter: TaskStatus | "All";
  setFilter: (f: TaskStatus | "All") => void;
  sortAsc: boolean;
  setSortAsc: (v: boolean) => void;
}

const FilterBar: React.FC<Props> = ({
  filter,
  setFilter,
  sortAsc,
  setSortAsc,
}) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-3">
      <div className="d-flex gap-2 align-items-center">
        <label className="me-2">Filter:</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="form-select"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <label className="me-2">Sort by due date</label>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setSortAsc(!sortAsc)}
        >
          {sortAsc ? "Asc" : "Desc"}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
