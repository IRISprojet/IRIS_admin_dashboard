import React from "react";
import * as dayjs from "dayjs";
import { TableCell, TableBody, TableRow, Badge } from "@windmill/react-ui";

import MainModal from "../modal/MainModal";
//import MainDrawer from "../drawer/MainDrawer";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import EditDeleteButton from "../table/EditDeleteButton";
//import ClubDrawer from "../drawer/ClubDrawer";

const ClubTable = ({ postulers }) => {
  //const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  console.log(postulers);
  return (
    <>
     {/* <MainModal id={serviceId} /> */}
      {/* <MainDrawer>
        <ClubDrawer id={serviceId} />
      </MainDrawer> */}

      <TableBody>
        {postulers?.map((postuler) => (
          <TableRow key={postuler.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
              {postuler.internship?.title}
              </span>
            </TableCell>
           
            <TableCell>
              {" "}
              <span className="text-sm">{postuler.user?.displayName}</span>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <span className="text-sm"> {postuler.user?.email}</span>{" "}
            </TableCell>
           

          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default ClubTable;
