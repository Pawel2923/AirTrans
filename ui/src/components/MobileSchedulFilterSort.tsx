import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MobileSchedulFilterSort.module.css";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

interface MobileScheduleFilterSortProps {
  setIsFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileScheduleFilterSort = ({
  setIsFilterModalOpen,
  setIsSortModalOpen,
}: MobileScheduleFilterSortProps) => {
  return (
    <div className={styles["mobile-filter-sort"]}>
      <div className="dropdown">
        <button
          className={`dropdown-toggle ${styles["dropdown-toggle"]}`}
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          aria-label="Otwórz menu filtrowania i sortowania"
        >
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </button>
        <ul className="dropdown-menu">
          <li>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => setIsFilterModalOpen(true)}
            >
              Filtruj
            </button>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => setIsSortModalOpen(true)}
            >
              Sortuj
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileScheduleFilterSort;
