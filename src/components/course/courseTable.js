import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";

import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import CourseDrawer from "../drawer/CourseDrawer";

const CourseTable = ({ courses }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CourseDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {courses?.map((course) => (
          <TableRow key={course.id}>
            <TableCell>
              <div className="flex items-center">
                <h2 className="text-sm">{course.title}</h2>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{course.level}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{course.category.title}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{course.type}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{course.slug}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{course.duration}</span>
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={course.id}
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

export default CourseTable;
