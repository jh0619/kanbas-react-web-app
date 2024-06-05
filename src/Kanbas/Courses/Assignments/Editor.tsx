/*export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container">
      <label htmlFor="wd-name">
        <strong>Assignment Name</strong>
      </label>
      <br />
      <br />
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" rows={10} cols={44}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option selected value="PERCENTAGE">
                Percentage
              </option>
              <option value="POINTS">Points</option>
              <option value="LETTERS">Letter Grade</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option selected value="ONLINE">
                Online
              </option>
              <option value="INCLASS">In-class</option>
              <option value="MAIL">Mail</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td></td>
          <td>
            <label>Online Entry Options</label>
            <br />
            <input type="checkbox" name="check-option" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />

            <input type="checkbox" name="check-option" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />

            <input
              type="checkbox"
              name="check-option"
              id="wd-media-recordings"
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />

            <input
              type="checkbox"
              name="check-opyion"
              id="wd-student-annotation"
            />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />

            <input type="checkbox" name="check-option" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Uploads</label>
            <br />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            Assign
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input id="wd-assign-to" value="Everyone" />
          </td>
        </tr>
        <br />
        <tr>
          <td></td>
          <label htmlFor="wd-due-date">Due</label>
        </tr>
        <tr>
          <td></td>
          <td>
            <input type="date" value="2024-05-13" id="wd-due-date" />
          </td>
        </tr>
        <br />
        <tr>
          <td></td>
          <td>
            <label htmlFor="wd-available-from" style={{ marginRight: "33px" }}>
              Available from
            </label>
            <label htmlFor="wd-available-until">Until</label>
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            <input
              type="date"
              value="2024-05-06"
              id="wd-available-from"
              style={{ marginRight: "5px" }}
            />
            <input type="date" value="2024-05-20" id="wd-available-until" />
          </td>
        </tr>
      </table>
      <hr />
      <div style={{ textAlign: "right" }}>
        <button type="button" style={{ marginRight: "5px" }}>
          Cancel
        </button>
        <button type="button">Save</button>
      </div>
    </div>
  );
}
*/

import "bootstrap/dist/css/bootstrap.min.css";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container p-4">
      <div className="mb-4">
        <label htmlFor="wd-name" className="form-label">
          <strong>Assignment Name</strong>
        </label>
        <input id="wd-name" value="A1" className="form-control" />
      </div>
      <div className="mb-4">
        <label htmlFor="wd-description" className="form-label">
          <strong>Description</strong>
        </label>
        <textarea id="wd-description" rows={10} className="form-control">
          The assignment is available online Submit a link to the landing page
          of your Web application running on Netlify. The landing page should
          include the following: Your full name and section Links to each of the
          lab assignments Link to the Kanbas application Links to all relevant
          source code repositories The Kanbas application should include a link
          to navigate back to the landing page.
        </textarea>
      </div>
      <div className="row mb-2">
        <div className="col-md-6 d-flex justify-content-end">
          <label htmlFor="wd-points" className="form-label">
            <strong>Points</strong>
          </label>
        </div>
        <div className="col-md-6">
          <input id="wd-points" value={100} className="form-control" />
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
            type="date"
            value="2024-05-13"
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
                type="date"
                value="2024-05-06"
                id="wd-available-from"
                className="form-control mb-2"
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                value="2024-05-20"
                id="wd-available-until"
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="text-end">
        <button type="button" className="btn btn-secondary me-2">
          Cancel
        </button>
        <button type="button" className="btn btn-danger">
          Save
        </button>
      </div>
    </div>
  );
}
