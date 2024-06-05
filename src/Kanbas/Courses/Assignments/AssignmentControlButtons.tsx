import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
export default function AssignmentControlButtons() {
  return (
    <div className="ms-auto">
      <GreenCheckmark />
      <IoEllipsisVertical className="ms-3 fs-4" />
    </div>
  );
}
