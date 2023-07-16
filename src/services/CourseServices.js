import requests from './httpService';

const CoursesServices = {
  getAllCourses() {
    return requests.get('/course/' );
  },

  getStockOutCourses() {
    return requests.get('/course/');
  },

  getCoursetById(id) {
    return requests.get(`/course/${id}`);
  },

  addCourse(body) {
    return requests.post('/course/', body);
  },

  addAllCourses(body) {
    return requests.post('/course/', body);
  },

  updateCourse(id, body) {
    return requests.put(`/course/${id}`, body);
  },

  updateStatus(id, body) {
    return requests.put(`/course/status/${id}`, body);
  },

  deleteCourse(id) {
    return requests.delete(`/course/${id}`);
  },
};

export default CoursesServices;
