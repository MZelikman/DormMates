import axios from 'axios';

const API_BASE = 'http://localhost:5000/api'

export const getRoomates = () => axios.get(`${API_BASE}/roommates`);
export const addRoommate = (data) => axios.post(`${API_BASE}/roommates`, data);
export const deleteRoommate = (id) => axios.delete(`${API_BASE}/roommates/${id}`);

export const getChores = () => axios.get(`${API_BASE}/chores`);
export const addChore = (data) => axios.post(`${API_BASE}/chores`, data);
export const completeChore = (id) => axios.post(`${API_BASE}/chores/${id}/complete`);
export const deleteChore = (id) => axios.delete(`${API_BASE}/chores/${id}`);