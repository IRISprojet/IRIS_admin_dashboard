import requests from './httpService';


const PostService = {
    getAllComments() {
    return requests.get('/comment/');
  },

  getComment(id) {
    return requests.get(`/comment/${id}`);
  },

  addComment(body) {
    return requests.post('/comment', body);
  },



  updateComment(id, body) {
    return requests.put(`/comment/${id}`, body);
  },



  deleteComment(id) {
    return requests.delete(`/comment/${id}`);
  },

  getCommentsForPost(id){
    return requests.get(`/comment/getCommentsForPost/${id}`);
  }
};

export default PostService;