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
    <div className="sticky top-14 d-flex align-items-center justify-between gap-3 mb-3 bg-gray-100 p-2 rounded-bl-md rounded-br-md">
      <div className="d-flex sm:gap-2 gap-1 align-items-center">
        <label className="me-1 sm:text-base text-sm">Filter</label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="form-select"
        >
          <option className="sm:text-base text-sm" value="All">
            All
          </option>
          <option className="sm:text-base text-sm" value="Pending">
            Pending
          </option>
          <option className="sm:text-base text-sm" value="In Progress">
            In Progress
          </option>
          <option className="sm:text-base text-sm" value="Completed">
            Completed
          </option>
        </select>
      </div>
      <div className="d-flex sm:gap-2 gap-1 align-items-center">
        <label className="me-1 sm:text-base text-sm">Sort by date</label>
        <button
          className="btn border border-gray-300 bg-white btn-sm"
          onClick={() => setSortAsc(!sortAsc)}
        >
          {sortAsc ? "Asc" : "Desc"}
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
