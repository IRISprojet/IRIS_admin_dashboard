import requests from "./httpService";

const ClubServices = {
  addClub(body) {
    return requests.post("/club", body);
  },
  getAllClubs() {
    return requests.get("/club");
  },
  getClubById(id) {
    return requests.get(`/club/${id}`);
  },
  updateClub(id, body) {
    return requests.put(`/club/${id}`, body);
  },
  deleteClub(id) {
    return requests.delete(`/club/${id}`);
  },
};

export default ClubServices;
