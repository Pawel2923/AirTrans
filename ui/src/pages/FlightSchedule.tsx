import { useEffect, useState } from "react";
import DeparturesTable from "../components/DeparturesTable";
import Nav from "../components/Nav/Nav";
import useGetFlight from "../hooks/flight/useGetFlight";
import { useSearchParams } from "react-router-dom";
import { Filter, PageData, Sort } from "../assets/Data";
import Pagination from "../components/Pagination";
import Footer from "../components/footer";
import FlightsFilter from "../components/FlightsFilter";
import FlightsSort from "../components/FlightsSort";
import ScheduleOptions from "../components/ScheduleOptions";

const FlightSchedule = () => {
  const [searchParams] = useSearchParams();
  const { isLoading, departureData, getDepartures } = useGetFlight();
  const [pageData, setPageData] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<Filter[]>([]);
  const [sortData, setSortData] = useState<Sort>();
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    if (sessionStorage.getItem("filterData")) {
      setFilterData(JSON.parse(sessionStorage.getItem("filterData")!));
    }
  }, []);

  useEffect(() => {
    getDepartures({
      page: pageData.page,
      limit: 5,
      setPageData,
      filter: filterData.length ? filterData : undefined,
      sort: sortData,
      searchTerm: searchValue,
    });
  }, [filterData, sortData, searchValue, getDepartures, pageData.page]);

  return (
    <>
      <Nav />
      <ScheduleOptions
        searchValue={searchValue}
        setIsFilterModalOpen={setIsFilterModalOpen}
        setIsSortModalOpen={setIsSortModalOpen}
        setSearchValue={setSearchValue}
      />
      <main className="container mb-5">
        <div className="row text-center my-3 my-md-5">
          <h1 className="display-5">HARMONOGRAM LOTÓW</h1>
        </div>
        <div className="row">
          <DeparturesTable
            isExtended={true}
            data={departureData}
            isLoading={isLoading}
          />
          {pageData.pages > 1 && (
            <Pagination
              pageData={pageData}
              setPageData={setPageData}
              className="mt-3"
            />
          )}
        </div>
      </main>
      {isFilterModalOpen && (
        <FlightsFilter
          setFilterData={setFilterData}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />
      )}
      {isSortModalOpen && (
        <FlightsSort
          setSortData={setSortData}
          setIsSortModalOpen={setIsSortModalOpen}
        />
      )}
      <Footer className="mt-auto" />
    </>
  );
};

export default FlightSchedule;
