import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PreviewResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, quiz, cid } = location.state;

  if (!result || !quiz) {
    return <div>No data available</div>;
  }

  const handleClose = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/details`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>Quiz Preview Result</h1>
        <button className="btn btn-danger" onClick={handleClose}>
          ❌ Close
        </button>
      </div>
      <hr />
      <p>Score: {result.totalScore} / {quiz.totalPoints}</p>
      {result.answers.map((answer: any, index: number) => {
        const question = quiz.questions.find((q: any) => q.questionId === answer.questionId);
        if (!question) return null;

        return (
          <div key={index} className="card mb-4 p-4">
            <h2>{`Question ${index + 1}: ${question.questionTitle}`}</h2>
            <h5>{question.question}</h5>
            <div className="mb-2">
              {question.questionType === "Multiple Choice" && (
                <div>
                {question.choices.map((choice: any, idx: number) => (
                  <div key={idx} className="d-flex align-items-center mb-2">
                    <div>
                      <input
                        type="radio"
                        className="form-check-input"
                        checked={answer.answer === choice.optionText}
                        disabled
                      />
                      <label className="ml-2">
                        {choice.optionText}
                      </label>
                      {answer.isCorrect && answer.answer === choice.optionText && (
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
                      {!answer.isCorrect && answer.answer === choice.optionText && (
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
                      {answer.answer !== choice.optionText && choice.correct && (
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
                    <div key={idx} className="d-flex align-items-center mb-2">
                    <div>
                      <input
                        type="radio"
                        className="form-check-input"
                        checked={answer.answer === choice.optionText}
                        disabled
                      />
                      <label className="ml-2">
                        {choice.optionText}
                      </label>
                      {answer.isCorrect && answer.answer === choice.optionText && (
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
                      {!answer.isCorrect && answer.answer === choice.optionText && (
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
                      {answer.answer !== choice.optionText && choice.correct && (
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
                    {answer.isCorrect && (
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
                      {!answer.isCorrect && (
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
                    {!answer.isCorrect && (
                      <div className="ml-2 text-danger">
                        <b>Correct Answer: {question.choices[0].optionText}</b>
                      </div>
                    )}
                  </p>
                </div>
              )}
            </div>
            <p>(Points: {answer.isCorrect ? question.points : 0} / {question.points})</p>
          </div>
        );
      })}
    </div>
  );
}