import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

const api = {
  signIn: (credentials) => axiosClient.post('/signIn', credentials),
  signUp: (userData) => axiosClient.post('/signUp', userData),
  logOut: (token) => axiosClient.post('/logOut', {}, { headers: { 'Authorization': `Bearer ${token}` } }),
  getUser: (token) => axiosClient.get('/getUser', { headers: { 'Authorization': `Bearer ${token}` } }),

  // Gestion des groupes
  getGroups: (token) => axiosClient.get('/manageGroupe', { headers: { 'Authorization': `Bearer ${token}` } }),
  addGroup: (groupData, token) => axiosClient.post('/manageGroupe/add', groupData, { headers: { 'Authorization': `Bearer ${token}` } }),
  updateGroup: (groupId, updatedData, token) => axiosClient.put(`/manageGroupe/update/${groupId}`, updatedData, { headers: { 'Authorization': `Bearer ${token}` } }),
  deleteGroup: (groupId, token) => axiosClient.delete(`/manageGroupe/delete/${groupId}`, { headers: { 'Authorization': `Bearer ${token}` } }),

  // Gestion des membres
  getMembers: (groupId, token) => axiosClient.get(`/manageGroupe/members/${groupId}`, { headers: { 'Authorization': `Bearer ${token}` } }),
  addMember: (memberData, token) => axiosClient.post('/manageGroupe/members/add', memberData, { headers: { 'Authorization': `Bearer ${token}` } }),
  deleteMember: (groupId, userId, token) => axiosClient.delete(`/manageGroupe/members/delete/${groupId}/${userId}`, { headers: { 'Authorization': `Bearer ${token}` } }),

  // Gestion des sessions
  getSessions: (token) => axiosClient.get('/session', { headers: { 'Authorization': `Bearer ${token}` } }),
  addSession: (sessionData, token) => axiosClient.post('/session/add', sessionData, { headers: { 'Authorization': `Bearer ${token}` } }),
  updateSession: (sessionId, updatedData) => axiosClient.put(`/session/update/${sessionId}`, updatedData),
  deleteSession: (sessionId) => axiosClient.delete(`/session/delete/${sessionId}`),

  // Gestion des émargements
  getEmargements: (token) => axiosClient.get(`/emargement`, { headers: { 'Authorization': `Bearer ${token}` } }),
  getArchiveEmargements: (token) => axiosClient.get(`/emargement/archive`, { headers: { 'Authorization': `Bearer ${token}` } }),
  sendEmargement: (token, emargementData) => axiosClient.post('/emargement/send', emargementData, { headers: { 'Authorization': `Bearer ${token}` } }),
  signEmargement: (signatureData, token) => axiosClient.post('/emargement/sign', signatureData, { headers: { 'Authorization': `Bearer ${token}` } }),
};

export default api;