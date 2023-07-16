import React from 'react';
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Card,
  CardBody,
  Pagination,
} from '@windmill/react-ui';

import useAsync from '../hooks/useAsync';
import useFilter from '../hooks/useFilter';
import NotFound from '../components/table/NotFound';
import Loading from '../components/preloader/Loading';
import CommentService from '../services/CommentService';
import CommentTable from '../components/comment/CommentTable';


const Comment = () => {
  const { data, loading } = useAsync(CommentService.getAllComments);
  
  const {
    searchRef,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitForAll,
  } = useFilter(data);
 
  return (
    <>
     

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by comment title"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
           
           
           
          </form>
        </CardBody>
      </Card>

     

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                
                <TableCell>user</TableCell>
                <TableCell>time</TableCell>
                <TableCell>post</TableCell>
                

             

               
                
                
                
                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <CommentTable comments={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Comment Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Comment" />
      )}
    </>
  );
};

export default Comment;