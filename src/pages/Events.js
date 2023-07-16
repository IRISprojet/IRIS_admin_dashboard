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
import EventService from "../services/EventServices";
import PageTitle from "../components/Typography/PageTitle";
import { SidebarContext } from "../context/SidebarContext";
import EventTable from "../components/events/EventTable";
import MainDrawer from "../components/drawer/MainDrawer";
import EventDrawer from "../components/drawer/EventDrawer";

const Events = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(EventService.getEvents);

  const {
    searchRef,
    // setFilter,
    //setLevel,
    handleChangePage,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleSubmitForAll,
  } = useFilter(data);

  //tri date

  return (
    <>
      <PageTitle>Events</PageTitle>
      <MainDrawer>
        <EventDrawer />
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
                placeholder="Search by event title"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"></button>
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
                <TableCell>Title</TableCell>
                <TableCell>Start</TableCell>
                <TableCell>End</TableCell>
                <TableCell>allDay</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Label</TableCell>

                <TableCell className="text-right">Actions</TableCell>
              </tr>
            </TableHeader>
            <EventTable events={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="events Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="event" />
      )}
    </>
  );
};

export default Events;
