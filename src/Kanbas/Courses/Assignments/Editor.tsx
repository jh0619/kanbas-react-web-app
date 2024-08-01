import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useNavigate, useLocation } from "react-router";
import { addAssignment, updateAssignment } from "./reducer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";

export default function AssignmentEditor() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const aid = pathname.split("/").pop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignments);

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: "",
    course: cid,
    availabilityDt: "",
    availabilityUntil: "",
    dueDt: "",
  });

  useEffect(() => {
    if (aid) {
      const existingAssignment = assignments.find((a: any) => a._id === aid);
      if (existingAssignment) {
        setAssignment(existingAssignment);
      }
    }
  }, [aid, assignments]);

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setAssignment((prevAssignment) => ({
      ...prevAssignment,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    if (aid && aid !== "New") {
      await client.updateAssignment(assignment);
      dispatch(updateAssignment(assignment));
    } else {
      const newAssignment = await client.createAssignment(
        cid as string,
        assignment
      );
      dispatch(addAssignment(newAssignment));
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };
  return (
    <div id="wd-assignments-editor" className="container p-4">
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label">
          <strong>Assignment Name</strong>
        </label>
        <input
          id="title"
          value={assignment.title}
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label">
          <strong>Description</strong>
        </label>
        <textarea
          id="description"
          rows={10}
          value={assignment.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="row mb-2">
        <div className="col-md-6 d-flex justify-content-end">
          <label htmlFor="wd-points" className="form-label">
            <strong>Points</strong>
          </label>
        </div>
        <div className="col-md-6">
          <input
            id="points"
            value={assignment.points}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6 d-flex justify-content-end">
          <label htmlFor="wd-group" className="form-label">
            <strong>Assignment Group</strong>
          </label>
        </div>
        <div className="col-md-6">
          <select id="wd-group" className="form-control">
            <option selected value="ASSIGNMENTS">
              ASSIGNMENTS
            </option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6 d-flex justify-content-end">
          <label htmlFor="wd-display-grade-as" className="form-label">
            <strong>Display Grade as</strong>
          </label>
        </div>
        <div className="col-md-6">
          <select id="wd-display-grade-as" className="form-control">
            <option selected value="PERCENTAGE">
              Percentage
            </option>
            <option value="POINTS">Points</option>
            <option value="LETTERS">Letter Grade</option>
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col-md-6 d-flex justify-content-end">
          <label htmlFor="wd-submission-type" className="form-label">
            <strong>Submission Type</strong>
          </label>
        </div>
        <div className="col-md-6 border p-2">
          <select id="wd-submission-type" className="form-control">
            <option selected value="ONLINE">
              Online
            </option>
            <option value="INCLASS">In-class</option>
            <option value="MAIL">Mail</option>
          </select>
          <br />
          <div className="mb-4">
            <label className="form-label">
              <strong>Online Entry Options</strong>
            </label>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-text-entry"
              />
              <label className="form-check-label" htmlFor="wd-text-entry">
                Text Entry
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-website-url"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="wd-website-url">
                Website URL
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-media-recordings"
              />
              <label className="form-check-label" htmlFor="wd-media-recordings">
                Media Recordings
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-student-annotation"
              />
              <label
                className="form-check-label"
                htmlFor="wd-student-annotation"
              >
                Student Annotation
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="wd-file-upload"
              />
              <label className="form-check-label" htmlFor="wd-file-upload">
                File Uploads
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6 d-flex justify-content-end">
          <label htmlFor="wd-assign-to" className="form-label">
            <strong>Assign</strong>
          </label>
        </div>
        <div className="col-md-6 border p-2">
          <label htmlFor="wd-assign-to">
            <strong>Assign to</strong>
          </label>
          <input
            id="wd-assign-to"
            value="Everyone"
            className="form-control mb-2"
          />
          <label htmlFor="wd-due-date" className="form-label">
            <strong>Due</strong>
          </label>
          <input
            type="datetime-local"
            value={assignment["dueDt"]}
            id="due-dt"
            onChange={handleChange}
            className="form-control mb-2"
          />
          <div className="row mb-2">
            <div className="col-md-6">
              <label htmlFor="wd-available-from" className="form-label">
                <strong>Available from</strong>
              </label>
            </div>
            <div className="col-md-6">
              <label htmlFor="wd-available-until" className="form-label">
                <strong>Until</strong>
              </label>
            </div>
            <div className="col-md-6">
              <input
                type="datetime-local"
                value={assignment["availabilityDt"]}
                id="availability-dt"
                onChange={handleChange}
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="datetime-local"
                id="availability-until"
                value={assignment["availabilityUntil"]}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-end">
        <button
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
          className="btn btn-secondary me-2"
        >
          Cancel
        </button>
        <button onClick={handleSave} className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}
