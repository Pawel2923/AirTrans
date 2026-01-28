import styles from "./ScheduleOptions.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import DesktopScheduleFilterSort from "./DesktopScheduleFilterSort";
import MobileScheduleFilterSort from "./MobileSchedulFilterSort";

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
    <div className={styles["schedule-options"]}>
      <DesktopScheduleFilterSort
        setIsFilterModalOpen={setIsFilterModalOpen}
        setIsSortModalOpen={setIsSortModalOpen}
      />
      <MobileScheduleFilterSort
        setIsFilterModalOpen={setIsFilterModalOpen}
        setIsSortModalOpen={setIsSortModalOpen}
      />
      <div className={styles["search-wrapper"]}>
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
