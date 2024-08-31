import { CiSearch } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { useParams, useNavigate } from "react-router-dom";

export default function QuizzesControls() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const goToDetailsEditor = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/new`);
  };

  return (
    <div id="wd-quizzes-controls" className="d-flex flex-nowrap text-nowrap">
      <div className="input-group me-5">
        <span className="input-group-text">
          <CiSearch />
        </span>
        <input
          id="wd-search-quizzes"
          type="text"
          className="form-control"
          placeholder="Search..."
        />
      </div>
      <button
        id="wd-quiz"
        className="btn btn-lg btn-danger text-white"
        onClick={goToDetailsEditor}
      >
        <FaPlus className="fs-5 me-1" />
        Quiz
      </button>
    </div>
  );
}
