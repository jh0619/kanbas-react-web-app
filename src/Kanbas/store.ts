import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    assignments: assignmentReducer,
  },
});
export default store;
