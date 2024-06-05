import { FiFilter } from "react-icons/fi";
import GradesControls from "./GradesControls";
import { FaPlus, FaSearch } from "react-icons/fa";
export default function Grades() {
  return (
    <div>
      <GradesControls />
      <br />
      <br />
      <br />
      <div className="row mb-2">
        <div className="col-md-6">
          <label htmlFor="wd-student-names" className="form-label">
            <strong>Student Names</strong>
          </label>
        </div>
        <div className="col-md-6">
          <label htmlFor="wd-assigment-names" className="form-label">
            <strong>Assignment Names</strong>
          </label>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-2">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input
              id="wd-search-student"
              type="text"
              className="form-control border-start-0"
              placeholder="Search Students..."
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-2">
            <span className="input-group-text bg-white border-end-0">
              <FaSearch />
            </span>
            <input
              id="wd-search-assignments"
              type="text"
              className="form-control border-start-0"
              placeholder="Search Assignments..."
            />
          </div>
        </div>
      </div>
      <button
        id="wd-apply-filters"
        className="btn btn-lg btn-secondary d-inline me-1 float-start"
        type="button"
      >
        <FiFilter
          className="position-relative me-2"
          style={{ bottom: "1px" }}
        />
        Apply Filters
      </button>
      <br />
      <br />
      <br />
      <div className="table-responsive ">
        <table className="table table-striped text-center table-bordered">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>
                <div>A1 SETUP</div>
                <div>(Out of 100)</div>
              </th>
              <th>
                <div>A2 HTML</div>
                <div>(Out of 100)</div>
              </th>
              <th>
                <div>A3 CSS</div>
                <div>(Out of 100)</div>
              </th>
              <th>
                <div>A4 BOOTSTRAP</div>
                <div>(Out of 100)</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-danger">Jane Adams</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>92.18%</td>
              <td>66.22%</td>
            </tr>
            <tr>
              <td className="text-danger">Christina Allen</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Samreen Ansari</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Han Bao</td>
              <td>100%</td>
              <td>100%</td>
              <td className="text-center align-middle">
                <div className="d-flex justify-content-center align-items-center">
                  <input
                    type="text"
                    value="88.03%"
                    className="form-control text-center"
                    style={{ width: "100px" }}
                  />
                </div>
              </td>
              <td>98.99%</td>
            </tr>
            <tr>
              <td className="text-danger">Mahi Sai Srinivas Bobbili</td>
              <td>100%</td>
              <td>96.67%</td>
              <td>98.37%</td>
              <td>100%</td>
            </tr>
            <tr>
              <td className="text-danger">Siran Cao</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
              <td>100%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
