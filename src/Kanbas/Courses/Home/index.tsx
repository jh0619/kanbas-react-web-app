import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <table id="wd-home">
      <tr>
        <td valign="top">
          <Modules />
        </td>
        <td valign="top" width={"200px"}>
          <CourseStatus />
        </td>
      </tr>
    </table>
  );
}
