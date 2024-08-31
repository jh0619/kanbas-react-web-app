import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RichTextEditor from "./RichTextEditor";
import { useParams } from "react-router-dom";
import MultipleChoiceEditor from "./MultipleChoiceEditor";
import { useNavigate } from "react-router-dom";
import { updateQuiz, updateDraftQuiz } from "./reducer";

export default function QuestionEditor() {
  const { cid, qid, questionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNew = qid === "new";

  const quiz = useSelector((state: any) => {
    console.log("initialQuiz:", state.quizzes.quizzes);
    return isNew
      ? state.quizzes.draftQuiz
      : state.quizzes.quizzes.find((quiz: any) => quiz._id === qid);
  });
  console.log("quiz: ", quiz);
  const question = quiz.questions.find(
    (q: any) => q.questionId === Number(questionId)
  );
  const [localQuestionData, setLocalQuestionData] = useState(question);

  const updateQuestion = () => {
    const updatedQuestions = quiz.questions.map((q: any) => {
      if (q.questionId === Number(questionId)) {
        return { ...q, ...localQuestionData };
      }
      return q;
    });
    const updateData = {
      ...quiz,
      questions: updatedQuestions,
    };
    if (isNew) {
      dispatch(updateDraftQuiz(updateData));
    } else {
      dispatch(updateQuiz(updateData));
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`, {
      state: { activeTab: "questions" },
    });
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`, {
      state: { activeTab: "questions" },
    });
  };

  return (
    <div
      className="question-form-container"
      style={{
        padding: "20px",
        maxWidth: "600px",
        border: "1px solid #ccc",
        marginLeft: "200px",
        marginTop: "20px",
      }}
    >
      <div>
        <RichTextEditor
          question={localQuestionData}
          onSave={(updatedQuestion: any) =>
            setLocalQuestionData((prev: any) => ({
              ...prev,
              ...updatedQuestion,
            }))
          }
        />
        <MultipleChoiceEditor
          choices={localQuestionData.choices}
          onSave={(updatedChoices: any) =>
            setLocalQuestionData((prev: any) => ({
              ...prev,
              choices: updatedChoices,
            }))
          }
        />
      </div>
      <button className="btn me-3 btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn btn-danger" onClick={updateQuestion}>
        Update Question
      </button>
    </div>
  );
}
