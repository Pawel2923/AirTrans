import classes from "./ScheduleOptions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

interface ScheduleOptionsProps {
  searchValue: string;
  setIsFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const ScheduleOptions = ({
  searchValue,
  setIsFilterModalOpen,
  setIsSortModalOpen,
  setSearchValue,
}: ScheduleOptionsProps) => {
  const searchInput = useRef<HTMLInputElement>(null);

  return (
    <div className={classes["schedule-options"]}>
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
          value={searchValue}
          onInput={(e) => setSearchValue(e.currentTarget.value)}
        />
        <FontAwesomeIcon
          icon={faSearch}
          onClick={() => searchInput.current?.focus()}
        />
      </div>
    </div>
  );
};

export default ScheduleOptions;
