import { useCallback, useState } from "react";
import flightService from "../../services/flight.service";
import useErrorHandler from "../useErrorHandler";
import { Departures, Filter, PageData, Sort } from "../../assets/Data";
import { arrDepDataParser } from "../../utils/data-parser";
import { AxiosResponse } from "axios";

interface getDeparturesParams {
  page?: number;
  limit?: number;
  filter?: Filter[];
  sort?: Sort;
  setPageData?: React.Dispatch<React.SetStateAction<PageData>>;
  searchTerm?: string;
}

const useGetFlight = () => {
  const { handleError } = useErrorHandler();
  const [flightIds, setFlightIds] = useState<string[]>([]);
  const [departureData, setDepartureData] = useState<Departures[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDepartures = useCallback(
    ({
      filter,
      sort,
      page = 1,
      limit = 5,
      setPageData,
      searchTerm,
    }: getDeparturesParams) => {
      if (searchTerm && searchTerm.length > 0) {
        flightService
          .getByTerm({
            page,
            limit,
            filter: filter,
            sort: sort,
            searchTerm: searchTerm,
          })
          .then((response) => {
            if (response.status === 200) {
              const departures = response.data.data;

              if (departures.length > 0) {
                const parsedData = arrDepDataParser(departures);
                setDepartureData(parsedData);
                if (setPageData) {
                  setPageData(response.data.meta);
                }
              } else {
                setDepartureData([]);
              }
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setDepartureData([]);
            }
            handleError({ error });
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        flightService
          .getAll({ page, limit, filter: filter, sort: sort, isarrdep: true })
          .then((response) => {
            if (response.status === 200) {
              const departures = response.data.data;

              if (departures.length > 0) {
                const parsedData = arrDepDataParser(departures);
                setDepartureData(parsedData);
                if (setPageData) {
                  setPageData(response.data.meta);
                }
              } else {
                setDepartureData([]);
              }
            }
          })
          .catch((error) => {
            if (error.response.status === 404) {
              setDepartureData([]);
            }
            handleError({ error });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [handleError]
  );

  const getFlightIds = useCallback(() => {
    flightService
      .getData("id")
      .then((response) => {
        if (response.status === 200) {
          setFlightIds(response.data.data);
        }
      })
      .catch((error) => {
        handleError({ error });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [handleError]);

  const getData = useCallback(
    (column: string) =>
      new Promise<AxiosResponse>((resolve, reject) => {
        flightService
          .getData(column)
          .then((response) => {
            if (response.status === 200) {
              resolve(response);
            }
          })
          .catch((error) => {
            reject(error);
            handleError({ error });
          })
          .finally(() => {
            setIsLoading(false);
          });
      }),
    [handleError]
  );

  return {
    departureData,
    flightIds,
    getData,
    getDepartures,
    getFlightIds,
    isLoading,
  };
};

export default useGetFlight;
