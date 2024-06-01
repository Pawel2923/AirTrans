import { useEffect, useRef, useState } from "react";
import DeparturesTable from "../components/DeparturesTable";
import Nav from "../components/Nav";
import useGetFlight from "../hooks/flight/useGetFlight";
import { useSearchParams } from "react-router-dom";
import { Filter, PageData, Sort } from "../assets/Data";
import Pagination from "../components/Pagination";
import Footer from "../components/footer";
import classes from "./FlightSchedule.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import FlightsFilter from "../components/FlightsFilter";
import FlightsSort from "../components/FlightsSort";

const FlightSchedule = () => {
  const [searchParams] = useSearchParams();
  const searchInput = useRef<HTMLInputElement>(null);
  const { isLoading, departureData, getDepartures } = useGetFlight();
  const [pageData, setPageData] = useState<PageData>({
    page: parseInt(searchParams.get("page") || "1"),
    pages: 1,
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<Filter[]>([]);
  const [sortData, setSortData] = useState<Sort>();

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
    });
  }, [filterData, sortData, getDepartures, pageData.page]);

  return (
    <>
      <Nav />
      <div className={classes["schedule-nav"]}>
        <div className={classes.left}>
          <button
            className="btn btn-primary"
            onClick={() => setIsFilterModalOpen(true)}
          >
            Filtruj
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setIsSortModalOpen(true)}
          >
            Sortuj
          </button>
        </div>
        <div className={classes.right}>
          <input
            ref={searchInput}
            type="search"
            name="flight-search"
            placeholder="Wyszukiwanie"
          />
          <FontAwesomeIcon
            icon={faSearch}
            onClick={() => searchInput.current?.focus()}
          />
        </div>
      </div>
      <main className="px-5 mb-5">
        <h1 className="display-5 text-center my-5">HARMONOGRAM LOTÓW</h1>
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
