import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useParams } from "react-router";
import { assignments } from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const aid = pathname.split("/").pop();
  const assignment = assignments.find((a) => a._id === aid);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor" className="container p-4">
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label">
          <strong>Assignment Name</strong>
        </label>
        <input
          id="wd-name"
          value={assignment.title}
          className="form-control"
          readOnly
        />
      </div>
      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label">
          <strong>Description</strong>
        </label>
        <textarea id="wd-description" rows={10} className="form-control">
          {assignment.description}
        </textarea>
      </div>
      <div className="row mb-2">
        <div className="col-md-6 d-flex justify-content-end">
          <label htmlFor="wd-points" className="form-label">
            <strong>Points</strong>
          </label>
        </div>
        <div className="col-md-6">
          <input
            id="wd-points"
            value={assignment.points}
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
            value={assignment["due-dt"]}
            id="wd-due-date"
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
                value={assignment["availability-dt"]}
                id="wd-available-from"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="datetime-local"
                id="wd-available-until"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-end">
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          className="btn btn-danger"
        >
          Save
        </Link>
      </div>
    </div>
  );
}
