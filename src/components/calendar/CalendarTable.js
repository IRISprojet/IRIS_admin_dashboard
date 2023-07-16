import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import CalendarDrawer from "../drawer/CalendarDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";

const CalendarTable = ({ calendars }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CalendarDrawer key={serviceId} id={serviceId} />
      </MainDrawer>

      <TableBody>
        {calendars.map((calendar) => (
          <TableRow key={calendar.id}>
            <TableCell>
              <span className="text-sm"> {calendar.title}</span>
            </TableCell>
            <TableCell>
              <span
                className="text-sm p-2"
                style={{
                  backgroundColor: calendar.color,
                  borderRadius: "5px",
                }}
              >
                {calendar.color}
              </span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={calendar.id}
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

export default CalendarTable;
