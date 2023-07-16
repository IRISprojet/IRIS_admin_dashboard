import React from "react";
import { useState, useEffect } from "react";

import { useParams } from "react-router";

import useAsync from "../hooks/useAsync";
import Loading from "../components/preloader/Loading";
import PageTitle from "../components/Typography/PageTitle";
import PostServices from "../services/PostServices";
import CommentService from "../services/CommentService";
import PostService from "../services/PostServices";
import CardContent from "@mui/material/CardContent";


import { Link } from "react-router-dom";
import { BiHeart } from "react-icons/bi";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

const PostDetails = () => {
  const { id } = useParams();
  const { data, loading } = useAsync(() => PostServices.getPost(id));
  const [showComments, setShowComments] = useState(false);
  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  const [test, setTest] = useState([]);

  useEffect(() => {
    setTest(data);
  }, [data]);

  const deleteResource = async (id, idPost) => {
    const commentId = typeof id === "object" ? id.toString() : id;

    try {
      await CommentService.deleteComment(id);

      // Remove the comment from the data array
      const newData = { ...test };
      if (newData._id === idPost) {
        newData.comments = newData.comments.filter(
          (comment) => comment._id !== commentId
        );
      }

      // Update the state with the updated data array
      setTest(newData);
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (id) => {

    try {
      await PostService.deletePost(id);

      window.location.replace('http://localhost:3001/Post');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageTitle>Post Details</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
          <div className="flex flex-col lg:flex-row md:flex-row w-full overflow-hidden">
            <div className="w-full flex flex-col p-5 md:p-8 text-left">
              <div className="mb-4">
                <div className="text-green-900 border rounded-md p-3 bg-white bg-opacity-25 shadow-md">
                  <p>
                    <CardHeader
                      className="px-32 pt-24"
                      avatar={
                        <Avatar
                          aria-label="Recipe"
                          src={test.user.profilePicture}
                        />
                      }
                      title={
                        <span className="flex items-center space-x-8">
                          <Typography className="font-normal" paragraph={false}>
                            {test.user.displayName}
                          </Typography>
                        </span>
                      }
                      subheader={new Date(test.time).toLocaleString([], {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    />
                    {test.message}
                    <span className="float-right">
                      <BiHeart className="h-5 w-5 text-red-500 inline-block mr-1" />
                      <span>{test.likes.length}</span>
                    </span>
                    <span>
                    {test.type === "video" && test.media && (
                  <div>
                    <video width="640" height="360" controls>
                      <source src={`${test.media.preview}`} type="video/mp4" />
                    </video>
                  </div>
                )}

                {test.type === "image" && test.media && (
                  <div>
                    <img src={`${test.media.preview}`} alt="post" />
                  </div>
                )}
                </span>

                   
                  </p>
                </div>
             
              </div>
              <CardContent>
            

              <button
                            className="text-green-500 hover:text-green-600 flex items-center mr-2 ml-auto"
                            onClick={() =>
                              deletePost( test._id)
                            }>
                            <svg
                              className="w-5 h-5 heroicon-s-outline trash mr-1"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                d="M5 5a1 1 0 011-1h8a1 1 0 011 1v1h2a1 1 0 110 2H3a1 1 0 110-2h2V5zm2 2v8a1 1 0 001 1h4a1 1 0 001-1V7h2a1 1 0 010 2H8a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                            </svg>
                            Delete
                          </button>
                          </CardContent>
                          
              <div className="flex flex-col mt-4">
                <div className="font-serif font-semibold py-1 text-green-500 text-sm">
                  <button
                    className="border border-green-300 rounded-lg px-3 py-1 text-green-700 dark:text-green-400"
                    onClick={handleShowComments}>
                    Comments
                  </button>{" "}
                  {showComments &&
                    test.comments.map((comment, i) => (
                      <div key={i} className="bg-green-100 p-4 rounded-lg my-4">
                        <div className="flex items-center mb-2">
                          <CardHeader
                            className="px-32 pt-24"
                            avatar={
                              <Avatar
                                aria-label="Recipe"
                                src={comment.user.profilePicture}
                              />
                            }
                            title={
                              <span className="flex items-center space-x-8">
                                <Typography
                                  className="font-normal"
                                  paragraph={false}>
                                  {comment.user.displayName}
                                </Typography>
                              </span>
                            }
                            subheader={new Date(comment.time).toLocaleString(
                              [],
                              {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          />{" "}
                        </div>
                        <p className="text-green-900">{comment.message}</p>
                        
                        <div className="flex items-center mt-2">
                          <button
                            className="text-green-500 hover:text-green-600 flex items-center mr-2 ml-auto"
                            onClick={() =>
                              deleteResource(comment._id, test._id)
                            }>
                            <svg
                              className="w-5 h-5 heroicon-s-outline trash mr-1"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                d="M5 5a1 1 0 011-1h8a1 1 0 011 1v1h2a1 1 0 110 2H3a1 1 0 110-2h2V5zm2 2v8a1 1 0 001 1h4a1 1 0 001-1V7h2a1 1 0 010 2H8a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                            </svg>
                            Delete
                          </button>
                          {/* <button className="text-green-500 hover:text-blue-600 flex items-center">
                        <svg className="w-5 h-5 heroicon-s-outline eye mr-1" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 4.5A5.5 5.5 0 005.5 10 5.5 5.5 0 0010 15.5 5.5 5.5 0 0014.5 10 5.5 5.5 0 0010 4.5zM8 10a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd"></path>
                        </svg>
                        <Link to={`/Comment`}>
                        Details</Link>
                      </button> */}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
