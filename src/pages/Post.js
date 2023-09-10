import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { FiPlus } from "react-icons/fi";

import useAsync from "../hooks/useAsync";
import useFilter from "../hooks/useFilter";
import NotFound from "../components/table/NotFound";
import Loading from "../components/preloader/Loading";
import PostServices from "../services/PostServices";
import { SidebarContext } from "../context/SidebarContext";
import PostTable from "../components/Post/PostTable";
import MainDrawer from "../components/drawer/MainDrawer";
import PostDrawer from "../components/drawer/PostDrawer";

const Post = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(PostServices.getAllPosts);

  const {
    searchRef1,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitForAll1,
  } = useFilter(data);

  return (
    <>
      <MainDrawer>
        <PostDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll1}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef1}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by user"
              />
              <button type="submit" className="absolute right-0 top-0 mt-5 mr-1"></button>
            </div>

            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add Event
              </Button>
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
                {/* <TableCell>likes</TableCell> */}

                {/* <TableCell>approved</TableCell> */}
                <TableCell>details</TableCell>
              </tr>
            </TableHeader>npm start 
            
            <PostTable posts={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Post Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Post" />
      )}
    </>
  );
};

export default Post;
