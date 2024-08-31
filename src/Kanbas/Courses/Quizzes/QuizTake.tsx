import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";
import { updateQuiz } from "./reducer";

export default function TakeQuiz() {
  const { cid, qid } = useParams();
  const dispatch = useDispatch();
  //const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  //const [timeRemaining, setTimeRemaining] = useState(0);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const quiz = useSelector((state: any) =>
    state.quizzes.quizzes.find((q: any) => q._id === qid)
  );
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!quiz && qid) {
  //     const fetchQuiz = async () => {
  //       try {
  //         const fetchedQuiz = await client.findQuizById(qid);
  //         dispatch(updateQuiz(fetchedQuiz));
  //         //setTimeRemaining(fetchedQuiz.timeLimit * 60);
  //       } catch (error) {
  //         console.error("Error fetching quiz:", error);
  //       }
  //     };

  //     fetchQuiz();
  //   } else if (quiz) {
  //     setTimeRemaining(quiz.timeLimit * 60); // convert minutes to seconds
  //   }
  // }, [qid, quiz, dispatch]);

  // useEffect(() => {
  //   if (timeRemaining <= 0) {
  //     handleSubmitQuiz();
  //   }

  //   const intervalId = setInterval(() => {
  //     setTimeRemaining(timeRemaining - 1);
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [timeRemaining]);
  useEffect(() => {
    if (!quiz && qid) {
      const fetchQuiz = async () => {
        try {
          const fetchedQuiz = await client.findQuizById(qid);
          dispatch(updateQuiz(fetchedQuiz));
        } catch (error) {
          console.error("Error fetching quiz:", error);
        }
      };

      fetchQuiz();
    }
  }, [qid, quiz, dispatch]);

  const handleAnswerChange = (
    questionId: number,
    answer: string,
    isCorrect: boolean
  ) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((ans) =>
        ans.questionId === questionId ? { ...ans, answer, isCorrect } : ans
      );
      if (!updatedAnswers.find((ans) => ans.questionId === questionId)) {
        updatedAnswers.push({ questionId, answer, isCorrect });
      }
      return updatedAnswers;
    });
  };

  // const handleNextQuestion = () => {
  //   if (currentQuestionIndex < quiz.questions.length - 1) {
  //     setCurrentQuestionIndex(currentQuestionIndex + 1);
  //   }
  // };

  const handleSubmitQuiz = async () => {
    let attemptNumber = 1;
    try {
      const existingResult = await client.findQuizResultForUserAndQuiz(
        currentUser._id,
        qid as string
      );
      if (existingResult) {
        attemptNumber = existingResult.attemptNumber + 1;
      }
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        console.log("First attempt at the quiz, setting attemptNumber to 1");
        attemptNumber = 1;
      } else {
        console.error("Error checking existing quiz results:", error);
        return;
      }
    }
    const totalScore = answers.reduce((acc, answer) => {
      if (answer.isCorrect) {
        const question = quiz.questions.find(
          (q: any) => q.questionId === answer.questionId
        );
        if (question) {
          return acc + question.points;
        }
      }
      return acc;
    }, 0);

    const result = {
      answers,
      totalScore,
      attemptNumber,
    };
    try {
      if (currentUser.role === "FACULTY") {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/preview/results`, {
          state: { result, quiz, cid },
        });
      } else {
        await client.saveQuizResult(currentUser._id, qid as string, result);
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  //const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="container mt-4">
      <h1>{quiz.title}</h1>
      {currentUser.role === "FACULTY" && (
        <p className="text-danger">
          This is a preview of the published version of the quiz
        </p>
      )}
      <p>Time limit: {quiz.timeLimit} minutes</p>

      <div className="p-4">
        {quiz.questions.map((question: any, index: number) => (
          <div key={index} className="card card mb-4 p-4">
            <p>{`Question ${index + 1} of ${quiz.questions.length}`}</p>
            <h2>{question.questionTitle}</h2>
            <h5>{question.question}</h5>
            {question.questionType === "Multiple Choice" && (
              <div>
                {question.choices.map((choice: any, idx: number) => (
                  <div key={idx} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${question.questionId}`}
                      value={choice.optionText}
                      onChange={() =>
                        handleAnswerChange(
                          question.questionId,
                          choice.optionText,
                          choice.correct
                        )
                      }
                    />
                    <label className="form-check-label">
                      {choice.optionText}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {question.questionType === "True/False" && (
              <div>
                {question.choices.map((choice: any, idx: number) => (
                  <div key={idx} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${question.questionId}`}
                      value={choice.optionText}
                      onChange={() =>
                        handleAnswerChange(
                          question.questionId,
                          choice.optionText,
                          choice.correct
                        )
                      }
                    />
                    <label className="form-check-label">
                      {choice.optionText}
                    </label>
                  </div>
                ))}
              </div>
            )}
            {question.questionType === "Fill in Multiple Blanks" && (
              <input
                type="text"
                className="form-control"
                onChange={(e) =>
                  handleAnswerChange(
                    question.questionId,
                    e.target.value,
                    e.target.value === question.choices[0].optionText
                  )
                }
              />
            )}
          </div>
        ))}
        <div className="d-flex justify-content-between mt-4">
          {/* {currentQuestionIndex < quiz.questions.length - 1 && (
            <button className="btn btn-primary" onClick={handleNextQuestion}>
              Next
            </button>
          )} */}
          {/* {currentQuestionIndex === quiz.questions.length - 1 && (
            <button className="btn btn-success" onClick={handleSubmitQuiz}>
              Submit
            </button>
          )} */}
          <button className="btn btn-success" onClick={handleSubmitQuiz}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
