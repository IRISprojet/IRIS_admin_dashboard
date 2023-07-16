import React from "react";
import { TableBody, TableRow, TableCell } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import ShowHideButton from "../table/ShowHideButton";
import CategoryDrawer from "../drawer/CategoryDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";

const CategoryTable = ({ categories }) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  return (
    <>
      <MainModal id={serviceId} />
      <MainDrawer>
        <CategoryDrawer id={serviceId}/>
      </MainDrawer>

      <TableBody>
        {categories?.map((parent) => (
          <TableRow key={parent._id}>
            <TableCell className="font-semibold uppercase text-xs">
              {parent._id.substring(20, 24)}
            </TableCell>
            <TableCell className="text-sm ">{parent.id}</TableCell>
            <TableCell className="text-sm">{parent.title}</TableCell>

            <TableCell className="text-sm">{parent.slug}</TableCell>
            <TableCell>
              <ShowHideButton id={parent._id} status={parent.status} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={parent._id}
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

export default CategoryTable;
