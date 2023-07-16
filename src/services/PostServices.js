import axios from "axios";
import requests from "./httpService";

const PostService = {
  getAllPosts() {
    return requests.get("/post");
  },

  getPost(id) {
    return requests.get(`/post/${id}`);
  },

  addPost(body) {
    return requests.post("/post", body);
  },

  updatePost(id, body) {
    return requests.put(`/post/${id}`, body);
  },

  deletePost(id) {
    return requests.delete(`/post/${id}`);
  },

  approvePost(id) {
    return requests.put(`/post/approved/${id}`);
  },
};

export default PostService;
