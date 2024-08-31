import React, { useEffect, useState } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes, setDraftQuiz, updateDraftQuiz, clearDraftQuiz } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";

interface LocationState {
  activeTab: string;
}

export default function DetailsEditor() {
  const { cid, qid } = useParams<{ cid: string; qid?: string }>();
  const isNew = qid === "new";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const state = location.state as LocationState;

  const [activeTab, setActiveTab] = useState("details");
  const [totalPoints, setTotalPoints] = useState(0);
  const quiz = useSelector((state: any) => {
    return isNew ? state.quizzes.draftQuiz : state.quizzes.quizzes.find((quiz: any) => quiz._id === qid);
  });

  const formatDate = (dateString: string | Date) => {
    if (!dateString) {
      return '';
    }
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (e) {
      console.error('Invalid date', e);
      return '';
    }
  };


  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location]);


  let counter = quiz.questions.length;
  const addNewQuestion = () => {
    console.log("Adding new question");
    const newQuestion = {
      questionId: Date.now() + counter++,
      questionTitle: 'New Question',
      question: "",
      questionType: "Multiple Choice",
      points: 0,
      choices: []
    };
    const updatedQuestions = [...quiz.questions, newQuestion];
    if (isNew) {
      // For a new quiz, update the draft quiz state
      console.log("Updating draft quiz with new question for a new quiz");
      dispatch(updateDraftQuiz({
        ...quiz,
        questions: updatedQuestions
      }));
    } else {
      // For an existing quiz, update the quiz with an ID
      console.log("Updating existing quiz with new question");
      if (quiz._id) {
        dispatch(updateQuiz({
          ...quiz,
          questions: updatedQuestions
        }));
      } else {
        console.error("quiz ID is missing, unable to update the existing quiz");
      }
    }
  };

  const deleteQuestion = (questionId: any) => {
    const updatedQuestions = quiz.questions.filter((question: any) => question.questionId !== questionId);
    const updatedquiz = {
      ...quiz,
      questions: updatedQuestions
    };
    if (isNew) {
      dispatch(updateDraftQuiz(updatedquiz));
    } else {
      dispatch(updateQuiz(updatedquiz));
    }
  }

  const handleEditQuestion = (questionId: any) => {
    if (isNew) {
      // Navigate to the new quiz path
      navigate(`/Kanbas/Courses/${cid}/Quizzes/new/questions/${questionId}`);
    } else {
      // Navigate to the existing quiz path with the quiz ID
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions/${questionId}`);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    let updatedQuiz = { ...quiz };

    if (name === "isTimeLimited") {
      if (checked) {
        updatedQuiz[name] = true;
        updatedQuiz['timeLimit'] = quiz.timeLimit || 20;
      } else {
        updatedQuiz[name] = false;
        updatedQuiz['timeLimit'] = 0;
      }
    } else if (name === "timeLimit" && quiz.isTimeLimited) {
      updatedQuiz[name] = Number(value);
    } else if (name === "multipleAttempts") {
      if (checked) {
        updatedQuiz[name] = true;
        updatedQuiz['howManyAttempts'] = quiz.howManyAttempts || 1;
      } else {
        updatedQuiz[name] = false;
        updatedQuiz['howManyAttempts'] = 1;
      }
    } else if (name === "howManyAttempts" && quiz.multipleAttempts) {
      updatedQuiz[name] = Number(value);
    } else {
      updatedQuiz[name] = type === 'checkbox' ? checked : value;
    }

    if (isNew) {
      dispatch(updateDraftQuiz(updatedQuiz));
    } else {
      dispatch(updateQuiz(updatedQuiz));
    }
  };

  const handleDescriptionChange = (value: any) => {
    const updatedquiz = { ...quiz, description: value };
    if (isNew) {
      dispatch(updateDraftQuiz(updatedquiz))
    } else {
      dispatch(updateQuiz(updatedquiz));
    }
  };

  const handleQuestionChange = (e: any, questionId: any) => {
    const { name, value } = e.target;
    const updatedQuestions = quiz.questions.map((question: any) =>
      question.questionId === questionId ? { ...question, [name]: value } : question
    );
    const updatedquiz = { ...quiz, questions: updatedQuestions };
    if (isNew) {
      dispatch(updateDraftQuiz(updatedquiz))
    } else {
      dispatch(updateQuiz(updatedquiz));
    }
  };

  const handleSave = async (quiz: any) => {
    try {
      const updatedTotalPoints = quiz.questions.reduce((acc: any, curr: any) => acc + (curr.points || 0), 0);
      const quizWithUpdatedPoints = { ...quiz, totalPoints: updatedTotalPoints };

      let resultData;
      if (isNew) {
        resultData = await client.createQuiz(cid as string, quizWithUpdatedPoints);
        console.log("Created quiz Data:", resultData);
        dispatch(addQuiz(resultData));
      } else {
        resultData = await client.updateQuiz(quizWithUpdatedPoints);
        dispatch(updateQuiz(resultData));
      }
      dispatch(clearDraftQuiz());
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving quizzes:", error);
    }
  };

  const handleCancel = () => {
    dispatch(clearDraftQuiz());
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleSaveAndPublish = async (quiz: any) => {
    try {
      //save the quiz
      let resultData;
      if (isNew) {
        resultData = await client.createQuiz(cid as string, quiz);
        console.log("result data: ", resultData)
        dispatch(addQuiz(resultData));
        // update quiz to include new quiz id
        quiz = { ...quiz, _id: resultData._id };
      } else {
        // Make the update call
        const response = await client.updateQuiz(quiz);
        console.log("Update response:", response);
        if (response === "") {
          console.log("Update successful, no content returned.");
          dispatch(updateQuiz(quiz));
        } else {
          dispatch(updateQuiz(response));
        }
      }
      //publish the quiz
      await client.saveAndPublishQuiz(quiz._id);
      dispatch(updateQuiz({ ...quiz, published: true }));
      dispatch(clearDraftQuiz());
      navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving and publishing quizzes:", error);
    };
  }

  useEffect(() => {
    if (quiz && quiz.questions) {
      const sum = quiz.questions.reduce((acc: any, curr: any) => acc + (curr.points || 0), 0);
      setTotalPoints(sum);
    }
  }, [quiz, isNew]);

  return (
    <div id="wd-quiz-editor" className="ms-5">
      <div className="float-end">
        <span style={{ marginRight: "8px" }}>Points</span>
        <span style={{ marginRight: "10px" }}>{totalPoints}</span>
        <span style={{ marginRight: "8px", color: "grey" }}>
          <span
            style={{
              color: quiz.published ? "green" : "grey",
              textDecoration: quiz.published ? "none" : "underline",
              cursor: "not-allowed"
            }}
          >
            {quiz.published ? "Published" : "Not Published"}
          </span>
        </span>
        <FaEllipsisVertical />
      </div>
      <br />
      <hr />
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "details" ? "active" : ""}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "questions" ? "active" : ""}`}
            onClick={() => setActiveTab("questions")}
          >
            Questions
          </button>
        </li>
      </ul>
      <br />
      {activeTab === "details" && (
        <div>
          < input
            className='form-control w-50'
            placeholder='Unnamed quiz'
            value={quiz.title}
            onChange={handleChange}
            name="title" /><br />
          <p>quiz Instructions: </p>
          <ReactQuill
            value={quiz.description}
            onChange={handleDescriptionChange}
          />{" "}
          <br />
          <div className="row mb-3">
            <label htmlFor="wd-quiz-type"
              className="col-2 col-form-label" >quiz Type</label>
            <div className="col-10">
              <select id="wd-group" className="form-select" value={quiz.quizType} name="quizType" onChange={handleChange}>
                <option value="GRADED QUIZ">Graded quiz</option>
                <option value="PRACTICE QUIZ">Practice quiz</option>
                <option value="GRADED SURVEY">Graded Survey</option>
                <option value="UPGRADED SURVEY">Ungraded Survey</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <label
              htmlFor="wd-assignment-group"
              className="col-2 col-form-label"
            >
              Assignment Group
            </label>
            <div className="col-10">
              <select
                id="wd-group"
                className="form-select"
                value={quiz.assignmentGroup}
                name="assignmentGroup"
                onChange={handleChange}
              >
                <option value="QUIZZES">Quizzes</option>
                <option value="EXAMS">Exams</option>
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="PROJECT">Project</option>
              </select>
            </div>
          </div>
          <div className="mt-3">
            <label
              htmlFor="wd-quiz-options"
              className="col-2 col-form-label fw-bold"
            >
              Options
            </label>
            <br />
            <input
              type="checkbox"
              name="shuffleAnswers"
              checked={quiz.shuffleAnswers ?? true}
              onChange={handleChange}
            />{" "}
            Shuffle Answers
          </div>
          <div
            className="mt-3"
            style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="isTimeLimited"
              checked={quiz.isTimeLimited ?? true}
              onChange={handleChange}
            />{" "}
            Time Limit
            {(quiz.isTimeLimited ?? true) && (
              <>
                <input
                  type="number"
                  name="timeLimit"
                  value={quiz.timeLimit ?? 20}
                  onChange={handleChange}
                  className="form-control ms-2"
                  style={{ width: "100px" }}
                />
                <span className="ms-2">Minutes</span>
              </>
            )}
          </div>
          <div
            className="mt-3"
            style={{ display: "flex", alignItems: "center" }} >
            <input
              type="checkbox"
              name="multipleAttempts"
              checked={quiz.multipleAttempts}
              onChange={handleChange}
            />{" "}
            Allow Multiple Attempts
            {quiz.multipleAttempts && (
              <>
                <input
                  type="number"
                  id="howManyAttempts"
                  name="howManyAttempts"
                  value={quiz.howManyAttempts}
                  onChange={handleChange}
                  className="form-control ms-2"
                  style={{ width: "100px" }}
                />
                <span className="ms-2">Attempts</span>
              </>
            )}
          </div>
          <div className="mt-3" style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="showCorrectAnswers"
              checked={quiz.showCorrectAnswers}
              onChange={handleChange}
            />{" "}
            Show Correct Answers
          </div>
          <div className="mt-3" style={{ display: "flex", alignItems: "center" }}>
            <label htmlFor="accessCode" className="form-label me-2">
              Access Code
            </label>
            <input
              type="text"
              id="accessCode"
              name="accessCode"
              value={quiz.accessCode || ""}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter access code"
              style={{ width: "200px" }}
            />
          </div>
          <div className="mt-3" style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="oneQuestionAtATime"
              checked={quiz.oneQuestionAtATime ?? true}
              onChange={handleChange}
            />{" "}
            One Question at a Time
          </div>
          <div className="mt-3" style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="webcamRequired"
              checked={quiz.webcamRequired}
              onChange={handleChange}
            />{" "}
            Webcam Required
          </div>
          <div className="mt-3" style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              name="lockQuestions"
              checked={quiz.lockQuestions}
              onChange={handleChange}
            />{" "}
            Lock Questions After Answering
          </div>
          <br />
          <div className="row mb-5">
            <label className="col-form-label col-2">Assign</label>
            <div className="col-10">
              <div className="card">
                <div className="card-body">
                  <div className="mb-3">
                    <label
                      htmlFor="wd-assign-to"
                      className="form-label fw-bold"
                    >
                      Assign to
                    </label>
                    <input
                      id="wd-assign-to"
                      className="form-control"
                      value="Everyone"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="wd-due-date" className="form-label fw-bold">
                      Due
                    </label>
                    <div className="input-group">
                      <input
                        id="wd-due-date"
                        type="datetime-local"
                        className="form-control"
                        value={formatDate(quiz.dueDate)}
                        onChange={handleChange}
                        name="dueDate"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="wd-available-from"
                        className="form-label fw-bold"
                      >
                        Available from
                      </label>
                      <div className="input-group">
                        <input
                          id="wd-available-from"
                          type="datetime-local"
                          className="form-control"
                          value={formatDate(quiz.availableDate)}
                          onChange={handleChange}
                          name="availableDate"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="wd-available-until"
                        className="form-label fw-bold"
                      >
                        Until
                      </label>
                      <div className="input-group">
                        <input
                          id="wd-available-until"
                          type="datetime-local"
                          className="form-control"
                          value={formatDate(quiz.availableUntilDate)}
                          onChange={handleChange}
                          name="availableUntilDate"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button className="btn btn-secondary me-2" onClick={handleCancel}>
              Cancel
            </button>
            <button
              className="btn btn-danger me-2"
              onClick={() => handleSave(quiz)}
            >
              Save
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleSaveAndPublish(quiz)}
            >
              Save and Publish
            </button>
          </div>
          <br />
        </div>
      )}

      {activeTab === 'questions' && (
        <div>
          <div className="float-end">
            <span style={{ marginRight: "8px" }}>Points</span>
            <span style={{ marginRight: "10px" }}>{totalPoints}</span>
          </div>
          <br />

          {quiz.questions.map((question: any) => (
            <div key={question.questionId} className="question-item" style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center' }} >
                <span className='me-2 form-control'
                  style={{ marginRight: '15px' }}>{question.questionId}</span>
                <input className='form-control me-2'
                  name="questionTitle"
                  style={{ marginRight: '10px' }}
                  value={question.questionTitle}
                  onChange={(e) => handleQuestionChange(e, question.questionId)} />
                <select
                  name="questionType"
                  style={{ marginRight: '10px' }}
                  value={question.questionType || 'Multiple Choice'}
                  className='form-select'
                  onChange={(e) => handleQuestionChange(e, question.questionId)}
                >
                  <option value="Multiple Choice">Multiple Choice</option>
                  <option value="True/False">True/False</option>
                  <option value="Fill in Multiple Blanks">Fill in Multiple Blanks</option>
                </select>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginLeft: '30px' }}>
                <FaEdit className='fs-5 me-3' onClick={() => handleEditQuestion(question.questionId)} />
                <FaRegTrashAlt className='fs-5 me-3' onClick={() => deleteQuestion(question.questionId)} />
              </div><br /><br />
            </div>
          ))}
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={addNewQuestion}>
              + New Question
            </button>
          </div>
          <br />
          <div>
            <button className="btn btn-secondary me-3" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={() => handleSave(quiz)}>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
