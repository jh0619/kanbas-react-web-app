import { IoIosSettings } from "react-icons/io";
import { FaFileImport } from "react-icons/fa6";
import { TfiExport } from "react-icons/tfi";

export default function GradesControls() {
  return (
    <div id="wd-grades-controls" className="text-nowrap">
      <button
        id="wd-settings"
        className="btn btn-lg btn-secondary d-inline me-1 float-end"
        type="button"
      >
        <IoIosSettings />
      </button>
      <div className="dropdown d-inline me-1 float-end">
        <button
          id="wd-export"
          className="btn btn-lg btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
        >
          <TfiExport
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Export
        </button>
      </div>
      <button
        id="wd-import"
        className="btn btn-lg btn-secondary d-inline me-1 float-end"
        type="button"
      >
        <FaFileImport
          className="position-relative me-2"
          style={{ bottom: "1px" }}
        />
        Import
      </button>
    </div>
  );
}
