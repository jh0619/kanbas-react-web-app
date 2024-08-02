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
      //title: assignment.title,
      //description: assignment.description,
      //points: assignment.points,
      //course: assignment.course,
      //availabilityDt: assignment.availabilityDt,
      //availabilityUntil: assignment.availabilityUntil,
      //dueDt: assignment.dueDt,
      //availability: formatDate(assignment.availabilityDt),
      //due: formatDate(assignment.dueDt),
      //};
      const newAssignment = {
        ...assignment,
        availability: formatDate(assignment.availabilityDt),
        due: formatDate(assignment.dueDt),
      };
      state.assignments = [...state.assignments, newAssignment] as any;
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
              availability: formatDate(updatedAssignment.availabilityDt),
              due: formatDate(updatedAssignment.dueDt),
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
