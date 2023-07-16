import React, { useState } from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow, Avatar } from "@windmill/react-ui";
import AdminServices from "../../services/AdminServices";
import { FormControlLabel, Switch, Typography } from "@mui/material";
import { notifyError, notifySuccess } from "../../utils/toast";

const CustomerTable = ({ customers }) => {
  const [bannedUsers, setBannedUsers] = useState(
    customers.filter((user) => user.isBanned).map((user) => user._id)
  );

  const handleBanSwitch = (id) => {
    const isBanned = bannedUsers.includes(id);
    AdminServices.changeBanStatus(id)
      .then((res) => {
        if (isBanned) {
          setBannedUsers(bannedUsers.filter((userId) => userId !== id));
          notifySuccess("User unbanned successfully");
        } else {
          setBannedUsers([...bannedUsers, id]);
          notifySuccess("User banned successfully");
        }
      })
      .catch((err) => {
        notifyError(err.message);
      });
  };

  return (
    <>
      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user._id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {" "}
                {user._id.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(user.createdAt).format("MMM D, YYYY")}
              </span>
            </TableCell>
            <TableCell>
            <Avatar
              className="hidden mr-3 md:block bg-gray-50"
              src={user.profilePicture}
              style={{ width: '80px', height: '80px' }}
            />
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                  <h2 className="text-sm font-medium">{user.displayName}</h2>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.email}</span>{" "}
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{user.phone}</span>
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <FormControlLabel
                  value="top"
                  control={
                    <Switch
                      checked={bannedUsers.includes(user._id) ? true : false}
                      onChange={() => handleBanSwitch(user._id)}
                      color={
                        bannedUsers.includes(user._id) ? "error" : "success"
                      }
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        backgroundColor: bannedUsers.includes(user._id)
                          ? `red`
                          : `green`,
                        borderRadius:4,
                        paddingY: 0.5,
                        color: "white",
                        width: 70,
                        textAlign: "center",         
                      }}
                    >
                      {bannedUsers.includes(user._id) ? `Banned` : `Active`}
                    </Typography>
                  }
                  labelPlacement="top"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;
