import requests from './httpService';

const CoursesServices = {
  getAllCourses() {
    return requests.get('/Internship/' );
  },

  getStockOutCourses() {
    return requests.get('/Internship/');
  },

  getCoursetById(id) {
    return requests.get(`/Internship/${id}`);
  },

  addCourse(body) {
    return requests.post('/Internship/', body);
  },

  addAllCourses(body) {
    return requests.post('/Internship/', body);
  },

  updateCourse(id, body) {
    return requests.put(`/Internship/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/Internship/status/${id}`, body);
  },

  deleteCourse(id) {
    return requests.delete(`/Internship/${id}`);
  },
};

export default CoursesServices;
