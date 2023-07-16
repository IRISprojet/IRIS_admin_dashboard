import requests from "./httpService";

const CalendarServices = {
  addCalendar(body) {
    return requests.post("/admin/calendar/calendar", body);
  },
  getAllCalendars() {
    return requests.get("/admin/calendar/calendars");
  },
  getCalendarById(id) {
    return requests.get(`/admin/calendar/calendar/${id}`);
  },
  updateCalendar(id, body) {
    return requests.put(`/admin/calendar/calendar/${id}`, body);
  },
  deleteCalendar(id) {
    return requests.delete(`/admin/calendar/calendar/${id}`);
  },
};

export default CalendarServices;
