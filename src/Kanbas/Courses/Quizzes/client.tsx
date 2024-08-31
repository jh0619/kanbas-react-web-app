import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  console.log("Created new quiz: ", response);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

//Note: for saveAndPublishQuiz
export const saveAndPublishQuiz = async (quizId: string) => {
  const response = await axios.put(`${QUIZZES_API}/${quizId}/publish`);
  return response.data;
};

export const findQuizById = async (quizId: string) => {
  try {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz by ID:", error);
    throw error;
  }
};

// find quiz result
export const findQuizResultForUserAndQuiz = async (userId: string, quizId: string) => {
  const response = await axios.get(`${REMOTE_SERVER}/api/users/${userId}/quizzes/${quizId}/result`);
  return response.data;
};

// create or update the quiz result
export const saveQuizResult = async (userId: string, quizId: string, result: any) => {
  const response = await axios.post(`${REMOTE_SERVER}/api/quizResults`, {
    userId,
    quizId,
    ...result,
  });
  return response.data;
};

