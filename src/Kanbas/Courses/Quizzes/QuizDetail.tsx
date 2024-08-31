import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as client from "./client";
import { FaEdit } from "react-icons/fa";

export default function QuizDetail() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const navigate = useNavigate();
  const [studentResult, setStudentResult] = useState<any>(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState<string | null>(
    null
  );

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

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!qid) {
        console.error("Quiz ID is undefined");
        return;
      }
      try {
        const fetchedQuiz = await client.findQuizById(qid);
        console.log("Fetched quiz:", fetchedQuiz);
        setQuiz(fetchedQuiz);
        if (currentUser.role === "STUDENT") {
          try {
            const result = await client.findQuizResultForUserAndQuiz(
              currentUser._id,
              qid
            );
            setStudentResult(result);
          } catch (error) {
            console.warn("Quiz result not found. Assuming first attempt.");
            setStudentResult(null);
          }
        }
        const currentDate = new Date();
        const availableDate = new Date(fetchedQuiz.availableDate);
        const availableUntilDate = new Date(fetchedQuiz.availableUntilDate);

        if (currentDate < availableDate) {
          setAvailabilityMessage(
            `This quiz is not available until ${formatDate(
              fetchedQuiz.availableDate
            )}.`
          );
        } else if (
          currentDate >= availableDate &&
          currentDate <= availableUntilDate
        ) {
          setAvailabilityMessage(null);
        } else {
          setAvailabilityMessage("This quiz is closed.");
        }
        console.log(availabilityMessage);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [qid, cid, currentUser]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const handleReviewCorrectAnswers = async () => {
    setShowCorrectAnswers(true);
    try {
      const updatedResult = {
        ...studentResult,
        attemptNumber: quiz.howManyAttempts,
      };
      const updatedQuizResult = await client.saveQuizResult(
        currentUser._id,
        qid as string,
        updatedResult
      );

      console.log("QuizResult updated successfully:", updatedQuizResult);
    } catch (error) {
      console.error("Error updating QuizResult:", error);
    }
  };

  const attemptsRemaining =
    quiz.howManyAttempts - (studentResult ? studentResult.attemptNumber : 0);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center align-items-center">
        {currentUser.role === "FACULTY" ? (
          <>
            <button
              className="btn btn-primary mx-2"
              onClick={() =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Start`)
              }
            >
              Preview
            </button>
            <button
              className="btn btn-secondary"
              onClick={() =>
                navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`)
              }
            >
              Edit
            </button>
          </>
        ) : (
          <>
            {availabilityMessage ? (
              <div className="alert alert-info" role="alert">
                {availabilityMessage}
              </div>
            ) : (
              <>
                {attemptsRemaining > 0 && !showCorrectAnswers && (
                  <button
                    className="btn btn-danger"
                    style={{ marginRight: "20px" }}
                    onClick={() =>
                      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Start`)
                    }
                  >
                    {studentResult
                      ? `Take it again (${attemptsRemaining} attempts left)`
                      : "Start the Quiz"}
                  </button>
                )}
                {attemptsRemaining === 0 && (
                  <p>You have no more attempts left.</p>
                )}
                {studentResult && attemptsRemaining > 0 && (
                  <button
                    className="btn btn-info"
                    onClick={handleReviewCorrectAnswers}
                  >
                    Review correct answers (no more attempts)
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <hr />
      <h1 className="mt-4">{quiz.title}</h1>
      <br />
      {currentUser.role === "FACULTY" && (
        <dl className="row">
          <dt className="col-sm-3" style={{ textAlign: "right" }}>
            Quiz Type
          </dt>
          <dd className="col-sm-9">{quiz.quizType}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Points
          </dt>
          <dd className="col-sm-9">{quiz.totalPoints}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Assignment Group
          </dt>
          <dd className="col-sm-9">{quiz.assignmentGroup}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Shuffle Answers
          </dt>
          <dd className="col-sm-9">{quiz.shuffleAnswers ? "Yes" : "No"}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Time Limit
          </dt>
          <dd className="col-sm-9">{quiz.timeLimit}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Multiple Attempts
          </dt>
          <dd className="col-sm-9">{quiz.multipleAttempts ? "Yes" : "No"}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            How Many Attempts
          </dt>
          <dd className="col-sm-9">{quiz.howManyAttempts}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Show Correct Answers
          </dt>
          <dd className="col-sm-9">{quiz.showCorrectAnswers ? "Yes" : "No"}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Access Code
          </dt>
          <dd className="col-sm-9">{quiz.accessCode}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            One Question at a Time
          </dt>
          <dd className="col-sm-9">{quiz.oneQuestionAtATime ? "Yes" : "No"}</dd>

          {/* <dt className="col-sm-3">Require Respondus LockDown Browser</dt>
            <dd className="col-sm-9">{quiz.requireRespondus ? "Yes" : "No"}</dd>

            <dt className="col-sm-3">Required to View Quiz Results</dt>
            <dd className="col-sm-9">{quiz.viewQuizResults ? "Yes" : "No"}</dd> */}

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Webcam Required
          </dt>
          <dd className="col-sm-9">{quiz.webcamRequired ? "Yes" : "No"}</dd>

          <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
            Lock Questions After Answering
          </dt>
          <dd className="col-sm-9">{quiz.lockQuestions ? "Yes" : "No"}</dd>
        </dl>
      )}
      <dl className="row">
        <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
          Due Date
        </dt>
        <dd className="col-sm-9">{formatDate(quiz.dueDate)}</dd>
        <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
          Available From
        </dt>
        <dd className="col-sm-9">{formatDate(quiz.availableDate)}</dd>
        <dt className="col-sm-3 text-right" style={{ textAlign: "right" }}>
          Until Date
        </dt>
        <dd className="col-sm-9">{formatDate(quiz.availableUntilDate)}</dd>
        <hr />
      </dl>
      {currentUser.role === "STUDENT" && studentResult && (
        <div>
          <h3>Quiz Result from Last Attempt</h3>
          <p>
            Score: {studentResult.totalScore} / {quiz.totalPoints}
          </p>
          {studentResult.answers.map((answer: any, index: number) => {
            const question = quiz.questions.find(
              (q: any) => q.questionId === answer.questionId
            );
            if (!question) return null;
            return (
              <div key={index} className="card mb-4 p-4">
                <h2>{`Question ${index + 1}: ${question.questionTitle}`}</h2>
                <h5>{question.question}</h5>
                <div className="mb-2">
                  {question.questionType === "Multiple Choice" && (
                    <div>
                      {question.choices.map((choice: any, idx: number) => (
                        <div
                          key={idx}
                          className="d-flex align-items-center mb-2"
                        >
                          <div>
                            <input
                              type="radio"
                              className="form-check-input"
                              checked={answer.answer === choice.optionText}
                              disabled
                            />
                            <label className="ml-2">{choice.optionText}</label>
                            {(attemptsRemaining === 0 || showCorrectAnswers) &&
                              answer.isCorrect &&
                              answer.answer === choice.optionText && (
                                <span
                                  className="badge mr-2"
                                  style={{
                                    backgroundColor: "green",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  Correct!
                                </span>
                              )}
                            {(attemptsRemaining === 0 || showCorrectAnswers) &&
                              !answer.isCorrect &&
                              answer.answer === choice.optionText && (
                                <span
                                  className="badge mr-2"
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  Wrong!
                                </span>
                              )}
                            {(attemptsRemaining === 0 || showCorrectAnswers) &&
                              answer.answer !== choice.optionText &&
                              choice.correct && (
                                <span
                                  className="badge mr-2"
                                  style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  Correct Answer
                                </span>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {question.questionType === "True/False" && (
                    <div>
                      {question.choices.map((choice: any, idx: number) => (
                        <div
                          key={idx}
                          className="d-flex align-items-center mb-2"
                        >
                          <div>
                            <input
                              type="radio"
                              className="form-check-input"
                              checked={answer.answer === choice.optionText}
                              disabled
                            />
                            <label className="ml-2">{choice.optionText}</label>
                            {(attemptsRemaining === 0 || showCorrectAnswers) &&
                              answer.isCorrect &&
                              answer.answer === choice.optionText && (
                                <span
                                  className="badge mr-2"
                                  style={{
                                    backgroundColor: "green",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  Correct!
                                </span>
                              )}
                            {(attemptsRemaining === 0 || showCorrectAnswers) &&
                              !answer.isCorrect &&
                              answer.answer === choice.optionText && (
                                <span
                                  className="badge mr-2"
                                  style={{
                                    backgroundColor: "red",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  Wrong!
                                </span>
                              )}
                            {(attemptsRemaining === 0 || showCorrectAnswers) &&
                              answer.answer !== choice.optionText &&
                              choice.correct && (
                                <span
                                  className="badge mr-2"
                                  style={{
                                    backgroundColor: "blue",
                                    color: "white",
                                    padding: "5px 10px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  Correct Answer
                                </span>
                              )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {question.questionType === "Fill in Multiple Blanks" && (
                    <div>
                      <p>
                        Your Answer:{" "}
                        <span className={answer.isCorrect}>
                          {answer.answer}
                        </span>
                        {(attemptsRemaining === 0 || showCorrectAnswers) &&
                          answer.isCorrect && (
                            <span
                              className="badge mr-2"
                              style={{
                                backgroundColor: "green",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "10px",
                              }}
                            >
                              Correct!
                            </span>
                          )}
                        {(attemptsRemaining === 0 || showCorrectAnswers) &&
                          !answer.isCorrect && (
                            <span
                              className="badge mr-2"
                              style={{
                                backgroundColor: "red",
                                color: "white",
                                padding: "5px 10px",
                                borderRadius: "10px",
                              }}
                            >
                              Wrong!
                            </span>
                          )}
                        {(attemptsRemaining === 0 || showCorrectAnswers) &&
                          !answer.isCorrect && (
                            <div className="ml-2 text-danger">
                              <b>
                                Correct Answer: {question.choices[0].optionText}
                              </b>
                            </div>
                          )}
                      </p>
                    </div>
                  )}
                </div>
                <p>
                  (Points:{answer.isCorrect ? question.points : 0} /{" "}
                  {question.points})
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
