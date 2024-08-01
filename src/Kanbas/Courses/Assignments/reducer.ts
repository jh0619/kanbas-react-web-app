import { createSlice } from "@reduxjs/toolkit";

//Function to format date
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return new Date(dateString)
    .toLocaleDateString("en-US", options)
    .replace(",", "");
};

const initialState = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      //const newAssignment = {
      //  _id: new Date().getTime().toString(),
      //  title: assignment.title,
      //  description: assignment.description,
      //  points: assignment.points,
      //  course: assignment.course,
      //  "availability-dt": assignment["availability-dt"],
      //  "availability-until": assignment["availability-until"],
      //  "due-dt": assignment["due-dt"],
      //  availability: formatDate(assignment["availability-dt"]),
      //  due: formatDate(assignment["due-dt"]),
      //};
      state.assignments = [...state.assignments, assignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === updatedAssignment._id
          ? {
              ...updatedAssignment,
              availability: formatDate(updatedAssignment["availability-dt"]),
              due: formatDate(updatedAssignment["due-dt"]),
            }
          : a
      ) as any;
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
