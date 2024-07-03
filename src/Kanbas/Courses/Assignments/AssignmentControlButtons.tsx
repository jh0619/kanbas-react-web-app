import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  return (
    <div className="ms-auto">
      <GreenCheckmark />
      <IoEllipsisVertical className="ms-3 fs-4" />
      <button
        className="btn btn-danger ms-2"
        onClick={() => deleteAssignment(assignmentId)}
      >
        Delete
      </button>
    </div>
  );
}
