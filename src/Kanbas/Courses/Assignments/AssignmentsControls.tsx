import { FaPlus, FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

export default function AssignmentsControls() {
  const navigate = useNavigate();
  const { cid } = useParams();

  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <div className="input-group float-start" style={{ width: "300px" }}>
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          id="wd-search-assignment"
          type="text"
          className="form-control"
          placeholder="Search..."
        />
      </div>
      <button
        id="wd-add-assignment-btn"
        className="btn btn-lg btn-danger me-1 float-end"
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/New`)}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </button>
      <button
        id="wd-add-group-btn"
        className="btn btn-lg btn-secondary d-inline me-1 float-end"
        type="button"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </button>
    </div>
  );
}
