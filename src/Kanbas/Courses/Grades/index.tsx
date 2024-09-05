import { FiFilter } from "react-icons/fi";
import GradesControls from "./GradesControls";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
/*
export default function Grades() {
  const { cid } = useParams();

  const courseEnrollments = enrollments.filter(
    (enrollment) => enrollment.course === cid
  );

  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === cid
  );

  const students = courseEnrollments
    .map((enrollment) => users.find((user) => user._id === enrollment.user))
    .filter((student): student is (typeof users)[0] => student !== undefined);

  const studentGrades = students.map((student) => {
    const studentGrade = {
      student: `${student.firstName} ${student.lastName}`,
      grades: courseAssignments.reduce((acc, assignment) => {
        const grade = grades.find(
          (g) => g.student === student._id && g.assignment === assignment._id
        );
        acc[assignment._id] = grade ? grade.grade : "N/A";
        return acc;
      }, {} as { [key: string]: string }),
    };
    return studentGrade;
  });

  return (
    <div>
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
      <br />
      <div className="table-responsive ">
        <table className="table table-striped text-center table-bordered">
          <thead>
            <tr>
              <th>Student Name</th>
              {courseAssignments.map((assignment) => (
                <th key={assignment._id}>
                  <div>{assignment.title}</div>
                  <div>(Out of {assignment.points})</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentGrades.map((studentGrade) => (
              <tr key={studentGrade.student}>
                <td className="text-danger">{studentGrade.student}</td>
                {courseAssignments.map((assignment) => (
                  <td key={assignment._id}>
                    {studentGrade.grades[assignment._id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
*/
