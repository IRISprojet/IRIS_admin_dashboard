import React, { useState } from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import PostDrawer from "../drawer/PostDrawer";
import PostServices from "../../services/PostServices";

import { FormControlLabel, Switch, Typography } from "@mui/material";
import { notifyError, notifySuccess } from "../../utils/toast";
import { Link } from "react-router-dom";
import { CiLineHeight } from "react-icons/ci";
import { AiOutlineEye } from 'react-icons/ai';


const PostTable = ({ posts }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const [data, setData] = useState(posts);

  const handleBanSwitch = (post) => {
    PostServices.approvePost(post._id)
      .then((res) => {
        setData(
          data.map((item) => {
            if (item._id === res.updatedPost._id) {
              return res.updatedPost;
            }
            return item;
          })
        );
        if (res.updatedPost.approved) {
          notifySuccess("post disapproved successfully ");
        } else {
          notifySuccess("post approved successfully ");
        }
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };
  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <PostDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {data.map((post, i) => (
          <TableRow key={i}>
            <TableCell>
              <div className="flex items-center">
                <h2 className="text-sm">{post.user.displayName}</h2>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{post.time}</span>
            </TableCell>

            {/* <TableCell>
              <div className="flex justify-end text-right">
                <FormControlLabel
                  value="top"
                  control={
                    <Switch
                      checked={post.approved ? true : false}
                      onChange={() => handleBanSwitch(post)}
                      color={post.approved ? "success" : "error"}
                    />
                  }
                  // label={
                  //   <Typography
                  //     sx={{
                  //       backgroundColor: post.approved ? `green` : `red`,
                  //       borderRadius: 4,
                  //       paddingY: 0.5,
                  //       color: "white",
                  //       width: 70,
                  //       textAlign: "center",
                  //     }}
                  //   >
                  //     {post.approved ? `true` : "false"}
                  //   </Typography>
                  // }
                  labelPlacement="top"
                />
              </div>
            </TableCell> */}

            <TableCell>
                  <Link to={`/Post/${post._id}`}>
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
                      <AiOutlineEye className="inline-block w-4 h-4 mr-2" />
                      View
                    </button>
                  </Link>
            </TableCell>

          

           
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default PostTable;
