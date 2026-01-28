import { useEffect, useState } from "react";
import ConfirmModal from "../components/Modals/ConfirmModal";
import { Sort } from "../assets/Data";

interface FlightsFilterProps {
  setSortData: React.Dispatch<React.SetStateAction<Sort | undefined>>;
  setIsSortModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FlightsSort = ({
  setSortData,
  setIsSortModalOpen,
}: FlightsFilterProps) => {
  const [sortBy, setSortBy] = useState<string[]>([""]);
  const [sortOrder, setSortOrder] = useState<string>("");

  useEffect(() => {
    const sortData = sessionStorage.getItem("sortData");
    if (sortData) {
      const { sortBy, sortOrder } = JSON.parse(sortData);
      setSortBy(sortBy);
      setSortOrder(sortOrder);
    }
  }, []);

  const confirmHandler = () => {
    setIsSortModalOpen(false);

    setSortData({
      by: sortBy,
      order: sortOrder,
    });

    sessionStorage.setItem("sortData", JSON.stringify({ sortBy, sortOrder }));
  };

  const clearFilterHandler = () => {
    setSortBy([""]);
    setSortOrder("");

    sessionStorage.removeItem("sortData");
    setSortData(undefined);
    setIsSortModalOpen(false);
  };

  return (
    <ConfirmModal
      onClose={() => setIsSortModalOpen(false)}
      onConfirm={confirmHandler}
      title="Sortuj loty"
      children={
        <div>
          <label htmlFor="sortBy">Sortuj według</label>
          <select
            className="form-control"
            id="sortBy"
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
            multiple
          >
            <option value="departure">Data wylotu</option>
            <option value="arrival">Data przylotu</option>
            <option value="status">Status</option>
            <option value="origin">Miejsce wylotu</option>
            <option value="destination">Miejsce przylotu</option>
          </select>
          <label htmlFor="sortOrder">Kolejność</label>
          <select
            className="form-control"
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Rosnąco</option>
            <option value="desc">Malejąco</option>
          </select>
          <button className="btn btn-alt mt-3" onClick={clearFilterHandler}>
            Resetuj
          </button>
        </div>
      }
      confirmBtnText="Sortuj"
      confirmBtnClass="btn-primary"
    />
  );
};

export default FlightsSort;
