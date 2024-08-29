import { Link } from "react-router-dom";
import * as enrollmentClient from "../Courses/Enrollments/client";
import * as coursesClient from "../Courses/client";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [unenrolledCourses, setUnenrolledCourses] = useState<any[]>([]);
  const fetchEnrolledCourses = async () => {
    if (currentUser.role === "STUDENT") {
      const enrolled = await enrollmentClient.fetchEnrollmentsByStudent(
        currentUser._id
      );
      setEnrolledCourses(enrolled || []);

      const unenrolled = courses.filter(
        (course) =>
          !enrolled.some(
            (enrolledCourse: any) => enrolledCourse.course._id === course._id
          )
      );
      setUnenrolledCourses(unenrolled);
    } else if (currentUser.role === "FACULTY") {
      const facultyCourses = await coursesClient.fetchCoursesByFaculty(
        currentUser._id
      );
      setEnrolledCourses(facultyCourses);
    }
  };

  const handleEnroll = async (courseId: string) => {
    await enrollmentClient.enrollStudent(currentUser._id, courseId);
    fetchEnrolledCourses();
  };
  const handleUnenroll = async (courseId: string) => {
    try {
      await enrollmentClient.unenrollStudent(currentUser._id, courseId);
      fetchEnrolledCourses();
    } catch (error) {
      console.error("Error unenrolling from course:", error);
    }
  };
  useEffect(() => {
    fetchEnrolledCourses();
  });

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
          <hr />
        </>
      )}
      {currentUser.role === "STUDENT" && (
        <>
          {" "}
          <h2 id="wd-dashboard-enrolled">
            Enrolled Courses({enrolledCourses.length})
          </h2>{" "}
          <hr />
          {enrolledCourses.length === 0 && (
            <p>You have not enrolled in any courses yet.</p>
          )}
          <div id="wd-dashboard-enrolled-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {enrolledCourses.map((course) => (
                <div
                  key={course._id}
                  className="wd-dashboard-course-col"
                  style={{ width: "300px" }}
                >
                  <Link
                    to={`/Kanbas/Courses/${course.course._id}/Home`}
                    className="text-decoration-none"
                  >
                    <div className="card rounded-3 overflow-hidden">
                      <img
                        src="/images/1.jpg"
                        alt={course.course.name}
                        height="{160}"
                      />
                      <div className="card-body">
                        <span
                          className="wd-dashboard-course-link"
                          style={{
                            textDecoration: "none",
                            color: "navy",
                            fontWeight: "bold",
                            display: "block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            width: "100%",
                          }}
                        >
                          {course.course.name}
                        </span>
                        <p
                          className="wd-dashboard-course-title card-text"
                          style={{
                            maxHeight: 53,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {course.course.description}
                        </p>
                        <Link
                          to={`/Kanbas/Courses/${course.course._id}/Home`}
                          className="btn btn-primary"
                        >
                          Go
                        </Link>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleUnenroll(course.course._id);
                          }}
                          className="btn btn-danger float-end"
                        >
                          Unenroll
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <h2 id="wd-dashboard-unenrolled">
            Unenrolled Courses({unenrolledCourses.length})
          </h2>{" "}
          <hr />
          {unenrolledCourses.length === 0 && <p>Found 0 unenrolled courses.</p>}
          <div id="wd-dashboard-unenrolled-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {unenrolledCourses.map((course) => (
                <div
                  key={course._id}
                  className="wd-dashboard-course-col"
                  style={{ width: "300px" }}
                >
                  <div className="card rounded-3 overflow-hidden">
                    <img src="/images/1.jpg" alt={course.name} height="{160}" />
                    <div className="card-body">
                      <span
                        className="wd-dashboard-course-link"
                        style={{
                          textDecoration: "none",
                          color: "navy",
                          fontWeight: "bold",
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "100%",
                        }}
                      >
                        {course.name}
                      </span>
                      <p
                        className="wd-dashboard-course-title card-text"
                        style={{
                          maxHeight: 53,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {course.description}
                      </p>
                      <button
                        onClick={() => handleEnroll(course._id)}
                        className="btn btn-success"
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
      {currentUser.role === "FACULTY" && (
        <>
          <h2 id="wd-dashboard-published">
            Published Courses ({enrolledCourses.length})
          </h2>
          <hr />
          <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {enrolledCourses.map((course) => (
                <div
                  className="wd-dashboard-course col"
                  style={{ width: "300px" }}
                >
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="text-decoration-none"
                  >
                    <div className="card rounded-3 overflow-hidden">
                      <img
                        src="/images/1.jpg"
                        alt={course.name}
                        height="{160}"
                      />
                      <div className="card-body">
                        <span
                          className="wd-dashboard-course-link"
                          style={{
                            textDecoration: "none",
                            color: "navy",
                            fontWeight: "bold",
                          }}
                        >
                          {course.name}
                        </span>
                        <p
                          className="wd-dashboard-course-title card-text"
                          style={{ maxHeight: 53, overflow: "hidden" }}
                        >
                          {course.description}
                        </p>
                        <Link
                          to={`/Kanbas/Courses/${course._id}/Home`}
                          className="btn btn-primary"
                        >
                          Go
                        </Link>

                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
