import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
  draftQuiz: { questions: [] } //essential for question editor, don't remove or edit
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: quiz._id,
        title: quiz.title,
        dueDate: quiz.dueDate,
        points: quiz.points,
        questions: [],
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      console.log("Received update:", quiz);
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, editing: true } : q
      ) as any;
    },

    //Actions for managing draft quiz, essential for question editor
    setDraftQuiz: (state, { payload: quiz }) => {
      state.draftQuiz = quiz;
    },
    updateDraftQuiz: (state, { payload: quizDetails }) => {
      console.log("Received draft update:", quizDetails);
      state.draftQuiz = { ...state.draftQuiz, ...quizDetails };
    },
    clearDraftQuiz: (state) => {
      state.draftQuiz = { questions: [] };
    }

  },
});
export const { addQuiz, deleteQuiz, updateQuiz, editQuiz, setQuizzes, setDraftQuiz, updateDraftQuiz, clearDraftQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
