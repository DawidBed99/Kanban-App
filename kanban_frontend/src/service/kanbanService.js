import axios from "axios";

const BASE_URL = "http://localhost:8080/boards";
const TASK_COLUMN_URL = "http://localhost:8080/tasksColumns";
const TASK_URL = "http://localhost:8080/tasks";

class kanbanService {
  saveBoard(data) {
    return axios.post(`${BASE_URL}`, data);
  }
  async editBoard(id, data) {
    console.log(data);
    console.log("tutaj");
    const response = await axios.put(`${BASE_URL}/${id}`, data);

    return response;
  }
  async getSingleBoard(id) {
    const response = await axios.get(`${BASE_URL}/spec/${id}`);
    return response;
  }
  deleteBoard(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
  saveTaskColumn(data) {
    return axios.post(`${TASK_COLUMN_URL}`, data);
  }
  editTaskColumn(id, data) {
    return axios.put(`${TASK_COLUMN_URL}/${id}`, data);
  }
  deleteTaskColumn(id) {
    return axios.delete(`${TASK_COLUMN_URL}/${id}`);
  }
  saveTask(data) {
    console.log(data);
    return axios.post(`${TASK_URL}`, data);
  }
  async editTaskName(id, data) {
    const response = await axios.put(`${TASK_URL}/${id}`, data);
    return response;
  }
  async editTaskDesc(id, data) {
    const response = await axios.put(`${TASK_URL}/updateDesc/${id}`, data);
    return response;
  }
  async editTaskColumnForTask(id, data) {
    const response = await axios.put(
      `${TASK_URL}/updateTaskColumnForTask/${id}`,
      data
    );
    return response;
  }
  async deleteTask(id) {
    const response = await axios.delete(`${TASK_URL}/${id}`);
    console.log(response);
    return response;
  }
  async getNameOfTaskColumn(id) {
    const response = await axios.get(`${TASK_URL}/tasksColumnName/${id}`);
    return response;
  }
}
export default new kanbanService();
