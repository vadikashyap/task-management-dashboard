import axios from "axios";
import { Task } from "../store/modules/task/types";

const API_URL = process.env.REACT_APP_API_URL;

export const taskApi = {
  fetchTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data;
  },

  createTask: async (task: Omit<Task, "id">): Promise<Task> => {
    const response = await axios.post(`${API_URL}/tasks`, task);
    return response.data;
  },

  updateTask: async (task: Task): Promise<Task> => {
    const response = await axios.put(`${API_URL}/tasks/${task.id}`, task);
    return response.data;
  },

  deleteTask: async (taskId: string): Promise<void> => {
    await axios.delete(`${API_URL}/tasks/${taskId}`);
  },
};
