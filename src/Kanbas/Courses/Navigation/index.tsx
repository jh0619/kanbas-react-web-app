import "./index.css";
import { Link, useLocation, useParams } from "react-router-dom";

export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  return (
    <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
      {links.map((lable) => (
        <Link
          key={lable}
          to={`/Kanbas/Courses/${cid}/${lable}`}
          className={`list-group-item border-0
              ${
                pathname.includes(lable) ? "text-black active" : "text-danger"
              }`}
        >
          {lable}
        </Link>
      ))}
    </div>
  );
}
