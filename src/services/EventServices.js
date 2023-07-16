import requests from "./httpService";

const EventServices = {
  getEvents() {
    return requests.get("/calendar/events");
  },

  addEvent(body) {
    return requests.post("/calendar/event", body);
  },

  updateEvent(id, body) {
    return requests.put(`/calendar/event/${id}`, body);
  },

  deleteEvent(id) {
    return requests.delete(`/calendar/event/${id}`);
  },
  getEventById(id) {
    return requests.get(`/calendar/event/${id}`);
  },
};

export default EventServices;
