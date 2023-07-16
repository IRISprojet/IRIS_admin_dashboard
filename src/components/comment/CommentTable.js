import React from 'react';


import {
  TableCell,
  TableBody,
  TableRow,
} from '@windmill/react-ui';

import EditDeleteButton from '../table/EditDeleteButton';
import useToggleDrawer from '../../hooks/useToggleDrawer';
import MainModal from '../modal/MainModal';


const CommentTable = ({ comments }) => {
  const {serviceId,  handleModalOpen, handleUpdate } = useToggleDrawer();
 return (
    <> 
     <MainModal id={serviceId} />
     
      <TableBody>
         {comments.map((comment,i) => (
          <TableRow key={i}>
             
            <TableCell>
              <div className="flex items-center">
                  <h2 className="text-sm">{comment.user}</h2>

              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{comment.time}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm" >{comment.post}</span>
            </TableCell> 
           
            
          
            
            <TableCell>
              <EditDeleteButton
                id={comment._id}
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

export default CommentTable;