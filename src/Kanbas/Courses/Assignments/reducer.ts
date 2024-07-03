import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../Database";

const initialState = {
  assignments: dbAssignments,
};

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

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        description: assignment.description,
        points: assignment.points,
        course: assignment.course,
        "availability-dt": assignment["availability-dt"],
        "availability-until": assignment["availability-until"],
        "due-dt": assignment["due-dt"],
        availability: formatDate(assignment["availability-dt"]),
        due: formatDate(assignment["due-dt"]),
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === updatedAssignment._id
          ? {
              ...updatedAssignment,
              availability: formatDate(updatedAssignment["availability-dt"]),
              due: formatDate(updatedAssignment["due-dt"]),
            }
          : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
