import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
            <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0 border-start border-5 border-success">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <LessonControlButtons />
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                READING
                <LessonControlButtons />
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 1
                </li>
                <li className="wd-content-item">
                  Full Stack Developer - Chapter 2
                </li>
              </ul>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                SLIDES
                <LessonControlButtons />
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to Web Development
                </li>
                <li className="wd-content-item">
                  Creating an HTTP server with Node.js
                </li>
                <li className="wd-content-item">
                  Creating a React application
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            Week 2 , Lecture 2 - Formatting User Interfaces with HTML
            <ModuleControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0 border-start border-5 border-success">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
                <LessonControlButtons />
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn how to create user interfaces with HTML
                </li>
                <li className="wd-content-item">
                  Deploy the assignment to Netlify
                </li>
              </ul>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <span className="wd-title">
                <BsGripVertical className="me-2 fs-3" />
                SLIDES
                <LessonControlButtons />
              </span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to HTML and the DOM
                </li>
                <li className="wd-content-item">
                  Formatting Web content with Headings
                </li>
                <li className="wd-content-item">
                  Formatting content with Lists and Tables
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
