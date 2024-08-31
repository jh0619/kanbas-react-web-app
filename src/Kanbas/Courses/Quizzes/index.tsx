import QuizzesControls from "./QuizzesControls";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaEdit, FaTrash } from "react-icons/fa";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BsGripVertical } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { setQuizzes, deleteQuiz, updateQuiz } from "./reducer";
import * as client from "./client";

export default function Quizzes() {
  const quizzes = useSelector((state: any) => state.quizzes.quizzes);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentQuizId, setCurrentQuizId] = useState(null);
  const [quizResults, setQuizResults] = useState<any>({});

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const handleDelete = async (quizId: any) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));

    setShowModal(false);
    setCurrentQuizId(null);
    fetchQuizzes();
  };

  const handlePublish = async (quizId: any, action: string) => {
    try {
      const updatedQuiz = quizzes.find((quiz: any) => quiz._id === quizId);
      if (!updatedQuiz) return;
      const newQuiz = {
        ...updatedQuiz,
        published: action === "publish",
      };
      await client.updateQuiz(newQuiz);
      const updatedQuizzes = quizzes.map((quiz: any) =>
        quiz._id === quizId ? newQuiz : quiz
      );
      dispatch(setQuizzes(updatedQuizzes));
    } catch (error) {
      console.error("Error publishing quiz:", error);
    }
  };

  const fetchQuizzes = async () => {
    const quizzes = await client.findQuizzesForCourse(cid as string);
    console.log("Fetched quizzes:", quizzes);
    dispatch(setQuizzes(quizzes));
    if (currentUser.role === "STUDENT") {
      const results: { [key: string]: any } = {};
      for (const quiz of quizzes) {
        try {
          const result = await client.findQuizResultForUserAndQuiz(
            currentUser._id,
            quiz._id
          );
          results[quiz._id] = result;
        } catch (error) {
          console.error("Error fetching quiz result:", error);
        }
      }
      setQuizResults(results); // Store results in state
    }
  };

  const renderAvailability = (quiz: any) => {
    const currentDate = new Date();
    const availableDate = new Date(quiz.availableDate);
    const availableUntilDate = new Date(quiz.availableUntilDate);

    if (currentDate < availableDate) {
      return `Not available until ${formatDate(quiz.availableDate)}`;
    } else if (
      currentDate >= availableDate &&
      currentDate <= availableUntilDate
    ) {
      return "Available";
    } else {
      return "Closed";
    }
  };

  //Filter quizzes based on user role(only published quizzes for students)
  const filteredQuizzes =
    currentUser.role === "STUDENT"
      ? quizzes.filter((quiz: any) => quiz.published)
      : quizzes;

  useEffect(() => {
    fetchQuizzes();
  }, []);

  console.log("Current quizzes:", quizzes);

  return (
    <div id="wd-quizzes" className="ms-5">
      {currentUser.role === "FACULTY" && <QuizzesControls />}
      <br />
      <br />
      <ul id="wd-quizzes" className="list-group rounded-0">
        <li className="wd-quiz list-group-item p-0 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <IoMdArrowDropdown className="me-3 fs-3" />
            <span className="fw-bold">Assignment Quizzes</span>
          </div>
        </li>
      </ul>
      {(currentUser.role === "FACULTY" ? quizzes : filteredQuizzes)
        .filter((quiz: any) => quiz.courseID === cid)
        .map((quiz: any) => (
          <ul
            id="wd-quiz-list"
            className="list-group rounded-0 border-left-green border-gray"
          >
            <li
              key={quiz._id}
              className="wd-quiz-list-item list-group-item p-0 fs-5 d-flex align-items-center text-nowrap"
            >
              <div className="ps-2">
                <FaEdit className="me-2 fs-3 text-success" />
              </div>
              <div className="p-3 flex-grow-1">
                <div>
                  <Link
                    to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`}
                    className="text-dark fw-bold text-decoration-none"
                  >
                    {quiz.title}
                  </Link>
                </div>
                <div>
                  <span className="text-muted fw-bold">
                    {renderAvailability(quiz)}
                  </span>
                  <span className="mx-2">|</span>
                  <span className="text-muted fw-bold">Due </span>
                  <span className="text-muted">{formatDate(quiz.dueDate)}</span>
                  <span className="mx-2">|</span>
                  <span className="text-muted">{quiz.totalPoints} pts</span>
                  <span className="mx-2">|</span>
                  <span className="text-muted">
                    {quiz.questions.length} questions
                  </span>
                  {currentUser.role === "STUDENT" && quizResults[quiz._id] && (
                    <>
                      <span className="mx-2">|</span>
                      <span className="text-muted">
                        Score: {quizResults[quiz._id].totalScore}
                      </span>
                    </>
                  )}
                </div>
              </div>
              {/* ADD: Show appropriate icon based on publish status */}
              <div className="float-end">
                {quiz.published ? (
                  <GreenCheckmark />
                ) : (
                  <span className="text-danger">❌</span>
                )}
              </div>
              {currentUser.role === "FACULTY" && (
                <div className="float-end">
                  <IoEllipsisVertical
                    className="ms-2 me-3 fs-3"
                    onClick={() =>
                      document
                        .getElementById(`quiz-context-menu-${quiz._id}`)
                        ?.classList.toggle("d-none")
                    }
                  />
                  <div
                    id={`quiz-context-menu-${quiz._id}`}
                    className="quiz-context-menu d-none"
                  >
                    <div
                      onClick={() => {
                        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`);
                      }}
                    >
                      Edit
                    </div>
                    <div onClick={() => handleDelete(quiz._id)}>Delete</div>
                    <div
                      onClick={() =>
                        handlePublish(
                          quiz._id,
                          quiz.published ? "unPublish" : "publish"
                        )
                      }
                    >
                      {quiz.published ? "Unpublish" : "Publish"}
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        ))}
    </div>
  );
}
