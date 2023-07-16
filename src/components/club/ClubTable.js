import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow, Badge } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
import ClubDrawer from "../drawer/ClubDrawer";

const ClubTable = ({ clubs }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <ClubDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {clubs.map((club, i) => (
          <TableRow key={i + 1}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                {club.id.substring(20, 24)}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(club.createdAt).format("MMM D, YYYY")}
              </span>
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm"> {club.name}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm"> {club.email}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm font-semibold">
                {" "}
                {club.budget}TND
              </span>{" "}
            </TableCell>

            <TableCell className="align-middle ">
              {dayjs().isAfter(dayjs(club.endTime)) ? (
                <Badge type="danger">Expired</Badge>
              ) : (
                <Badge type="success">Active</Badge>
              )}
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={club.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ClubTable;
