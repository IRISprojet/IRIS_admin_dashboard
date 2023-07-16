import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
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
import CourseServices from "../services/CourseServices";
import PageTitle from "../components/Typography/PageTitle";
import { SidebarContext } from "../context/SidebarContext";
import CourseTable from "../components/course/courseTable";
import SelectCategory from "../components/form/SelectCategory";
import MainDrawer from "../components/drawer/MainDrawer";
import CourseDrawer from "../components/drawer/CourseDrawer";

const Courses = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(CourseServices.getAllCourses);

  const {
    searchRef,
    setFilter,
    setLevel,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitForAll,
  } = useFilter(data);

  return (
    <>
      <PageTitle>internship</PageTitle>
      <MainDrawer>
        <CourseDrawer />
      </MainDrawer>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex">
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search by course title"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"></button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <SelectCategory setFilter={setFilter} />
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={(e) => setLevel(parseInt(e.target.value))}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white">
                <option value="All" defaultValue hidden>
                  level
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Select>
            </div>
            <div className="w-full md:w-56 lg:w-56 xl:w-56">
              <Button onClick={toggleDrawer} className="w-full rounded-md h-12">
                <span className="mr-3">
                  <FiPlus />
                </span>
                Add new internship
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
                <TableCell>title</TableCell>
                <TableCell>level</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>type</TableCell>
                <TableCell>slug</TableCell>

                <TableCell>duration</TableCell>

                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <CourseTable courses={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="course Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="internship" />
      )}
    </>
  );
};

export default Courses;
