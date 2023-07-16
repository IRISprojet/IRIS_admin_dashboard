import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import EventDrawer from "../drawer/EventDrawer";
import CalendarServices from "../../services/CalendarServices";
import { useState, useEffect } from "react";

const EventTable = ({ events }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  const [labels, setLabels] = useState({});

  useEffect(() => {
    const fetchLabels = async () => {
      const labelIds = events.map((event) => event.extendedProps.label);
      const labels = await Promise.all(
        labelIds.map(async (id) => {
          const label = await CalendarServices.getCalendarById(id);
          return { id, label: label ? label.title : "" };
        })
      );
      const labelsObj = labels.reduce((acc, curr) => {
        acc[curr.id] = curr.label;
        return acc;
      }, {});
      setLabels(labelsObj);
    };
    fetchLabels();
  }, [events]);
  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <EventDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event._id}>
            <TableCell>
              <div className="flex items-center">
                <h2 className="text-sm">{event.title}</h2>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {new Date(event.start).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                  timeZone: "Africa/Tunis",
                })}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {new Date(event.end).toLocaleString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                  timeZone: "Africa/Tunis",
                })}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">true</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{event.extendedProps.desc}</span>
            </TableCell>
            <TableCell>
              {/* <span className="text-sm">{event.extendedProps.label}</span> */}
              <span className="text-sm">
                {/* {getLabelTitle(event.extendedProps.label)} */}
                <span className="text-sm">
                  {labels[event.extendedProps.label]}
                </span>
              </span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={event._id}
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

export default EventTable;
