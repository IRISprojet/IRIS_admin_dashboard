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
import ClubService from "../services/ClubServices";
import { SidebarContext } from "../context/SidebarContext";
import ClubTable from "../components/club/ClubTable";
import PageTitle from "../components/Typography/PageTitle";
//import MainDrawer from "../components/drawer/MainDrawer";
//import ClubDrawer from "../components/drawer/ClubDrawer";

const Clubs = () => {
  const { toggleDrawer } = useContext(SidebarContext);
  const { data, loading } = useAsync(ClubService.getClubById);

  const {
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
  } = useFilter(data);
  console.log(data);
  return (
    <>
      <PageTitle>applied internships</PageTitle>

      {loading ? (
        <Loading loading={loading} />
      ) : serviceData.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
              </tr>
            </TableHeader>
            <ClubTable postulers={dataTable} />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="applied internships" />
      )}
    </>
  );
};

export default Clubs;
