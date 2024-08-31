import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

export default function MultipleChoiceEditor({ choices, onSave }: any) {
  const [answers, setAnswers] = useState(() =>
    choices && choices.length > 0 ? choices : [{ choiceId: Date.now(), optionText: "", correct: false }]
  );

  useEffect(() => {
    if (choices && choices.length > 0) {
      setAnswers(choices);
    }
  }, [choices]);

  const handleAnswerChange = (choiceId: any, optionText: any) => {
    const updatedAnswers = answers.map((answer: any) =>
      answer.choiceId === choiceId ? { ...answer, optionText } : answer
    );
    setAnswers(updatedAnswers);
  };

  const selectCorrectAnswer = (choiceId: any) => {
    const updatedAnswers = answers.map((answer: any) =>
      ({ ...answer, correct: answer.choiceId === choiceId })
    );
    setAnswers(updatedAnswers);
  };

  const addAnswer = () => {
    const newAnswer = {
      choiceId: Date.now(),
      optionText: "",
      correct: false
    };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
  };

  const deleteAnswer = (choiceId: any) => {
    const updatedAnswers = answers.filter((answer: any) => answer.choiceId !== choiceId);
    setAnswers(updatedAnswers);
  };

  useEffect(() => {
    if (onSave) {
      onSave(answers);
    }
  }, [answers, onSave]);

  return (
    <div>
      {answers && answers.map((answer: any) => (
        <div key={answer.choiceId} className="answer" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="radio"
            name="correctAnswer"
            checked={answer.correct}
            onChange={() => selectCorrectAnswer(answer.choiceId)}
            style={{ marginRight: '20px' }}
          />
          <input
            type="text"
            value={answer.optionText}
            onChange={(e) => handleAnswerChange(answer.choiceId, e.target.value)}
            className="form-control"
            style={{ marginRight: '20px', flexGrow: 1 }}
          />
          <FaEdit style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleAnswerChange(answer.choiceId, answer.optionText)} />
          <FaTrashAlt style={{ cursor: 'pointer' }} onClick={() => deleteAnswer(answer.choiceId)} />
        </div>
      ))}
      <div onClick={addAnswer} className="text-danger float-end">+ Add Another Answer</div><br /><br />
    </div>
  );
}
