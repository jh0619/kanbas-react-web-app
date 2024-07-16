import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { GiNotebook } from "react-icons/gi";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentsControls";
import { BsGripVertical } from "react-icons/bs";
import {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} from "./reducer";
import React, { useEffect } from "react";
import * as client from "./client";

export default function Assignments() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignments);
  const dispatch = useDispatch();

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  const saveAssignment = async (assignment: any) => {
    const status = await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const createAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(
      cid as string,
      assignment
    );
    dispatch(addAssignment(newAssignment));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const courseAssignments = assignments.filter(
    (assignment: any) => assignment.course === cid
  );

  return (
    <div id="wd-assignments">
      <AssignmentsControls />
      <br />
      <br />
      <br />
      <br />

      <ul id="wd-assignment-list" className="list-group rounded-0">
        <li className="wd-assignment-list-item list-group-item p-0 mb-5 fs-5 border-gray">
          <div id="wd-assignments-title" className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-1 fs-3" />
            <GoTriangleDown className="me-1" />
            <strong>ASSIGNMENTS</strong>
            <div className="float-end">
              <span className="badge bg-light text-dark me-2">
                40% of Total
              </span>
              <FaPlus
                className="me-2"
                onClick={() =>
                  navigate(`/Kanbas/Courses/${cid}/Assignments/New`)
                }
              />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ul className="wd-assignments list-group rounded-0 border-start border-5 border-success">
            {courseAssignments.map((assignment: any) => (
              <li
                key={assignment._id}
                className="wd-assignment d-flex align-items-center list-group-item p-3 ps-1"
              >
                <BsGripVertical className="me-2 fs-2" />
                <GiNotebook className="me-4 text-success fs-2" />
                <span>
                  <Link
                    className="wd-assignment-link text-dark text-decoration-none"
                    to={`/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                  >
                    <strong>{assignment.title}</strong>
                  </Link>
                  <div>
                    <span className="text-danger">Multiple Modules </span> |
                    <strong> Not available until</strong>{" "}
                    {assignment.availability} |
                  </div>
                  <div>
                    <strong>Due</strong> {assignment.due} | {assignment.points}{" "}
                    pts
                  </div>
                </span>
                <AssignmentControlButtons
                  assignmentId={assignment._id}
                  deleteAssignment={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this assignment?"
                      )
                    ) {
                      removeAssignment(assignment._id);
                    }
                  }}
                />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
