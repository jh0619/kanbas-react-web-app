import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};
export const createCourse = async (facultyId: string, course: any) => {
  try {
    const response = await axios.post(`${COURSES_API}/${facultyId}`, course);
    return response.data;
  } catch (error) {
    console.error("Error creating course: ", error);
    throw error;
  }
};
export const deleteCourse = async (id: string) => {
  const response = await axios.delete(`${COURSES_API}/${id}`);
  return response.data;
};
export const updateCourse = async (course: any) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};
export const fetchCoursesByFaculty = async (facultyId: string) => {
  try {
    const response = await axios.get(`${COURSES_API}/faculty/${facultyId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching courses by faculty:", error);
    throw error;
  }
};
