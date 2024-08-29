import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollStudent = async (studentId: string, courseId: string) => {
  const response = await axios.post(ENROLLMENTS_API, {
    student: studentId,
    course: courseId,
  });
  return response.data;
};

export const unenrollStudent = async (studentId: string, courseId: string) => {
  const response = await axios.delete(
    `${ENROLLMENTS_API}/${studentId}/${courseId}`
  );
  return response.data;
};

export const fetchEnrollmentsByStudent = async (studentId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/${studentId}`);
  return response.data;
};

export const fetchStudentsByCourse = async (courseId: string) => {
  const response = await axios.get(`${ENROLLMENTS_API}/course/${courseId}`);
  return response.data;
};
